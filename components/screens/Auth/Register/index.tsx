// RegisterScreen.tsx - phần cập nhật với CustomButton
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image, 
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import authSevices from '@/services/authServices';
import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/stores';
import { IRegisterRequestData, IConfirmEmailRequestData } from '@/interfaces/auth/Register';
import isValidEmail from '@/utils/functions/validateEmail';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import VerificationModal from './components/VerificationModal';
import CustomButton from '@/components/ui/Button';

export default function RegisterScreen() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassWord, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // State cho modal xác thực
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  // State cho việc gửi lại mã
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  // State mới
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
  }, [countdown, isResendDisabled]);

  const handleBack = () => {
    router.back();
  };

  const handleRegister = async () => {
    if(!userName || !email || !password || !confirmPassWord || !phone) {
      Toast.show({
        type: 'error',
        text1: 'Đăng ký',
        text2: 'Vui lòng điền đầy đủ thông tin để đăng ký',
        position: 'top'
      });
      return;
    }
    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Địa chỉ email không hợp lệ !!!',
        position: 'top'
      });
      return;
    } 
    if(password !== confirmPassWord) {
      Toast.show({
        type: 'error',
        text1: 'Đăng ký',
        text2: 'Mật khẩu không khớp',
        position: 'top'
      });
      return;
    }
    try {
      setIsLoading(true);
      const params:IRegisterRequestData = {
        userName: userName,
        email: email,
        password: password,
        phone: phone
      }
      const res = await authSevices.register(params);
      
      if(res.isSuccess){
        setShowVerificationModal(true);
        setCountdown(30);
        setIsResendDisabled(true);
        setErrorMessage(null);
      }
      else{
        Toast.show({
          type: 'error',
          text1: 'Đăng ký',
          text2: `${res.message}`,
          position: 'top'
        });
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 4) {
      setErrorMessage('Vui lòng nhập đủ 4 chữ số');
      return;
    }
    
    try {
      setIsVerifying(true);
      setErrorMessage(null);
      
      const params: IConfirmEmailRequestData = {
        email: email,
        code: verificationCode
      }
      const res = await authSevices.confirmEmail(params);
      
      if(res.isSuccess){
        setShowVerificationModal(false);
        Toast.show({
          type: 'success',
          text1: 'Tạo tài khoản thành công',
          position: 'top'
        });
        router.navigate('login'); 
      } else {
        setErrorMessage('Mã xác thực không đúng');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (isResendDisabled) return; 
    try {
      setIsResending(true);
      await authSevices.resendCode(email);
      setIsResendDisabled(true);
      setCountdown(30);
      setErrorMessage(null); 
      Toast.show({
        type: 'success',
        text1: 'Đã gửi lại mã xác thực',
        position: 'top'
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Không thể gửi lại mã',
        position: 'top'
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleCloseModal = () => {
    setShowVerificationModal(false);
    setVerificationCode('');
    setCountdown(0);
    setIsResendDisabled(false);
    setErrorMessage(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <LoadingOverlayView visible={isLoading} text="Xin chờ trong giây lát" />
          
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <FontAwesome name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.logoText}>Đăng kí tài khoản</Text>
            <View style={styles.emptySpace} />
          </View>

          <View style={styles.content}>
            <Image
              style={styles.titleImage}
              source={require('@/assets/images/sky-logo-header.png')}
              resizeMode="contain"
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                placeholderTextColor="#888"
                keyboardType="default"
                autoCapitalize="none"
                value={userName}
                onChangeText={setUserName}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                placeholderTextColor="#888"
                keyboardType="numeric"
                autoCapitalize="none"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
                value={confirmPassWord}
                onChangeText={setConfirmPassword}             
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

            <CustomButton
              title="Tạo tài khoản"
              onPress={handleRegister}
              style={styles.registerButton}
            />
          </View>
        </View>
        
        <VerificationModal
          visible={showVerificationModal}
          verificationCode={verificationCode}
          onChangeCode={setVerificationCode}
          onVerify={handleVerifyCode}
          onResendCode={handleResendCode}
          onClose={handleCloseModal}
          countdown={countdown}
          isResendDisabled={isResendDisabled}
          errorMessage={errorMessage}
          isVerifying={isVerifying}
          isResending={isResending}
        />
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
  backButton: {
    padding: 4,
  },
  logoText: {
    fontSize: 22,
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
  titleImage: {
    width: '100%',
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
  registerButton: {
    marginTop: 20,
    marginBottom: 20,
  },
});