import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  StatusBar,
  Switch
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores';
import * as ImagePicker from 'expo-image-picker';
import authSevices from '@/services/authServices';
import { authAction } from '@/stores/authStore/authReducer';
import CustomButton from '@/components/ui/Button';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import  env from '@/constants/envConstant';
import { useTheme } from '@/providers/ThemeContext';
import { createStyles } from './Setting.style';
const {IMAGE_URL} = env;
import { useTranslate } from '@/hooks/useTranslate';

export default function SettingScreen() {
  const t = useTranslate();
  const { theme, toggleTheme,themeMode } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.authStore.isAuthenticated
  );
  const currentUser = useSelector(
    (state: RootState) => state.authStore.currentUser
  );
  
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    router.push('/(auth)/login');
  };

  // Hàm bật/tắt Modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Đăng xuất',
          onPress: async () => {
           try {
            setIsLoading(true)
            await authSevices.logout();
            dispatch(authAction.logout());
           } catch (error) {
            console.log('lỗi đăng xuất')
           }
           finally{
            setIsLoading(false)
           }
          },
          style: 'destructive'
        }
      ]
    );
  };

  if (!isAuthenticated) {
    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.loginWrapper}>
              <View style={styles.avatarContainer}>
                <FontAwesome5 name="user" size={60} color="#fff" />
              </View>
              <Text style={styles.description}>
              {t("00020")}
              </Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>{t("00001")}</Text>
              </TouchableOpacity>
            </View>

            
          </ScrollView>
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <LoadingOverlayView visible={isLoading} text="Xin chờ trong giây lát" />

      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={toggleModal}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{uri: IMAGE_URL + currentUser?.avatar}}
                  defaultSource={require('@/assets/images/avatar.png')}
                  style={styles.avatar}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>
                {currentUser?.userName || 'User'}
              </Text>
            </View>
          </View>
  
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t("00021")}</Text>
          <View style={styles.settingRowContainer}>
            <TouchableOpacity style={styles.settingRow} onPress={() => router.push('/(account)/profile')}>
              <View style={styles.settingIconContainer}>
                <FontAwesome5 name="question-circle" size={20} color="#B58E50" />
              </View>
              <Text style={styles.settingText}>{t("00024")}</Text>
              <FontAwesome5
                name="chevron-right"
                size={16}
                color="#8E8E93"
                style={styles.rowArrow}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.settingRow, styles.lastSettingRow]} 
              onPress={() => router.push('/(account)/changePassword')}
            >
              <View style={styles.settingIconContainer}>
                <FontAwesome5 name="shield-alt" size={20} color="#B58E50" />
              </View>
              <Text style={styles.settingText}>{t("00022")}</Text>
              <FontAwesome5
                name="chevron-right"
                size={16}
                color="#8E8E93"
                style={styles.rowArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
       
    
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t("00018")}</Text>
          <View style={styles.settingRowContainer}>
            <TouchableOpacity style={styles.settingRow} onPress={() => router.push('/(account)/language')}>
              <View style={styles.settingIconContainer}>
                <FontAwesome5 name="language" size={20} color="#B58E50" />
              </View>
              <Text style={styles.settingText}>{t("00032")}</Text>
              <View style={styles.settingValueContainer}>
                <FontAwesome5
                  name="chevron-right"
                  size={16}
                  color="#8E8E93"
                  style={styles.rowArrow}
                />
              </View>
            </TouchableOpacity>

            <View style={[styles.settingRow, styles.lastSettingRow]}>
              <View style={styles.settingIconContainer}>
                <FontAwesome5 
                  name={themeMode ? "moon" : "sun"} 
                  size={20} 
                  color="#B58E50" 
                />
              </View>
              <Text style={styles.settingText}>{t("00033")}</Text>
              <View style={styles.settingValueContainer}>
                <Switch
                  trackColor={{ false: "#767577", true: "#B58E50" }}
                  thumbColor={theme ? "#fff" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleTheme}
                  value={themeMode}
                  style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.logoutSection}>
          <CustomButton
            title={t("00023")}
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleModal}
        >
          <View style={styles.modalImageContainer}>
            <Image
             source={{uri: IMAGE_URL + currentUser?.avatar}}
              style={styles.zoomedAvatar}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}