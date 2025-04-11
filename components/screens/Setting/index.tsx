import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import MainLayout from '@/components/Layouts/MainLayout';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores';
import getAccessToken from '@/utils/functions/accessToken';
import * as ImagePicker from 'expo-image-picker';
import authSevices from '@/services/authServices';
import { authAction } from '@/stores/authStore/authReducer';

export default function SettingScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
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
    // Hiển thị hộp thoại xác nhận trước khi đăng xuất
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
          await authSevices.logout();
          dispatch(authAction.logout())
            // router.navigate('/(tab)');
          },
          style: 'destructive'
        }
      ]
    );
  };

  // Hàm mở thư viện ảnh
  const openImageLibrary = async () => {
    // Kiểm tra quyền truy cập vào thư viện ảnh
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Cần quyền truy cập',
        'Ứng dụng cần quyền truy cập vào thư viện ảnh của bạn để chọn avatar.'
      );
      return;
    }

    // Mở thư viện ảnh để chọn
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    // Xử lý kết quả sau khi chọn ảnh
    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Đóng modal
      toggleModal();
      
      // Tại đây bạn có thể thêm code để lưu uri của ảnh vào state hoặc gửi lên server
      console.log('Selected image URI:', result.assets[0].uri);
      
      // Ví dụ: cập nhật ảnh đại diện trong Redux store hoặc gửi API cập nhật avatar
      // dispatch(updateAvatar(result.assets[0].uri));
      
      // Hiển thị thông báo thành công
      Alert.alert('Thành công', 'Ảnh đại diện đã được chọn thành công!');
    }
  };

  // Nếu người dùng chưa đăng nhập, hiển thị màn hình đăng nhập
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

  // Nếu người dùng đã đăng nhập, hiển thị các thông tin tài khoản
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.loggedInContainer}>
        {/* Header với thông tin user */}
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            {/* Bấm vào avatar để mở modal */}
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

        {/* Section Trợ giúp */}
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

        {/* Section Dành cho chủ chỗ nghỉ */}
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

        {/* Button đăng xuất */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        {/* Modal hiển thị tùy chọn cho avatar */}
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
                onPress={() => {
                  toggleModal();
                }}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333',
  },
  // Not logged in styles
  container: {
    flexGrow: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginWrapper: {
    backgroundColor: '#444', 
    width: '90%',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: '#333', 
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  description: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: '#B58E50', // Thay đổi từ #007AFF sang #B58E50 để phù hợp với HomeScreen
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Logged in styles
  loggedInContainer: {
    flexGrow: 1,
    backgroundColor: '#333',
    paddingBottom: 30,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#B58E50', // Thay đổi từ gold sang #B58E50
    padding: 2,
    marginRight: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  nameContainer: {
    justifyContent: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
  },
  
  // Các section mới
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  
  // Section header
  sectionHeader: {
    color: 'white', // Thay đổi màu xám sang #B58E50
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 10,
    paddingBottom: 8,
  },
  
  // Container cho các setting row để bo tròn cả nhóm
  settingRowContainer: {
    backgroundColor: '#1C1C1E', // Sửa từ #1E1E1E sang #1C1C1E
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  // Setting row styling
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  
  // Row cuối cùng không có border ở dưới
  lastSettingRow: {
    borderBottomWidth: 0,
  },
  
  settingIconContainer: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  settingText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  
  rowArrow: {
    marginLeft: 'auto',
    opacity: 0.5,
  },
  
  // Logout section và button
  logoutSection: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  
  logoutButton: {
    backgroundColor: '#444', // Sửa từ #1E1E1E sang #1C1C1E
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  logoutText: {
    color: 'red', // Giữ nguyên màu đỏ cho chữ đăng xuất
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1C1C1E', // Sửa từ #1E1E1E sang #1C1C1E
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  modalOption: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOptionIcon: {
    marginRight: 10,
    width: 24,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#B58E50', // Thay đổi từ #007AFF sang #B58E50
  },
  modalCancel: {
    marginTop: 15,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    fontWeight: '500',
  },
});