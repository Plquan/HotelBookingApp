import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/index';
import bookingServices from '@/services/bookingServices';
import env from '@/constants/envConstant';
import { IChooseRoom } from '@/interfaces/booking/IBookingType';
import Toast from 'react-native-toast-message';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import CustomDatePicker from '@/components/ui/BookingDatePicker';
import CustomButton from '@/components/ui/Button';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';
import { ICheckRoomData } from "@/interfaces/booking/IBookingType";
import { ISelectedRoom } from '@/interfaces/booking/IBookingType';
import { differenceInDays } from 'date-fns';
import SaveRoom from '@/components/ui/SavedIcon';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './CheckRoom.style';
import SelectInput from '@/components/ui/SelectInput';
import { useTranslate } from '@/hooks/useTranslate';

export default function CheckRoomScreen() {
  const t = useTranslate();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const bookingData = useSelector((state: RootState) => state.bookingStore.bookingData);

  const [fromDate, setFromDate] = useState(() => new Date(bookingData.fromDate));
  const [toDate, setToDate] = useState(() => new Date(bookingData.toDate));
  const [availableRooms, setAvailableRooms] = useState<ICheckRoomData[]>([]);
  const [personCount, setPersonCount] = useState(bookingData.totalPerson || 1);
  const [chooseRoom, setChooseRoom] = useState<IChooseRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const checkAvailableRoom = async () => {
      dispatch(bookingAction.setBookingData({
          fromDate:fromDate.toISOString(),
          toDate:toDate.toISOString(),
          totalPerson:personCount,
        }))
    try {
      setIsLoading(true);
      const params = {
        fromDate: new Date(fromDate).toISOString().split('T')[0],
        toDate: new Date(toDate).toISOString().split('T')[0],
      };

      const res = await bookingServices.checkRoom(params);
      setAvailableRooms(res?.data || []);
    } catch (error) {
      console.error('Lỗi khi kiểm tra phòng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checkAvailableRoom().finally(() => {
      setRefreshing(false);
    });
  }, [dispatch]);

  useEffect(() => {
    setFromDate(new Date(bookingData.fromDate));
    setToDate(new Date(bookingData.toDate));
    setPersonCount(bookingData.totalPerson || 1);
  }, [bookingData]);
  
  useEffect(() => {
    checkAvailableRoom();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleQuantityChange = (roomTypeId: number, change: number, price: number, max: number) => {
    setChooseRoom(prev => {
      const existing = prev.find(item => item.roomTypeId === roomTypeId);
      const currentNumber = existing ? existing.number : 0;
      const updatedNumber = currentNumber + change;
  
      if (updatedNumber > max) return prev;
      if (updatedNumber < 1) {
        return prev.filter(item => item.roomTypeId !== roomTypeId);
      }
  
      if (existing) {
        return prev.map(item =>
          item.roomTypeId === roomTypeId
            ? { ...item, number: updatedNumber }
            : item
        );
      } else {
        return [...prev, { roomTypeId, number: updatedNumber, price }];
      }
    });
  };
  
  
  const handleBooking = () => {
    const totalRooms = chooseRoom.reduce((sum, item) => sum + item.number, 0);
    if (Number(personCount) > totalRooms) {
      Toast.show({
        type: 'info',
        text1: `Không đủ phòng cho ${Number(personCount)} người! `,
        position: 'top', 
      });
      return;
    }
    const nights = differenceInDays(
      new Date(toDate), 
      new Date(fromDate)
    );
    const selectedRooms: ISelectedRoom[] = chooseRoom.map(room => {
      const roomDetails = availableRooms.find(ar => ar.id === room.roomTypeId);
      
      return {
        id: room.roomTypeId,
        name: roomDetails?.name || '',
        count: room.number,
        originalPrice: room.price,
        totalPrice: (room.price * room.number) * (nights <= 0 ? 1 : nights),
        image: roomDetails?.roomImages[0]?.url || ''
      };
    });
    
    dispatch(bookingAction.setSelectedRoom(selectedRooms))
    dispatch(bookingAction.setBookingData({
          chooseRooms:chooseRoom
    }))
    router.push('/(booking)/guestInfo');
  };


  const renderHotelItem = ({ item }: { item: ICheckRoomData }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/(booking)/roomDetail?id=${item.id}`)}
    >
      <View style={styles.hotelItem}>
        <View style={styles.hotelItemContent}>
          <View style={styles.hotelImageContainer}>
            <Image
              source={{ uri: 'https://currently-together-squid.ngrok-free.app/images/' + item.roomImages[0].url }}
              style={styles.hotelImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.hotelInfo}>
          <SaveRoom 
              roomId={item.id} 
              isSaved={item.isSaved} 
              style={styles.favoriteButton}
            />
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.hotelName}>
              {item.name}
            </Text>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingBox}>
                <Text style={styles.ratingScore}>{item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={14} color="#666" />
              <Text style={styles.locationText}>{item.view}</Text>
            </View>
            <View style={styles.locationContainer}>
              <MaterialIcons name="visibility" size={14} color="#666" />
              <Text style={styles.locationText}>Hướng nhìn: view biển</Text>
            </View>
            <View style={styles.locationContainer}>
              <MaterialIcons name="person" size={14} color="#666" />
              <Text style={styles.locationText}>Số lượng: 5 người 1 phòng</Text>
            </View>

            <View style={styles.priceQuantityContainer}>
              <SelectInput
                value={chooseRoom.find(room => room.roomTypeId === item.id)?.number || 0}
                maxValue={item.availableRooms}
                onValueChange={(value) => {
                  const currentValue = chooseRoom.find(room => room.roomTypeId === item.id)?.number || 0;
                  const change = value - currentValue;
                  handleQuantityChange(item.id, change, item.price, item.availableRooms);
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingOverlayView visible={isLoading} text="Đang tải" />
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} style={styles.iconColor} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t("00071")}</Text>
          </View>
          
          {/* Use CustomDatePicker component */}
          <CustomDatePicker
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
            personCount={personCount}
            onPersonCountChange={setPersonCount}
            onApply={checkAvailableRoom}
            dateTextStyle={styles.headerDates}
          />
        </View>
      </View>
      
      <Text style={styles.totalCount}>1 {t("00072")}</Text>
      <FlatList
        data={availableRooms.filter(room => room.availableRooms > 0)}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
           <View style={styles.bookingButtonWrapper}>
               <CustomButton
                  title={t("00075")}
                  onPress={handleBooking}
                  style={styles.bookingButton}
                />
           </View>
    </SafeAreaView>
  );
}