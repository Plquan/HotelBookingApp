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
import CustomHeader from '@/components/ui/CustomHeader';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './login.style';
import { useTranslate } from '@/hooks/useTranslate';

export default function LoginScreen() {
  const t = useTranslate();
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
      return
    }
     try {
      setIsLoading(true)
      const params: ILoginRequestData = {
        userName:userName,
        password:password
      }
      const res = await authSevices.login(params);
       if(res.isSuccess){
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

        <CustomHeader 
                title= {t("00001")}
                showBackButton={true}
            />

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.titleImage}
              source={require('@/assets/images/skyline-logo.png')}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>SKYLINE</Text>
          </View>

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
              placeholder={t("00004")}
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
            <Text style={styles.forgotPasswordText}>{t("00003")}</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>{t("00001")}</Text>
          </TouchableOpacity>

          {/* Or divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>{t("00005")}</Text>
            <View style={styles.divider} />
          </View>

          {/* Register Link */}
          <TouchableOpacity style={styles.registerButton} onPress={() => {  router.replace('/(auth)/register');}}>
            <Text style={styles.registerButtonText}>{t("00002")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
   </TouchableWithoutFeedback>
  );
}

