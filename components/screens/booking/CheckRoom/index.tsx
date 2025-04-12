import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/index';
import bookingServices from '@/services/bookingServices';
import { IRoomTypeData } from '@/interfaces/roomType/IRoomDTO';
import env from '@/constants/envConstant';
import { styles } from './CheckRoom.style';
import { IChooseRoom } from '@/interfaces/booking/IBookingType';
import Toast from 'react-native-toast-message';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';

export default function CheckRoomScreen() {
  const fromDateStore = useSelector((state: RootState) => state.bookingStore.fromDate);
  const toDateStore = useSelector((state: RootState) => state.bookingStore.toDate);
  const [fromDate, setFromDate] = useState(() => new Date(fromDateStore));
  const [toDate, setToDate] = useState(() => new Date(toDateStore));
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<IRoomTypeData[]>([]);
  const [personCount, setPersonCount] = useState('2');
  const [chooseRoom,setChooseRoom] = useState<IChooseRoom[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const checkAvailableRoom = async () => {
    try {
      setIsLoading(true)
      const params = {
        fromDate: new Date(fromDate).toISOString().split('T')[0],
        toDate: new Date(toDate).toISOString().split('T')[0],
      };

      const res = await bookingServices.checkRoom(params);
      setAvailableRooms(res?.data || []);
    } catch (error) {
      console.error('Lỗi khi kiểm tra phòng:', error);
    }
    finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    checkAvailableRoom();
  }, [fromDate, toDate]);

  const handleBack = () => {
    router.back();
  };

  const toggleDatePickerModal = () => {
    setShowDatePickerModal(!showDatePickerModal);
  };

  const toggleArrivalPicker = () => {
    setShowArrivalPicker(!showArrivalPicker);
    setShowDeparturePicker(false);
  };

  const toggleDeparturePicker = () => {
    setShowDeparturePicker(!showDeparturePicker);
    setShowArrivalPicker(false);
  };

  const onChangeArrival = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) setFromDate(selectedDate);
  };

  const onChangeDeparture = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) setToDate(selectedDate);
  };

  const formatDateRange = () => {
    return `${format(fromDate, 'd')} thg ${format(fromDate, 'M')} – ${format(toDate, 'd')} thg ${format(toDate, 'M')}`;
  };

  const handleQuantityChange = (roomTypeId: number, change: number, max: number) => {
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
        return [...prev, { roomTypeId, number: updatedNumber }];
      }
    });
  };
  
  const handleBooking = () => {
    const totalRooms = chooseRoom.reduce((sum, item) => sum + item.number, 0);
    if (Number(personCount) > totalRooms){
      Toast.show({
        type: 'info',
        text1:  `Không đủ phòng cho ${Number(personCount)} người! `,
        position: 'top', 
      });
    }
  }

  const renderHotelItem = ({ item }: { item: IRoomTypeData }) => (
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
                onPress={() => handleQuantityChange(item.id, -1, item.capacity)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>
                {
                  chooseRoom.find(room => room.roomTypeId === item.id)?.number || 0
                }
              </Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(item.id, 1, item.capacity)}
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
      <TouchableOpacity style={styles.header} onPress={toggleDatePickerModal}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Phòng trống hiện tại</Text>
          </View>
          <Text style={styles.headerDates}>{formatDateRange()}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.totalCount}>1 chỗ nghỉ</Text>
      <FlatList
        data={availableRooms}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.bookingButtonWrapper}>
        <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
          <Text style={styles.bookingButtonText}>Đặt phòng ngay</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showDatePickerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleDatePickerModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleDatePickerModal}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Chọn ngày</Text>
              <View style={{ width: 24 }} />
            </View>
            <View style={styles.dateSelectionContainer}>
              <TouchableOpacity
                style={[styles.dateSelection, showArrivalPicker && styles.activeDateSelection]}
                onPress={toggleArrivalPicker}
              >
                <Text style={styles.dateSelectionLabel}>NGÀY ĐẾN</Text>
                <Text style={styles.dateSelectionValue}>{format(fromDate, 'dd/MM/yyyy')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dateSelection, showDeparturePicker && styles.activeDateSelection]}
                onPress={toggleDeparturePicker}
              >
                <Text style={styles.dateSelectionLabel}>NGÀY ĐI</Text>
                <Text style={styles.dateSelectionValue}>{format(toDate, 'dd/MM/yyyy')}</Text>
              </TouchableOpacity>
            </View>
            {(showArrivalPicker || showDeparturePicker) && (
              <DateTimePicker
                value={showArrivalPicker ? fromDate : toDate}
                locale="vi-VN"
                mode="date"
                display="inline"
                onChange={showArrivalPicker ? onChangeArrival : onChangeDeparture}
                themeVariant="light"
                style={styles.datePicker}
                minimumDate={new Date()}
              />
            )}
            <View style={styles.personSelection}>
              <Text style={styles.personSelectionLabel}>SỐ NGƯỜI</Text>
              <TextInput
                style={styles.personInput}
                value={personCount}
                onChangeText={setPersonCount}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={toggleDatePickerModal}>
              <Text style={styles.applyButtonText}>ÁP DỤNG THAY ĐỔI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}