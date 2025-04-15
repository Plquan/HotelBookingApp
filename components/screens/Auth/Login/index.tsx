import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Keyboard, TouchableWithoutFeedback
} from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import authSevices from '@/services/authServices';
import { ILoginRequestData, ILoginResponseData } from "@/interfaces/auth/LoginType";
import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux";
import { authAction } from '@/stores/authStore/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '@/stores';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import BackButton from '@/components/ui/ButtonBack';

export default function LoginScreen() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const handleLogin = async () => {
       Keyboard.dismiss()
    if(!userName || !password){
     Toast.show({
        type: 'error',
        text1:  'Đăng nhập',
        text2: 'Vui lòng điền đầy đủ thông tin để đăng nhập',
        position: 'top'
      });
      
    }
     try {
      setIsLoading(true)
      const params: ILoginRequestData = {
        userName:userName,
        password:password
      }
      const res = await authSevices.login(params);
       if(res.isSuccess){
        Toast.show({
          type: 'success',
          text1:  'Đăng nhập thành công',
          position: 'top'
        });
        await AsyncStorage.setItem("accessToken", res.data?.accessToken || '');
        dispatch(authAction.getCurrentUser())
        router.back()
       }
       else{
        Toast.show({
          type: 'error',
          text1: `${res.message}`,
          position: 'top'
        });
       }
     } catch (error) {
      console.log('Lỗi đăng kí',error)
     }
     finally{
      setIsLoading(false)
     }
  }

  return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LoadingOverlayView visible={isLoading} text="Xin chờ trong giây lát" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton/>
          <Text style={styles.logoText}>Đăng nhập</Text>
          <View style={styles.emptySpace} />
        </View>

       
        <View style={styles.content}>
          <Image
            style={styles.titleImage}
            source={require('@/assets/images/sky-logo-header.png')}
            resizeMode="contain"
          />

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={userName}
              onChangeText={setUserName}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <FontAwesome5 
                name={showPassword ? 'eye-slash' : 'eye'} 
                size={20} 
                color="#888" 
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          {/* Or divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.divider} />
          </View>

          {/* Register Link */}
          <TouchableOpacity style={styles.registerButton} onPress={() => {  router.replace('/(auth)/register');}}>
            <Text style={styles.registerButtonText}>Tạo tài khoản mới</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
   </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptySpace: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  /* Style cho hình ảnh title */
  titleImage: {
    width: '100%', // hoặc bạn có thể cố định một giá trị số ví dụ: 250
    height: 60,
    marginBottom: 30,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#b58E50',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#B58E50',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#888',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#b58E50',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#b58E50',
    fontSize: 16,
    fontWeight: '500',
  },
});
