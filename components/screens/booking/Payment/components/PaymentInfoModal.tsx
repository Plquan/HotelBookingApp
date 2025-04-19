import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const formatDateToVietnamese = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear()
  return `${day} thg ${month}, ${year}`;
};

const calculateTotalPrice = (rooms: any[]) => {
  return rooms.reduce((total, room) => total + room.totalPrice, 0);
};

interface BookingConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  bookingCode: string
}

export default function BookingConfirmationModal({ visible, onClose, bookingCode }: BookingConfirmationModalProps) {
  const selectedRooms = useSelector((state: RootState) => state.bookingStore.selectedRoom);
  const bookingData = useSelector((state: RootState) => state.bookingStore.bookingData);

  const handleClose = () => {
    onClose(); 
    setTimeout(() => {
      router.push('/(tabs)'); // Navigate to home after modal animation completes
    }, 300); // Wait for modal close animation
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Xác nhận đặt phòng</Text>
            <TouchableOpacity style={styles.helpButton}>
              <Ionicons name="help-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Confirmation Status */}
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationStatus}>Đã xác nhận</Text>
              <Text style={styles.confirmationTitle}>Đặt phòng của bạn</Text>
              
              <View style={styles.codeContainer}>
                <View style={styles.codeRow}>
                  <Text style={styles.codeLabel}>Mã đơn:</Text>
                  <Text style={styles.codeValue}>{bookingCode}</Text>
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
                  {formatDateToVietnamese(new Date(bookingData.fromDate))} - {formatDateToVietnamese(new Date(bookingData.toDate))}
                </Text>
              </View>

              {/* Room Items */}
              {selectedRooms.map((room, index) => (
                <View key={index} style={styles.roomItem}>
                  <Image 
                    style={styles.roomImage}
                    source={{ uri: `https://currently-together-squid.ngrok-free.app/images/${room.image}` }}
                    defaultSource={require('@/assets/images/room1.jpg')}
                  />
                  <View style={styles.roomInfo}>
                    <Text style={styles.roomName}>{room.name}</Text>
                    <Text style={styles.roomPrice}>Tổng tiền: 
                      {room.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Text>
                    <Text style={styles.roomQuantity}>Số lượng: {room.count} phòng</Text>
                  </View>
                </View>
              ))}

              {/* Total Price Summary */}
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceLabel}>Tổng tiền:</Text>
                <Text style={styles.totalPriceValue}>
                  {calculateTotalPrice(selectedRooms).toLocaleString('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  })}
                </Text>
              </View>
            </View>

            <View style={{ height: 20 }} />

            
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#222',
    height: height * 0.9,
    borderTopLeftRadius: 20,

    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  closeButton: {
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginBottom: 16,
    borderRadius: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  confirmationContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  confirmationStatus: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  confirmationTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: 34,
    maxWidth:300
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
    marginBottom: 12,
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
  roomItem: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth:1,
    borderColor:'#444'
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
  bookingDetailsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  propertyName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  propertyPrice: {
    color: 'white',
    fontSize: 16,
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingDetailText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
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