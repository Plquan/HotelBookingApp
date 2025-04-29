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
} from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { format } from "date-fns";
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/index';
import bookingServices from '@/services/bookingServices';
import { IRoomTypeData } from '@/interfaces/roomType/IRoomDTO';
import env from '@/constants/envConstant';
import { useLocalSearchParams } from 'expo-router';
import GalleryModal from './components/RoomGalleryModal';
import Toast from 'react-native-toast-message';
import { IChooseRoom } from '@/interfaces/booking/IBookingType';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import CustomDatePicker from '@/components/ui/BookingDatePicker';
import SaveRoom from '@/components/ui/SavedIcon';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './RoomDetailScreen.style';
const IMAGE_URL = env.IMAGE_URL;

export default function RoomDetailScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [roomDetail, setRoomDetail] = useState<IRoomTypeData>();
  const [showGallery, setShowGallery] = useState(false);
  
  // Date picker states
  const booking = useSelector((state: RootState) => state.bookingStore.bookingData);
  const [fromDate, setFromDate] = useState(() => new Date(booking.fromDate));
  const [toDate, setToDate] = useState(() => new Date(booking.toDate));
  const [chooseRoom, setChooseRoom] = useState<IChooseRoom[]>([]);
  const [personCount, setPersonCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();
  
  const getRoomDetail = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await bookingServices.getRoomDetail(id);
      setRoomDetail(response?.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin phòng:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getRoomDetail(Number(id));
  }, []);

  const handleBack = () => {
    router.back();
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
  
  // Open gallery modal instead of showing alert
  const showMoreImages = () => {
    setShowGallery(true);
  };

  const proceedToBooking = () => {
    Alert.alert("Booking", "Proceeding to book room for selected dates");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingOverlayView visible={isLoading} text="Đang tải" />
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      {/* Updated Header with action buttons on the right side */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{roomDetail?.name || "Chi tiết phòng"}</Text>
          </View>
          
          {/* Use CustomDatePicker component */}
          <CustomDatePicker
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
            personCount={personCount}
            onPersonCountChange={setPersonCount}
            onApply={proceedToBooking}
            applyButtonText="ĐẶT PHÒNG"
            dateTextStyle={styles.headerDates}
          />
        </View>
        <View style={styles.headerIcons}>
        <SaveRoom 
          roomId={Number(id)} 
          isSaved={isFavorite}
          style={styles.headerIconButton}
        />
          <TouchableOpacity onPress={handleShare} style={styles.headerIconButton}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Scrollable content container that includes image and all information */}
      <ScrollView style={styles.mainScrollView}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: roomDetail?.roomImages && roomDetail.roomImages.length > 0 
              ? IMAGE_URL + roomDetail.roomImages[0].url 
              : 'https://via.placeholder.com/400x300'
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
              <Text style={styles.featureText}>{"1 phòng - " + (roomDetail?.capacity ?? "?") + " người"}</Text>
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
      
      {/* Bottom Booking Button with gray background wrapper */}
      <View style={styles.bookingButtonWrapper}>
        <TouchableOpacity style={styles.bookingButton} onPress={proceedToBooking}>
          <Text style={styles.bookingButtonText}>Đặt phòng ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Gallery Modal */}
      {roomDetail?.roomImages && (
        <GalleryModal 
          visible={showGallery} 
          images={roomDetail.roomImages}
          onClose={() => setShowGallery(false)}
          imageBaseUrl={IMAGE_URL}
        />
      )}
    </SafeAreaView>
  );
}

// Same styles as your original component
