import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { styles } from './GuestInfo.style';
import CustomButton from '@/components/ui/Button';
import isValidEmail from '@/utils/functions/validateEmail';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
const GuestInfoScreen = () => {
    const currentUser = useSelector(
        (state: RootState) => state.authStore.currentUser
      );
  const [userName, setUserName] = useState(currentUser?.userName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');
  const [note,setNote] = useState('');
  
  const navigation = useNavigation();
  
  const handleSubmit = () => {
    if (!userName || !email || !phoneNumber) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng điền đầy đủ thông tin',
        position: 'top',
      });
      return;
    }
    
    const userData = {
     userName,
      email,
      phoneNumber: `${phoneNumber}`,
    };
    
    // Submit booking
    console.log('Booking with user data:', userData);
    
    Toast.show({
      type: 'success',
      text1: 'Đặt phòng thành công!',
      position: 'top',
    });
    
    // Ví dụ: navigation.navigate('BookingConfirmation');
  };
  
  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
 <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      
      {/* PHẦN HEADER */}
            <View style={styles.headerContainer}>
        {/* Nút Back */}
        <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => navigation.goBack()}
        >
            <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Tiêu đề luôn căn giữa */}
        <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
        </View>
        </View>


      {/* HẾT PHẦN HEADER */}
      
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Họ tên
            <Text style={styles.required}> *</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              placeholder="Họ tên"
              placeholderTextColor="#777"
            />
              {userName ? (
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={16} color="limegreen" />
              </View>
            ) :  
            <View style={styles.closeCircle}>
            <Ionicons name="close" size={16} color="white" />
            </View>
           }
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Địa chỉ email
            <Text style={styles.required}> *</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor="#777"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {isValidEmail(email) ? (
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={16} color="limegreen" />
              </View>
            ) :  
            <View style={styles.closeCircle}>
            <Ionicons name="close" size={16} color="white" />
            </View>
           }

          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Số điện thoại
            <Text style={styles.required}> *</Text>
          </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Số điện thoại"
                placeholderTextColor="#777"
                keyboardType="phone-pad"
              />
            {phoneNumber ? (
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={16} color="limegreen" />
              </View>
            ) :  
            <View style={styles.closeCircle}>
            <Ionicons name="close" size={16} color="white" />
            </View>
           }
          </View>
        </View>
        <View style={[styles.formGroup]}>
  <Text style={styles.label}>
    Ghi chú
    <Text style={styles.required}> *</Text>
  </Text>
  <View style={[styles.inputContainer, { height: 140 }]}>
    <TextInput
      style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
      value={note}
      onChangeText={setNote}
      placeholder="Ghi chú"
      placeholderTextColor="#777"
      multiline
    />
  </View>

        </View>
               
      </ScrollView>
      
       <View style={styles.bookingButtonWrapper}>
       <View style={styles.priceSection}>
          <View style={styles.priceHeader}>
            <Text style={styles.originalPrice}>US$70</Text>
            <Text style={styles.discountedPrice}>US$17</Text>
          </View>
          <Text style={styles.taxInfo}>Đã bao gồm thuế và phí</Text>
        </View>
           <CustomButton
              title="Bước tiếp theo"
              onPress={handleSubmit}
              style={styles.bookingButton}
            />
       </View>
    </SafeAreaView>

      </TouchableWithoutFeedback>
   
  );
};

export default GuestInfoScreen;
