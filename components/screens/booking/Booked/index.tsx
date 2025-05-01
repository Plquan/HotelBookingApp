import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import BookedDetailModal from './components/BookedDetailModal';
import { IBookedData } from '@/interfaces/booking/IBookedType';
import CustomHeader from '@/components/ui/CustomHeader';
import { socketService } from '@/services/socketService';
import Toast from 'react-native-toast-message';
import { getStatusInfo } from '@/constants/Status';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import { createStyles } from './BookedScreen.style';
import { useTheme } from '@/providers/ThemeContext';
import { useTranslate } from '@/hooks/useTranslate';

const formatDateToVietnamese = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day} thg${month} - ${year}`;
};

const BookedScreen = () => {
  const t = useTranslate();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [activeTab, setActiveTab] = useState('active');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IBookedData>();

  const dispatch = useDispatch<AppDispatch>();
  const {bookedRoom,loading} = useSelector((state: RootState) => state.bookingStore);

  useEffect(() => {
    let isSubscribed = true;

    const initializeSocket = async () => {
      try {
        // First ensure connection is stopped
        await socketService.stopConnection();
        
        // Then start new connection
        await socketService.startConnection();

        if (isSubscribed) {
          socketService.onBookingStatusUpdated((data) => {
            if (data.isSuccess) {
              dispatch(bookingAction.updateBookedRoomStatus({ 
                bookingId: data.bookingId, 
                status: data.status 
              }));
            }
          });
        }
      } catch (error) {
        console.log('Socket connection error:', error);
      }
    };

    initializeSocket();

    return () => {
      isSubscribed = false;
      socketService.stopConnection();
    };
  }, []);

  useEffect(() => {
    dispatch(bookingAction.getBooked());
  }, []);

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleDetail = (room: any) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
  };

  const filteredRooms = bookedRoom.filter(room => {
    const status = room.status || "";
  
    switch (activeTab) {
      case 'active':
        return ['Pending', 'Confirmed', 'CheckIn'].includes(status);
      case 'past':
        return status === 'CheckOut';
      case 'cancelled':
        return status === 'Cancelled';
      default:
        return true;
    }
  });
  

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlayView visible={loading} text="Đang tải..." />
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      {/* HEADER */}
      <CustomHeader 
                title={t("00040")}
                showBackButton={false}
            />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={activeTab === 'active' ? styles.activeTabButton : styles.tabButton}
          onPress={() => handleTabPress('active')}
        >
          <Text style={activeTab === 'active' ? styles.activeTabText : styles.tabText}>
            {t("00041")}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={activeTab === 'past' ? styles.activeTabButton : styles.tabButton}
          onPress={() => handleTabPress('past')}
        >
          <Text style={activeTab === 'past' ? styles.activeTabText : styles.tabText}>
          {t("00042")}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={activeTab === 'cancelled' ? styles.activeTabButton : styles.tabButton}
          onPress={() => handleTabPress('cancelled')}
        >
          <Text style={activeTab === 'cancelled' ? styles.activeTabText : styles.tabText}>
          {t("00043")}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {filteredRooms.map((room) => {
          const { label, color, backgroundColor } = getStatusInfo(room.status || '', t);
          return (
            <TouchableOpacity 
              style={styles.tripCard} 
              key={room.id} 
              onPress={() => handleDetail(room)}
            >
              <Image 
                source={{ 
                  uri: "https://currently-together-squid.ngrok-free.app/images/" + 
                       (room.roomTypes?.[0]?.roomImages?.[0]?.url || 'default-image.jpg') 
                }}
                style={styles.tripImage}
              />
              <View style={styles.tripDetails}>
                <View style={styles.tripInfo}>
                  <Text style={styles.tripDate}>
                    {formatDateToVietnamese(new Date(room.fromDate))} - {formatDateToVietnamese(new Date(room.toDate))}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor }]}>
                  <Text style={[styles.statusText, { color }]}>{label}</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={24} color="#fff" style={styles.chevronIcon} />
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 80 }} />
      </ScrollView>

      <BookedDetailModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        room={selectedRoom}
      />
    </SafeAreaView>
  );
};

export default BookedScreen;