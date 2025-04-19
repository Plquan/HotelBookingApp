import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/index';
import bookingServices from '@/services/bookingServices';
import { IRoomTypeData } from '@/interfaces/roomType/IRoomDTO';
import env from '@/constants/envConstant';
import { styles } from './CheckRoom.style';
import { IChooseRoom } from '@/interfaces/booking/IBookingType';
import Toast from 'react-native-toast-message';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import CustomDatePicker from '@/components/ui/BookingDatePicker';
import CustomButton from '@/components/ui/Button';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';
import { ICheckRoomData } from "@/interfaces/booking/IBookingType";
import { ISelectedRoom } from '@/interfaces/booking/IBookingType';
import { differenceInDays } from 'date-fns';
export default function CheckRoomScreen() {
  const bookingData = useSelector((state: RootState) => state.bookingStore.bookingData);

  const [fromDate, setFromDate] = useState(() => new Date(bookingData.fromDate));
  const [toDate, setToDate] = useState(() => new Date(bookingData.toDate));
  const [availableRooms, setAvailableRooms] = useState<ICheckRoomData[]>([]);
  const [personCount, setPersonCount] = useState(bookingData.totalPerson || 1);
  const [chooseRoom, setChooseRoom] = useState<IChooseRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
   console.log(selectedRooms)
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
            <TouchableOpacity style={styles.favoriteButton}>
              <FontAwesome name="heart-o" size={22} color="white" />
            </TouchableOpacity>
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
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, -1,item.price, item.availableRooms)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>
                  {chooseRoom.find(room => room.roomTypeId === item.id)?.number || 0}
                </Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, 1,item.price, item.availableRooms)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>         
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
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Phòng trống hiện tại</Text>
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
      
      <Text style={styles.totalCount}>1 chỗ nghỉ</Text>
      <FlatList
        data={availableRooms.filter(room => room.availableRooms > 0)}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
           <View style={styles.bookingButtonWrapper}>
               <CustomButton
                  title="Đặt phòng ngay"
                  onPress={handleBooking}
                  style={styles.bookingButton}
                />
           </View>
    </SafeAreaView>
  );
}