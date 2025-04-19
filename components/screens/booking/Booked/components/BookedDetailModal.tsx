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
  if (!room) return null;

  return (
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
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết đặt phòng</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Status Section */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Đã xác nhận</Text>
            <Text style={styles.bookingTitle}>Đặt phòng của bạn</Text>
            
            <View style={styles.codeContainer}>
              <View style={styles.codeRow}>
                <Text style={styles.codeLabel}>Mã đơn:</Text>
                <Text style={styles.codeValue}>{room.code}</Text>
                <TouchableOpacity style={styles.copyButton}>
                  <Ionicons name="copy-outline" size={20} color="#b58e50" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Room List Section */}
          <View style={styles.roomsContainer}>
            <Text style={styles.sectionTitle}>Danh sách phòng đã đặt</Text>
            
            {/* Time Information */}
            <View style={styles.timeContainer}>
              <Ionicons name="calendar-outline" size={24} color="white" />
              <Text style={styles.timeText}>
                {room.fromDate} - {room.toDate}
              </Text>
            </View>

            {/* Room Items */}
            <View style={styles.roomItem}>
              <Image 
                source={{ 
                  uri: "https://currently-together-squid.ngrok-free.app/images/" + 
                       (room.roomTypes?.[0]?.roomImages?.[0]?.url || 'default-image.jpg') 
                }}
                style={styles.roomImage}
              />
              <View style={styles.roomInfo}>
                <Text style={styles.roomName}>{room.roomTypes?.[0]?.name}</Text>
                <Text style={styles.roomPrice}>
                  Tổng tiền: {room.totalPrice?.toLocaleString()} VND
                </Text>
                <Text style={styles.roomQuantity}>Số lượng:1 phòng</Text>
              </View>
            </View>
          </View>

          {/* Separator Line */}
          <View style={styles.separator} />

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Thông tin thanh toán</Text>
            <View style={styles.paymentDetails}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Tên khách:</Text>
                <Text style={styles.paymentValue}>{room.userName}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Phương thức:</Text>
                <Text style={styles.paymentValue}>Thanh toán tại chỗ nghỉ</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Trạng thái:</Text>
                <Text style={[styles.paymentValue, { color: '#4CAF50' }]}>Đã xác nhận</Text>
              </View>
              <View style={[styles.paymentRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                <Text style={styles.totalValue}>
                  {room.totalPrice?.toLocaleString()} VND
                </Text>
              </View>
            </View>
          </View>

          {/* Add bottom padding */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 1,
    backgroundColor: '#222',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    backgroundColor:'#222'
  },
  statusContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookingTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: 34,
  },
  codeContainer: {
    backgroundColor: '#1a3320',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d4d36',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLabel: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
  codeValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  copyButton: {
    padding: 4,
  },
  roomsContainer: {
    padding: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 16,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  roomItem: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  roomImage: {
    width: 100,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#444',
  },
  roomInfo: {
    flex: 1,
    marginLeft: 12,
  },
  roomName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomPrice: {
    color: '#b58e50',
    fontSize: 14,
    marginBottom: 4,
  },
  roomQuantity: {
    color: '#999',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#444',
    marginHorizontal: 16,
    marginTop: 16,
  },
  footerContainer: {
    padding: 16,
    backgroundColor: '#333',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  footerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentDetails: {
    gap: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    color: '#999',
    fontSize: 14,
  },
  paymentValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 16,
  },
  totalLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#b58e50',
    fontSize: 18,
    fontWeight: 'bold',
  },
});