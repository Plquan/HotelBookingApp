import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '@/stores';
import CustomHeader from '@/components/ui/CustomHeader';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import Toast from 'react-native-toast-message';
import CustomButton from '@/components/ui/Button';
import { authAction } from '@/stores/authStore/authReducer';
import { createStyles } from './EditName.style';
import { useTheme } from '@/providers/ThemeContext';

export default function EditUsernameScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {currentUser, loading} = useSelector((state: RootState) => state.authStore);
  
  const [userName, setUserName] = useState(currentUser?.userName || '');

  const handleSave = async () => {
    if (!userName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng nhập tên của bạn',
        position: 'top',
      });
      return;
    }
    if(userName.trim() === currentUser?.userName) {
      router.back();
      return;
    }
    dispatch(authAction.updateProfile({ userName }));
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      <LoadingOverlayView visible={loading} text="Đang cập nhật..." />
      
      <CustomHeader 
        title="Chỉnh sửa tên"
        showBackButton={true}
        onBackPress={() => router.back()}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Tên của bạn
              <Text style={styles.required}> *</Text>
            </Text>
            <View style={styles.textboxContainer}>
              <TextInput
                style={styles.textbox}
                value={userName}
                onChangeText={setUserName}
                placeholder="Nhập tên của bạn"
                placeholderTextColor="#777"
              />
              {userName.trim() ? (
                <View style={styles.validationIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                </View>
              ) : (
                <View style={styles.validationIcon}>
                  <Ionicons name="alert-circle" size={20} color="#666" />
                </View>
              )}
            </View>
          </View>
          <View style={styles.bookingButtonWrapper}>
            <CustomButton
              title="Lưu thay đổi"
              onPress={handleSave}
              style={styles.bookingButton}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}