import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Share,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { format } from "date-fns";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/index';
import bookingServices from '@/services/bookingServices';
import { IRoomTypeData } from '@/interfaces/roomType/IRoomDTO';
import env from '@/constants/envConstant';
import { useLocalSearchParams } from 'expo-router';
const IMAGE_URL = env.IMAGE_URL

export default function RoomDetailScreen() {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [roomDetail, setRoomDetail] = useState<IRoomTypeData>();
  
  // Date picker states
  const fromDateStore = useSelector((state: RootState) => state.bookingStore.fromDate);
  const toDateStore = useSelector((state: RootState) => state.bookingStore.toDate);
  const [fromDate, setFromDate] = useState(() => new Date(fromDateStore));
  const [toDate, setToDate] = useState(() => new Date(toDateStore));
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [personCount, setPersonCount] = useState('2');


  const { id } = useLocalSearchParams();
  const getRoomDetail = async (id: number) => {
     try {
      const response = await bookingServices.getRoomDetail(id)
      setRoomDetail(response?.data)
     } catch (error) {
      console.error("Lỗi khi lấy thông tin phòng:", error);
     }
  }
  
  useEffect(() => {
   getRoomDetail(Number(id))
  },[])

  const handleBack = () => {
    router.back();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing room at Tre Yoga Retreat!',
        url: 'https://vtkong.com/wp-content/uploads/2022/08/thiet-ke-biet-thu-2-tang-mai-thai.jpg',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Date picker functions
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
  
  const showMoreImages = () => {
    Alert.alert("Gallery", "This would open a full image gallery");
  };

  const proceedToBooking = () => {
  
    Alert.alert("Booking", "Proceeding to book room for selected dates");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      {/* Updated Header with action buttons on the right side */}
      <TouchableOpacity style={styles.header} onPress={toggleDatePickerModal}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{roomDetail?.name || "Chi tiết phòng"}</Text>
          </View>
          <Text style={styles.headerDates}>{formatDateRange()}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconButton}>
            <FontAwesome name="heart-o" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.headerIconButton}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      
      {/* Scrollable content container that includes image and all information */}
      <ScrollView style={styles.mainScrollView}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: env.IMAGE_URL + roomDetail?.roomImages[0].url 
           }}
            style={styles.roomImage} 
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.seeMoreOverlay}
            onPress={showMoreImages}
          >
            <Text style={styles.seeMoreText}>Xem thêm hình ảnh</Text>
          </TouchableOpacity>
        </View>
        
        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Room Title and Rating */}
          <View style={styles.titleContainer}>
            <Text style={styles.roomTitle}>{roomDetail?.name}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingBox}>
                <Text style={styles.ratingScore}>9,4</Text>
              </View>
            </View>
          </View>
          
          {/* Price Info */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Giá cho 1 đêm ({format(fromDate, 'd')} thg {format(fromDate, 'M')} - {format(toDate, 'd')} thg {format(toDate, 'M')})</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>US$34</Text>
            </View>
          </View>
          
          {/* Room Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <MaterialIcons name="king-bed" size={22} color="#b58e50" />
              <Text style={styles.featureText}>{roomDetail?.bedType}</Text>
            </View>
            
            <View style={styles.featureItem}>
              <MaterialIcons name="aspect-ratio" size={22} color="#b58e50" />
              <Text style={styles.featureText}>{roomDetail?.size}</Text>
            </View>
            
            <View style={styles.featureItem}>
            <MaterialIcons name="visibility" size={22} color="#b58e50" />
            <Text style={styles.featureText}>{roomDetail?.view}</Text>
          </View>

            
            <View style={styles.featureItem}>
              <MaterialIcons name="people" size={22} color="#b58e50" />
              <Text style={styles.featureText}>{"1 phòng - " + (roomDetail?.capacity ?? "?") + " người"}
              </Text>
            </View>
          </View>
          
          {/* Room Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Giới thiệu về phòng</Text>
            <Text style={styles.descriptionText}>
              Phòng nghỉ tại {roomDetail?.name} được thiết kế mở, gần gũi với thiên nhiên, mang lại không gian thư giãn tuyệt vời cho kỳ nghỉ của bạn. Được xây dựng từ vật liệu tự nhiên, mỗi phòng đều có view nhìn ra khu vườn nhiệt đới xanh mát.
            </Text>
          </View>
          
          {/* Spacer for bottom padding */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
      
      {/* Bottom Booking Button */}

     {/* Bottom Booking Button with gray background wrapper */}
      <View style={styles.bookingButtonWrapper}>
        <TouchableOpacity style={styles.bookingButton} onPress={proceedToBooking}>
          <Text style={styles.bookingButtonText}>Đặt phòng ngay</Text>
        </TouchableOpacity>
      </View>

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
              onPress={proceedToBooking}
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
  // Updated header styles to position buttons on the right


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
  headerIcons: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    right: 15,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginLeft: 10,
  },
  mainScrollView: {
    flex: 1,
    backgroundColor: '#222',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  roomImage: {
    width: '100%',
    height: '100%',
  },
  seeMoreOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  seeMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#222',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  roomTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingBox: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  ratingScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginTop: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  descriptionContainer: {
    marginTop: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  descriptionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 80,
  },
  bookingButton: {
    backgroundColor: '#b58e50',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom:40,
    marginTop:8
  },
  bookingButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#444',

  },
  bookingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal styles
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