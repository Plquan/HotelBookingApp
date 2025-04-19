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
import { styles } from './BookedScreen.style';
import { Feather, Ionicons } from '@expo/vector-icons';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import BookedDetailModal from './components/BookedDetailModal';
import { IBookedData } from '@/interfaces/booking/IBookedType';

const BookedScreen = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IBookedData>();

  const dispatch = useDispatch<AppDispatch>();
  const bookedRoom = useSelector((state: RootState) => state.bookingStore.bookedRoom);

  useEffect(() => {
    dispatch(bookingAction.getBooked())
  }, [])

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleDetail = (room: any) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Chuyến đi</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="help-circle" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="download" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={activeTab === 'active' ? styles.activeTabButton : styles.tabButton}
          onPress={() => handleTabPress('active')}
        >
          <Text style={activeTab === 'active' ? styles.activeTabText : styles.tabText}>
            Đang hoạt động
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={activeTab === 'past' ? styles.activeTabButton : styles.tabButton}
          onPress={() => handleTabPress('past')}
        >
          <Text style={activeTab === 'past' ? styles.activeTabText : styles.tabText}>
            Đã qua
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={activeTab === 'cancelled' ? styles.activeTabButton : styles.tabButton}
          onPress={() => handleTabPress('cancelled')}
        >
          <Text style={activeTab === 'cancelled' ? styles.activeTabText : styles.tabText}>
            Đã hủy
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {bookedRoom.map((room) => (
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
              <Text style={styles.tripLocation}>Vũng Tàu</Text>
              <Text style={styles.tripDate}>16 – 17 thg 4, 2025 · 1 đơn đặt</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#fff" style={styles.chevronIcon} />
          </TouchableOpacity>
        ))}
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