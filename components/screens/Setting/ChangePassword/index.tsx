import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomHeader from '@/components/ui/CustomHeader';
import accountServices from '@/services/accountServices';
import { IChangePasswordData } from '@/interfaces/account/IAccountType';
import Toast from 'react-native-toast-message';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import { createStyles } from './ChangePassword.style';
import { useTheme } from '@/providers/ThemeContext';
import { useTranslate } from '@/hooks/useTranslate';
export default function ChangePasswordScreen() {
  const t = useTranslate();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });


  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
 

  const handleSave = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
   try {
    setIsLoading(true);
    const params:IChangePasswordData = {
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
    }
    const res = await accountServices.changePassword(params);
    if( res.isSuccess){
        Toast.show({
            type: 'success',
            text1: `${res.message}`,    
            position: 'top',
            visibilityTime: 1500,
        });
    }
    else{
        Toast.show({
            type: 'error',
            text1: `${res.message}`,    
            position: 'top',
            visibilityTime: 1500,
        });
    }
    setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        });
    router.back();
   } catch (error) {
    console.log('Lỗi đổi mật khẩu',error)
   }
   finally {
    setIsLoading(false);
   }
  };

  return (
    <SafeAreaView style={styles.container}>
       <LoadingOverlayView visible={isLoading} text="Xin chờ trong giây lát" />
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      <CustomHeader 
        title={t("00038")}
        showBackButton={true}
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t("00035")}</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                value={formData.currentPassword}
                onChangeText={(text) => setFormData({...formData, currentPassword: text})}
                placeholder={t("00035")}
                placeholderTextColor="#666"
                secureTextEntry={!showPasswords.current}
              />
              <TouchableOpacity
                onPress={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                style={styles.eyeIcon}
              >
                <FontAwesome5 
                  name={showPasswords.current ? "eye" : "eye-slash"} 
                  size={18} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t("00036")}</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                value={formData.newPassword}
                onChangeText={(text) => setFormData({...formData, newPassword: text})}
                placeholder={t("00036")}
                placeholderTextColor="#666"
                secureTextEntry={!showPasswords.new}
              />
              <TouchableOpacity
                onPress={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                style={styles.eyeIcon}
              >
                <FontAwesome5 
                  name={showPasswords.new ? "eye" : "eye-slash"} 
                  size={18} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t("00039")}</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                placeholder={t("00037")}
                placeholderTextColor="#666"
                secureTextEntry={!showPasswords.confirm}
              />
              <TouchableOpacity
                onPress={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                style={styles.eyeIcon}
              >
                <FontAwesome5 
                  name={showPasswords.confirm ? "eye" : "eye-slash"} 
                  size={18} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{t("00038")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}