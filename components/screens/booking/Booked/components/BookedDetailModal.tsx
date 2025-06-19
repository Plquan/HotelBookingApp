import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IBookedData } from '@/interfaces/booking/IBookedType';
import { getStatusInfo } from '@/constants/Status';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './BookedDetail.style';
import { useTranslate } from '@/hooks/useTranslate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';
import Toast from 'react-native-toast-message';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';


const formatDateToVietnamese = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day} thg ${month}`;
};

interface BookedDetailModalProps {
  visible: boolean;
  onClose: () => void;
  room?: IBookedData;
}

export default function BookedDetailModal({ visible, onClose, room }: BookedDetailModalProps) {
  const t = useTranslate();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.bookingStore);

  if (!room) return null;

  // Lấy thông tin label, màu chữ và màu nền từ helper
  const { label, color, backgroundColor } = getStatusInfo(room.status || '', t);

  const handleCancelBooking = async () => {
      await dispatch(bookingAction.cancelBooking());
      await dispatch(bookingAction.getBooked())
      onClose();
  };

  const showCancelButton = ['Pending', 'Confirmed', 'CheckIn'].includes(room.status || '');

  return (
    <>
    <LoadingOverlayView visible={loading} text="Đang cập nhật..." />
     <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#222" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("00104")}</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Status Section */}
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor }] }>
              <Text style={[styles.statusBadgeText, { color }]}>{label}</Text>
            </View>
            <Text style={styles.bookingTitle}>{t("00099")}</Text>
            
            <View style={styles.codeContainer}>
              <View style={styles.codeRow}>
                <Text style={styles.codeLabel}>{t("00100")}:</Text>
                <Text style={styles.codeValue}>{room.code}</Text>
                <TouchableOpacity style={styles.copyButton}>
                  <Ionicons name="copy-outline" size={20} color="#b58e50" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Room List Section */}
          <View style={styles.roomsContainer}>
            <Text style={styles.sectionTitle}>{t("00101")}</Text>
            
            {/* Time Information */}
            <View style={styles.timeContainer}>
              <Ionicons name="calendar-outline" size={24} color={theme.text} />
              <Text style={styles.timeText}>
                {formatDateToVietnamese(new Date(room.fromDate))} - {formatDateToVietnamese(new Date(room.toDate))}
              </Text>
            </View>
            {room.roomTypes.map((item) => (
              <TouchableOpacity key={item.id}>
                <View style={styles.roomItem}>
                  <Image 
                    source={{ 
                      uri: `https://currently-together-squid.ngrok-free.app/images/${item.roomImages?.[0]?.url || 'default-image.jpg'}`
                    }}
                    style={styles.roomImage}
                  />
                  <View style={styles.roomInfo}>
                    <Text style={styles.roomName}>{item.name}</Text>
                    <Text style={styles.roomPrice}>
                      Giá tiền: {item.price?.toLocaleString()} VND
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Separator Line */}
          <View style={styles.separator} />

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{t("00088")}</Text>
            <View style={styles.paymentDetails}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>{t("00093")}:</Text>
                <Text style={styles.paymentValue}>{room.userName}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>{t("00105")}:</Text>
                <Text style={styles.paymentValue}>{room.paymentMethod === 'COD' ? 'Thanh toán tại chỗ nghỉ' : 'Thanh toán Vnpay'}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>{t("00106")}:</Text>
                <Text style={[styles.paymentValue, { color: '#4CAF50' }]}>{room.paymentStatus}</Text>
              </View>
              <View style={[styles.paymentRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>{t("00107")}:</Text>
                <Text style={styles.totalValue}>
                  {room.totalPrice?.toLocaleString()} VND
                </Text>
              </View>
            </View>
          </View>

          {/* Add Cancel Button */}
          {showCancelButton && (
            <View style={styles.cancelButtonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancelBooking}
              >
                <Text style={styles.cancelButtonText}>Hủy đặt phòng</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Add bottom padding */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
    </>
   
  );
}

