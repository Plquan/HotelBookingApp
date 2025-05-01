import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import Toast from 'react-native-toast-message';
import { AppDispatch, RootState } from '@/stores/index';
import { roomTypeAction } from '@/stores/roomTypeStore/roomTypeReducer';
import { useRouter } from 'expo-router';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';
import CustomButton from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './HomeScreen.style';
import { useTranslate } from '@/hooks/useTranslate';

export default function HomeScreen() {
  const t = useTranslate();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const booking = useSelector((state: RootState) => state.bookingStore.bookingData);

  const [personCount, setPersonCount] = useState(booking.totalPerson || 1);
  const [fromDate, setFromDate] = useState(new Date(booking.fromDate));
  const [toDate, setToDate] = useState(new Date(booking.toDate));
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
    
  const handleCheckRoom = () => {
    dispatch(bookingAction.setBookingData({
      fromDate:fromDate.toISOString(),
      toDate: toDate.toISOString(),
      totalPerson:personCount
    }))
    router.navigate("/(booking)/findRoom");
  };
  useEffect(() => {
    setFromDate(new Date(booking.fromDate));
    setToDate(new Date(booking.toDate));
    setPersonCount(booking.totalPerson || 1);
  }, [booking]);
  
  useEffect(() => {
    dispatch(roomTypeAction.getRoomTypeData());
  }, [dispatch]);

  const roomTypeData = useSelector((state: RootState) => state.roomTypeStore.roomTypes);

  const toggleArrivalPicker = () => {
    setShowArrivalPicker(!showArrivalPicker);
  };
  
  const toggleDeparturePicker = () => {
    setShowDeparturePicker(!showDeparturePicker);
  };

  const onChangeArrival = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) setFromDate(selectedDate);
  };
  
  const onChangeDeparture = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const decrementpersonCount = () => {
    const currentCount = personCount;
    if (currentCount > 1) {
      setPersonCount(currentCount - 1);
    }
  };

  const incrementpersonCount = () => {
    const currentCount = personCount;
    setPersonCount(currentCount + 1);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft}>
          <Image
            source={require('@/assets/images/skyline-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>SKYLINE</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Banner */}
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={require('@/assets/images/banner.jpg')}
              style={styles.bannerImage}
            >
              <View style={styles.overlay}>
                <Text style={styles.bannerTitle}>{t("00069")}</Text>
                <Text style={styles.bannerSubtitle}>{t("00070")}</Text>
              </View>
            </ImageBackground>
          </View>

          {/* Booking Form */}
          <View style={styles.bookingContainer}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>{t("00064")}</Text>
              <TouchableOpacity onPress={toggleArrivalPicker} style={styles.row}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={format(fromDate, 'dd/MM/yyyy')} 
                  placeholder="Select date"                 
                />
                <FontAwesome name="calendar" size={20} color="gray" />
              </TouchableOpacity>
              {showArrivalPicker && (
                <DateTimePicker 
                  value={fromDate}
                  locale="vi-VN"
                  mode="date"
                  display="inline" 
                  onChange={onChangeArrival} 
                  themeVariant='light'
                  style={{ backgroundColor: 'gainsboro',
                    borderRadius: 10,marginTop:
                     12,transform: [{ translateX:-8 }],
                     paddingLeft: 20,paddingRight: 10,                   
                    }}  
                  minimumDate={new Date()}   
                />
              )}   
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>{t("00065")}</Text>
              <TouchableOpacity onPress={toggleDeparturePicker} style={styles.row}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={format(toDate, 'dd/MM/yyyy')} 
                  placeholder="Select date"
                />
                <FontAwesome name="calendar" size={20} color="gray" />
              </TouchableOpacity>
              
              {showDeparturePicker && (
                <DateTimePicker 
                  value={toDate}
                  locale="vi-VN"
                  mode="date"
                  display="inline"
                  onChange={onChangeDeparture} 
                  themeVariant='light'
                  style={{ backgroundColor: 'gainsboro',
                    borderRadius: 10,marginTop:
                     12,transform: [{ translateX:-8 }],
                     paddingLeft: 20,paddingRight: 10,               
                    }}  
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.countBox}>
              <View style={styles.countBoxRow}>
                <Text style={styles.label}>{t("00066")}</Text>
                <View style={styles.countControls}>
                  <TouchableOpacity 
                    style={styles.countButton} 
                    onPress={decrementpersonCount}
                  >
                    <Text style={styles.countButtonText}>－</Text>
                  </TouchableOpacity>
                  <View style={styles.countDisplay}>
                    <Text style={styles.countText}>{personCount}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.countButton} 
                    onPress={incrementpersonCount}
                  >
                    <Text style={styles.countButtonText}>＋</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <CustomButton
              title={t("00068")}
              onPress={handleCheckRoom}
              style={styles.button}
            />
          </View>

          {/* LAST MINUTE SLIDER */}
          <View style={styles.lastMinuteSection}>
            <Text style={styles.lastMinuteTitle}>{t("00067")}</Text>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lastMinuteScroll}
            >
              {roomTypeData.map((room) => (
                  <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => router.push(`/(booking)/roomDetail?id=${room.id}`)}
                      key={room.id}
                    >
                 <View style={styles.lastMinuteCard}>
                  <Image source={{ uri: "https://currently-together-squid.ngrok-free.app/images/" + room.roomImages[0].url }} style={styles.lastMinuteImage} />
             
                  <View style={styles.infoContainer}>
                    <Text style={styles.hotelName}>{room.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.distance}>{room.slug}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.newPrice}>{room.price.toLocaleString("vi-VN") + "đ"}</Text>
                    </View>
                  </View>
                </View>

                    </TouchableOpacity>
              
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

