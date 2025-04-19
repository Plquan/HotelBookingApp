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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const formatDateToVietnamese = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day} thg ${month}`;
};

export default function BookingDetailScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
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
              <Text style={styles.codeValue}>{"bookingCode"}</Text>
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
              {formatDateToVietnamese(new Date())} - {formatDateToVietnamese(new Date())}
            </Text>
          </View>

          {/* Room Items */}
          <View style={styles.roomItem}>
            <Image 
              style={styles.roomImage}
              defaultSource={require('@/assets/images/room1.jpg')}
            />
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>Room Name</Text>
              <Text style={styles.roomPrice}>Tổng tiền: 1,000,000 VND</Text>
              <Text style={styles.roomQuantity}>Số lượng: 1 phòng</Text>
            </View>
          </View>

          {/* Total Price */}
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceLabel}>Tổng tiền:</Text>
            <Text style={styles.totalPriceValue}>1,000,000 VND</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpButton: {
    padding: 5,
  },
  content: {
    flex: 1,
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
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#444',
    marginTop: 16,
  },
  totalPriceLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPriceValue: {
    color: '#b58e50',
    fontSize: 18,
    fontWeight: 'bold',
  },
});