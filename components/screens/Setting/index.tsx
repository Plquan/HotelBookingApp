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

// Import styles từ file riêng
import styles from '@/components/screens/Setting/SettingScreen.style'

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

  // Hàm mở thư viện ảnh
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Cần quyền truy cập',
        'Ứng dụng cần quyền truy cập vào thư viện ảnh của bạn để chọn avatar.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      toggleModal();
      console.log('Selected image URI:', result.assets[0].uri);
      Alert.alert('Thành công', 'Ảnh đại diện đã được chọn thành công!');
    }
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

  return (
    <SafeAreaView style={styles.safeArea}>
       <LoadingOverlayView visible={isLoading} text="Xin chờ trong giây lát" />
      <ScrollView contentContainerStyle={styles.loggedInContainer}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={toggleModal}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require('@/assets/images/avatar.png')}
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

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Quản lí tài khoản</Text>
          <View style={styles.settingRowContainer}>
            <TouchableOpacity style={styles.settingRow}>
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
            <TouchableOpacity style={[styles.settingRow, styles.lastSettingRow]}>
              <View style={styles.settingIconContainer}>
                <FontAwesome5 name="shield-alt" size={20} color="#B58E50" />
              </View>
              <Text style={styles.settingText}>Trung tâm thông tin và bảo mật</Text>
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

        <View style={styles.logoutSection}>
          <CustomButton
            title="Đăng xuất"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Tùy chọn ảnh đại diện</Text>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={openImageLibrary}
              >
                <FontAwesome5 name="images" size={20} color="#B58E50" style={styles.modalOptionIcon} />
                <Text style={styles.modalOptionText}>Chọn từ thư viện</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={toggleModal}
              >
                <FontAwesome5 name="eye" size={20} color="#B58E50" style={styles.modalOptionIcon} />
                <Text style={styles.modalOptionText}>Xem ảnh đại diện</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={toggleModal}
              >
                <Text style={styles.modalCancelText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
