import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  StatusBar,
} from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/index';
import bookingServices from '@/services/bookingServices';
import { IRoomTypeData } from '@/interfaces/roomType/IRoomDTO';
import env from '@/constants/envConstant';
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
  const [hotelData, setHotelData] = useState<IRoomTypeData[]>([]);

  const router = useRouter();

  const checkAvailableRoom = async () => {
    try {
      const params = {
        fromDate: new Date(fromDate).toISOString().split("T")[0],
        toDate: new Date(toDate).toISOString().split("T")[0]
      };

      const res = await bookingServices.checkRoom(params);
      setAvailableRooms(res?.data || []);
    } catch (error) {
      console.error("Lỗi khi kiểm tra phòng:", error);
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

  // Function to handle quantity change
  const handleQuantityChange = (id: number, change: number) => {
    setAvailableRooms((prevRooms) =>
      prevRooms.map((item) =>
        item.id === id
          ? { ...item, capacity: Math.max(1, (item.capacity || 1) + change) }
          : item
      )
    );
  };

  const renderHotelItem = ({ item }: { item: IRoomTypeData }) => (
    <View style={styles.hotelItem}>
      <View style={styles.hotelItemContent}>
        {/* Left side - Image */}
        <View style={styles.hotelImageContainer}>
          <Image 
           source={{ uri: "https://currently-together-squid.ngrok-free.app/images/" + item.roomImages[0].url }}
            style={styles.hotelImage} 
            resizeMode="cover"
          />
        </View>
        
        {/* Right side - Information */}
        <View style={styles.hotelInfo}>
          {/* Add the favorite button in the top-right corner of the info section */}
          <TouchableOpacity style={styles.favoriteButton}>
            <FontAwesome name="heart-o" size={22} color="white" />
          </TouchableOpacity>
  
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.hotelName}>{item.name}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingScore}>{item.price}</Text>
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
            
            {/* Quantity Control */}
            <View style={styles.quantityControl}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => handleQuantityChange(item.id, -1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{item.capacity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => handleQuantityChange(item.id, 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </View>
      
      {/* Divider line */}
      <View style={styles.divider} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggleDatePickerModal}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Xung quanh vị trí hiện tại</Text>
          </View>
          <Text style={styles.headerDates}>{formatDateRange()}</Text>
        </View>
      </TouchableOpacity>


      {/* Total Count */}
      <Text style={styles.totalCount}>77 chỗ nghỉ</Text>

      {/* Hotel List */}
      <FlatList
        data={availableRooms}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Date Picker Modal */}
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

            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={toggleDatePickerModal}
            >
              <Text style={styles.applyButtonText}>ĐẶT PHÒNG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    backgroundColor: '#333',
    padding: 15,
    borderColor: '#b58e50',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  headerContent: {
    flexDirection: 'column',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerDates: {
    color: 'white',
    fontSize: 16,
    marginLeft: 34,
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  filterText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  totalCount: {
    color: 'white',
    padding: 15,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  hotelItem: {
    marginBottom: 5,
    backgroundColor: '#222',
    padding: 10,
  },
  hotelItemContent: {
    flexDirection: 'row', 
    alignItems: 'flex-start',
  },
  hotelImageContainer: {
    width: 160,
    marginRight: 12,
  },
  hotelImage: {
    width: '100%',
    height: 135,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: -7,
    right: -7,
    borderRadius: 15,
    padding: 6,
    zIndex: 1,
  },
  
  hotelInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  hotelName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 30
  },
  hostedByText: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingBox: {
    backgroundColor: '#0066cc',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 6,
  },
  ratingScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  ratingText: {
    color: '#ccc',
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: '#ccc',
    marginLeft: 4,
    fontSize: 12,
  },
  roomTypeText: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
  },
  // New styles for price and quantity control
  priceQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b58e50',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#b58e50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  feesText: {
    color: '#ccc',
    fontSize: 12,
  },
  feesIncludedText: {
    color: '#ccc',
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: '#444',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateSelection: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeDateSelection: {
    backgroundColor: '#e0e0e0',
    borderColor: '#b58e50',
    borderWidth: 1,
  },
  dateSelectionLabel: {
    color: '#b58e50',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateSelectionValue: {
    fontSize: 16,
    color: '#333',
  },
  datePicker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  personSelection: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  personSelectionLabel: {
    color: '#b58e50',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  personInput: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#b58e50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});