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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MainLayout from '@/components/Layouts/MainLayout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import Toast from 'react-native-toast-message';
import { AppDispatch, RootState } from '@/stores/index';
import { roomTypeAction } from '@/stores/roomTypeStore/roomTypeReducer';
import { useRouter } from 'expo-router';
import { bookingAction } from '@/stores/bookingStore/bookingReducer';

export default function HomeScreen() {
  const [children, setChildren] = useState('2');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
    
        const handleCheckRoom = () => {
          dispatch(bookingAction.setFromDate(new Date(fromDate).toISOString()));
          dispatch(bookingAction.setToDate(new Date(toDate).toISOString()));

            router.navigate("/(booking)/findRoom");
        };


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
  
  return (
    <MainLayout>
          {/* Banner */}
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={require('../../../assets/images/banner.jpg')}
              style={styles.bannerImage}
            >
              <View style={styles.overlay}>
                <Text style={styles.bannerTitle}>Enjoy a Luxury Experience</Text>
                <Text style={styles.bannerSubtitle}>HOTELS & RESORTS</Text>
              </View>
            </ImageBackground>
          </View>

          {/* Booking Form */}
          <View style={styles.bookingContainer}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>NGÀY ĐẾN</Text>
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
              <Text style={styles.label}>NGÀY ĐI</Text>
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
              <Text style={styles.label}>KHÁCH</Text>
              <TextInput
                style={styles.countInput}
                value={children}
                onChangeText={setChildren}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCheckRoom}>
              <Text style={styles.buttonText}>TÌM PHÒNG</Text>
            </TouchableOpacity>
          </View>

          {/* LAST MINUTE SLIDER */}
          <View style={styles.lastMinuteSection}>
            <Text style={styles.lastMinuteTitle}>Lựa chọn cho phút chót</Text>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lastMinuteScroll}
            >
              {roomTypeData.map((room) => (
                <View key={room.id} style={styles.lastMinuteCard}>
                  <Image source={{ uri: "https://currently-together-squid.ngrok-free.app/images/" + room.roomImages[0].url }} style={styles.lastMinuteImage} />
                  
                  <View style={styles.infoContainer}>
                    <Text style={styles.hotelName}>{room.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.distance}>{room.slug}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.newPrice}>{room.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  /* Banner */
  bannerContainer: {
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    borderRadius: 5,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },

  /* Booking Form */
  bookingContainer: {
    backgroundColor: '#444',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    color: '#b58e50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: '#888',
  },
  countBox: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  countInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#b58e50',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  lastMinuteSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  lastMinuteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    marginBottom: 10,
  },
  lastMinuteScroll: {
    paddingLeft: 10,
  },
  lastMinuteCard: {
    width: 220,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
  },
  lastMinuteImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  hotelName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  distance: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  newPrice: {
    fontSize: 18,
    color: '#B58E50', 
    fontWeight: 'bold',
  },
});