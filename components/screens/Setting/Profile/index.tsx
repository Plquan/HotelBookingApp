import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores';
import CustomHeader from '@/components/ui/CustomHeader';
import * as ImagePicker from 'expo-image-picker';
import styles from './Profile.style';

export default function ProfileScreen() {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.authStore.currentUser);
  
  const [avatar, setAvatar] = useState(currentUser?.avatar || null);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: currentUser?.userName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      // Implement avatar upload logic here
    }
  };

  const handleFieldPress = (field: string) => {
    setActiveField(field);
  };

  const handleSave = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setActiveField(null);
    // Implement save logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      <CustomHeader 
        title="Thông tin cá nhân"
        showBackButton={true}
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <FontAwesome5 name="user" size={40} color="#666" />
              </View>
            )}
            <View style={styles.editIconContainer}>
              <FontAwesome5 name="camera" size={14} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleFieldPress('fullName')}
          >
            <Text style={styles.label}>Họ và tên</Text>
            <Text style={styles.value}>{formData.fullName}</Text>
            <FontAwesome5 name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleFieldPress('email')}
          >
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{formData.email}</Text>
            <FontAwesome5 name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleFieldPress('phone')}
          >
            <Text style={styles.label}>Số điện thoại</Text>
            <Text style={styles.value}>{formData.phone}</Text>
            <FontAwesome5 name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={activeField !== null}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {activeField === 'fullName' ? 'Chỉnh sửa họ tên' :
               activeField === 'email' ? 'Chỉnh sửa email' :
               'Chỉnh sửa số điện thoại'}
            </Text>
            
            <TextInput
              style={styles.modalInput}
              value={formData[activeField as keyof typeof formData]}
              onChangeText={(text) => setFormData(prev => ({ ...prev, [activeField as string]: text }))}
              keyboardType={activeField === 'email' ? 'email-address' : 
                          activeField === 'phone' ? 'phone-pad' : 'default'}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setActiveField(null)}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => handleSave(activeField as string, formData[activeField as keyof typeof formData])}
              >
                <Text style={styles.modalButtonText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}