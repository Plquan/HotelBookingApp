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
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './PaymentInfoModal.style';
import { useTranslate } from '@/hooks/useTranslate';


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
  const t = useTranslate();
  const selectedRooms = useSelector((state: RootState) => state.bookingStore.selectedRoom);
  const bookingData = useSelector((state: RootState) => state.bookingStore.bookingData);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleClose = () => {
    onClose(); 
    setTimeout(() => {
      router.replace("/(tabs)"); // Navigate to home after modal animation completes
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
              <Ionicons name="close" size={24} color={useTheme().theme.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t("00098")}</Text>
            <TouchableOpacity style={styles.helpButton}>
              <Ionicons name="help-circle-outline" size={24} color={useTheme().theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Confirmation Status */}
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationStatus}>{t("00103")}</Text>
              <Text style={styles.confirmationTitle}>{t("00099")}</Text>
              
              <View style={styles.codeContainer}>
                <View style={styles.codeRow}>
                  <Text style={styles.codeLabel}>{t("00100")}:</Text>
                  <Text style={styles.codeValue}>{bookingCode}</Text>
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
                <Ionicons name="calendar-outline" size={24} color={useTheme().theme.text} />
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
                    <Text style={styles.roomPrice}>{t("00095")}: 
                      {room.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Text>
                    <Text style={styles.roomQuantity}>{t("00102")}: {room.count} {t("00094")}</Text>
                  </View>
                </View>
              ))}

              {/* Total Price Summary */}
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceLabel}>{t("00095")}:</Text>
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

