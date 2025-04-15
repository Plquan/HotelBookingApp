import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/ui/Button';
import authSevices from '@/services/authServices';
import { IPaymentData } from '@/interfaces/booking/IBookingType';
import { useDispatch, useSelector } from 'react-redux';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';
import { RootState, AppDispatch } from '@/stores';
import bookingServices from '@/services/bookingServices';
import formatDateOnly from '@/utils/functions/formatDate';
import { WebView } from 'react-native-webview';

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');
  const [isWebViewVisible, setWebViewVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const bookingData = useSelector((state: RootState) => state.bookingStore.bookingData);
  
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
    console.log(bookingData);
    try {
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
          // Xử lý khi thanh toán COD thành công
          // Có thể chuyển hướng đến trang xác nhận đặt phòng
          router.push('/booking-confirmation');
        }
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Xử lý khi thanh toán thành công hoặc thất bại
  const handleWebViewNavigation = (navState:any) => {
    // Giả sử URL chuyển hướng khi thanh toán thành công chứa 'success'
    if (navState.url.includes('success')) {
      setWebViewVisible(false);
      // Chuyển hướng đến trang xác nhận đặt phòng
      router.push('/booking-confirmation');
    }
    // Giả sử URL chuyển hướng khi thanh toán thất bại chứa 'cancel' hoặc 'failure'
    else if (navState.url.includes('cancel') || navState.url.includes('failure')) {
      setWebViewVisible(false);
      // Bạn có thể thêm xử lý khi thanh toán thất bại
      alert('Thanh toán không thành công. Vui lòng thử lại.');
    }
  };

  if (isWebViewVisible && paymentUrl) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh toán VNPay</Text>
          <View style={styles.headerRight} />
        </View>
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
      <StatusBar barStyle="light-content" backgroundColor="#1c1c1c" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin thanh toán</Text>
        <View style={styles.headerRight} />
      </View>

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

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsTitle}>Điều kiện đặt phòng</Text>
          
          <View style={styles.termItem}>
            <Ionicons name="checkmark" size={18} color="white" />
            <Text style={styles.termText}>
              <Text style={styles.termHighlight}>Hủy miễn phí</Text> trước 7 ngày
            </Text>
          </View>
          
          <View style={styles.termItem}>
            <Ionicons name="checkmark" size={18} color="white" />
            <Text style={styles.termText}>
              <Text style={styles.termHighlight}>Không cần thanh toán trước</Text> - thanh toán tại chỗ nghỉ
            </Text>
          </View>
                  
          <View style={styles.priceInfoContainer}>
            <Text style={styles.currentPrice}>US$240</Text>
          </View>
          
          <Text style={styles.taxInfo}>
            Đã bao gồm thuế và phí
          </Text>
        </View>
      </ScrollView>
          
      <View style={styles.bookingButtonWrapper}>
        <CustomButton
          title="Đặt phòng"
          onPress={handleBookNow}
          style={styles.bookingButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24,
  },
  paymentIcon: {
    width: 45,
    height: 30,
    marginRight: 8,
    borderRadius: 4,
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 16,
  },
  paymentMethodItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
  paymentMethodItemSpace: {
    marginTop: 12,
  },
  selectedPaymentMethod: {
    borderColor: '#b58e50',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#b58e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#b58e50',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodText: {
    color: 'white',
    fontSize: 16,
  },
  termsContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  termsTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  termText: {
    color: '#ccc',
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  termHighlight: {
    color: '#b58e50',
  },
  priceInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  currentPrice: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  taxInfo: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  bookingButton: {
    backgroundColor: '#b58e50',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 40,
    marginTop: 8,
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
  webView: {
    flex: 1,
  },
});