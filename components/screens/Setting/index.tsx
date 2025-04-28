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
} from 'react-native';
import MainLayout from '@/components/Layouts/MainLayout';
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
const {IMAGE_URL} = env

// Import styles từ file riêng
import styles from '@/components/screens/Setting/Setting.style';

export default function SettingScreen() {
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
  const [currentLanguage, setCurrentLanguage] = useState('vi');

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
      <MainLayout>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.loginWrapper}>
              <View style={styles.avatarContainer}>
                <FontAwesome5 name="user" size={60} color="#fff" />
              </View>
              <Text style={styles.description}>
                Đăng nhập để quản lý chuyến đi và nhận giảm giá Genius tại các
                chỗ nghỉ trên toàn cầu.
              </Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </MainLayout>
    );
  }

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'vi' ? 'en' : 'vi');
  };

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
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome5 name="comment" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome5 name="bell" size={22} color="#fff" />
            </TouchableOpacity>
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
          <Text style={styles.sectionHeader}>Quản lí tài khoản</Text>
          <View style={styles.settingRowContainer}>
            <TouchableOpacity style={styles.settingRow} onPress={() => router.push('/(account)/profile')}>
              <View style={styles.settingIconContainer}>
                <FontAwesome5 name="question-circle" size={20} color="#B58E50" />
              </View>
              <Text style={styles.settingText}>Thông tin cá nhân</Text>
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
              <Text style={styles.settingText}>Mật khẩu và bảo mật</Text>
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
          <Text style={styles.sectionHeader}>Dành cho chủ chỗ nghỉ</Text>
          <View style={styles.settingRowContainer}>
            <TouchableOpacity style={[styles.settingRow, styles.lastSettingRow]}>
              <View style={styles.settingIconContainer}>
                <FontAwesome5 name="home" size={20} color="#B58E50" />
              </View>
              <Text style={styles.settingText}>Đăng chỗ nghỉ</Text>
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
          <Text style={styles.sectionHeader}>Cài đặt</Text>
          <View style={styles.settingRowContainer}>
            <TouchableOpacity style={styles.settingRow} onPress={toggleLanguage}>
              <View style={styles.settingIconContainer}>
                <FontAwesome5 name="language" size={20} color="#B58E50" />
              </View>
              <Text style={styles.settingText}>Ngôn ngữ</Text>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>
                  {currentLanguage === 'vi' ? 'Tiếng Việt' : 'English'}
                </Text>
                <FontAwesome5
                  name="chevron-right"
                  size={16}
                  color="#8E8E93"
                  style={styles.rowArrow}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingRow, styles.lastSettingRow]}>
              <View style={styles.settingIconContainer}>
                <FontAwesome5 name="sun" size={20} color="#B58E50" />
              </View>
              <Text style={styles.settingText}>Giao diện</Text>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>Tối</Text>
                <FontAwesome5
                  name="chevron-right"
                  size={16}
                  color="#8E8E93"
                  style={styles.rowArrow}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.logoutSection}>
          <CustomButton
            title="Đăng xuất"
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