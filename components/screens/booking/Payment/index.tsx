import React, { useEffect, useState } from 'react';
import {
  Text,
  View, 
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image, // Thêm dòng này
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';
import { RootState, AppDispatch } from '@/stores';
import bookingServices from '@/services/bookingServices';
import {formatDateOnly} from '@/utils/functions/formatDate';
import { WebView } from 'react-native-webview';
import PaymentInfoModal from './components/PaymentInfoModal';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import CustomHeader from '@/components/ui/CustomHeader';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './PaymentScreen.style';
import env from '@/constants/envConstant';
const { IMAGE_URL } = env;

export default function PaymentScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');
  const [isWebViewVisible, setWebViewVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [isPaymentInfoModalVisible, setIsPaymentInfoModalVisible] = useState(false);
  const [bookingCode, setBookingCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const bookingData = useSelector((state: RootState) => state.bookingStore.bookingData);
  const selectedRooms = useSelector((state: RootState) => state.bookingStore.selectedRoom);

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total, room) => total + room.totalPrice, 0);
  };

  const handleBack = () => {
    if (isWebViewVisible) {
      setWebViewVisible(false);
      return;
    }
    router.back();
  };

  useEffect(() => {
    dispatch(bookingAction.setBookingData({
      ...bookingData,
      paymentMethod: selectedPaymentMethod
    }));
  }, [selectedPaymentMethod]);

  const handleBookNow = async () => {
    try {
      setIsLoading(true)
      const params = {
        ...bookingData,
        fromDate: formatDateOnly(new Date(bookingData.fromDate)),
        toDate: formatDateOnly(new Date(bookingData.toDate)),
      };
      const res = await bookingServices.payment(params);
      if (res.isSuccess) {
        if (selectedPaymentMethod === "OP") {
          setPaymentUrl(res.data);
          setWebViewVisible(true);
        } else {
          setBookingCode(res.data.code);
          setIsPaymentInfoModalVisible(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false)
    }
  };

  const handleWebViewNavigation = (navState:any) => {
    if (navState.url.includes('success')) {
      setWebViewVisible(false);
      router.push('/booking-confirmation');
    }
    else if (navState.url.includes('cancel') || navState.url.includes('failure')) {
      setWebViewVisible(false);
      alert('Thanh toán không thành công. Vui lòng thử lại.');
    }
  };

  if (isWebViewVisible && paymentUrl) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Using the new CustomHeader component in WebView mode */}
        <CustomHeader
          title="Thanh toán Vnpay"
          showBackButton={true}
          onBackPress={handleBack}
        />
        <WebView
          source={{ uri: paymentUrl }}
          style={styles.webView}
          onNavigationStateChange={handleWebViewNavigation}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingOverlayView visible={isLoading} text="Đang xử lí..." />
      <StatusBar barStyle="light-content" backgroundColor="#1c1c1c" />
      
      {/* Using the new CustomHeader component */}
      <CustomHeader
        title="Thông tin thanh toán"
        showBackButton={true}
        onBackPress={handleBack}
      />

      <ScrollView style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Thanh toán</Text>
          <Text style={styles.sectionSubtitle}>Chọn phương thức thanh toán</Text>

          <TouchableOpacity
            style={[
              styles.paymentMethodItem,
              selectedPaymentMethod === 'COD' && styles.selectedPaymentMethod
            ]}
            onPress={() => setSelectedPaymentMethod('COD')}
          >
            <View style={styles.paymentMethodContent}>
              <View style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox,
                  selectedPaymentMethod === 'COD' && styles.checkboxSelected
                ]}>
                  {selectedPaymentMethod === 'COD' && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
              </View>
              <View style={styles.paymentMethodIcon}>
                <Ionicons name="wallet-outline" size={24} color="#b58e50" />
              </View>
              <Text style={styles.paymentMethodText}>Thanh toán tại nơi</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethodItem,
              styles.paymentMethodItemSpace,
              selectedPaymentMethod === 'OP' && styles.selectedPaymentMethod
            ]}
            onPress={() => setSelectedPaymentMethod('OP')}
          >
            <View style={styles.paymentMethodContent}>
              <View style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox,
                  selectedPaymentMethod === 'OP' && styles.checkboxSelected
                ]}>
                  {selectedPaymentMethod === 'OP' && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
              </View>
              <View style={[styles.paymentMethodIcon, { backgroundColor: '#ffffff30' }]}>
                <Ionicons name="card-outline" size={24} color="#b58e50" />
              </View>
              <Text style={styles.paymentMethodText}>Vnpay</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Phòng đã chọn</Text>
          <View style={styles.dateInfoContainer}>
            <Ionicons name="calendar-outline" size={16} color={theme.text} />
            <Text style={styles.dateInfoText}>
              {formatDateOnly(new Date(bookingData.fromDate))} - {formatDateOnly(new Date(bookingData.toDate))}
            </Text>
          </View>
          {selectedRooms.map((room, index) => (
            <View key={index} style={styles.roomItemContainer}>
              <Image 
                source={{ uri: IMAGE_URL + room.image }}
                style={styles.roomImage}
                resizeMode="cover"
              />
              <View style={styles.roomContent}>
                <View style={styles.roomMainInfo}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <View style={styles.roomMetrics}>
                    <View style={styles.roomMetricItem}>
                      <Ionicons name="people-outline" size={16} color={theme.text} />
                      <Text style={styles.metricText}>{bookingData.totalPerson} khách</Text>
                    </View>
                    <View style={styles.roomMetricItem}>
                      <Ionicons name="bed-outline" size={16} color={theme.text} />
                      <Text style={styles.metricText}>{room.count} phòng</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Tổng tiền</Text>
                  <Text style={styles.priceText}>
                    {room.totalPrice.toLocaleString('vi-VN') + " VND"}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsTitle}>Điều kiện đặt phòng</Text>
          
          <View style={styles.termItem}>
            <Ionicons name="checkmark" size={18} style={styles.checkMarkColor} />
            <Text style={styles.termText}>
              <Text style={styles.termHighlight}>Hủy miễn phí</Text> trước 7 ngày
            </Text>
          </View>
          
          <View style={styles.termItem}>
            <Ionicons name="checkmark" size={18} style={styles.checkMarkColor} />
            <Text style={styles.termText}>
              <Text style={styles.termHighlight}>Không cần thanh toán trước</Text> - thanh toán tại chỗ nghỉ
            </Text>
          </View>
                  

        </View>
      </ScrollView>
          
      <View style={styles.bookingButtonWrapper}>
          <View style={styles.priceSection}>
            <View style={styles.priceHeader}>
              <Text style={styles.discountedPrice}>Tổng tiền: {' '}
                {calculateTotalPrice().toLocaleString('vi-VN') +" VND"}</Text>
            </View>
            <Text style={styles.taxInfo}>Đã bao gồm thuế và phí</Text>
          </View>
          <CustomButton
            title="Bước tiếp theo"
            onPress={handleBookNow}
            style={styles.bookingButton}
          />
        </View>

      <PaymentInfoModal 
        visible={isPaymentInfoModalVisible}
        onClose={() => {
          setIsPaymentInfoModalVisible(false);
        }}
        bookingCode={bookingCode}
      />
    </SafeAreaView>
  );
}

