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
import { AppDispatch, RootState } from '@/stores';
import CustomHeader from '@/components/ui/CustomHeader';
import * as ImagePicker from 'expo-image-picker';
import LoadingOverlayView from '@/components/common/Loading/LoadingOverlay';
import env from '@/constants/envConstant';
import { authAction } from '@/stores/authStore/authReducer';
const {IMAGE_URL} = env
import {createStyles} from './Profile.style';
import { useTheme } from '@/providers/ThemeContext';
import { useTranslate } from '@/hooks/useTranslate';

export default function ProfileScreen() {
  const t = useTranslate();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
   const {currentUser, loading} = useSelector((state: RootState) => state.authStore);
  
  const [avatar, setAvatar] = useState(currentUser?.avatar || null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      const base64Image = result.assets[0].base64;
      const cleanBase64 = base64Image ? base64Image.replace(/^data:image\/[^;]+;base64,/, '') : '';
      dispatch(authAction.updateProfile({avatar: cleanBase64}));
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      <LoadingOverlayView visible={loading} text="Đang cập nhật..." />
      <CustomHeader 
        title={t("00028")}
        showBackButton={true}
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
            {avatar ? (
              <Image source={{ uri: IMAGE_URL + currentUser?.avatar }} style={styles.avatar} />
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
          <Text style={styles.sectionTitle}>{t("00027")}</Text>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => router.push('/(account)/profile/editName')}
          >
            <Text style={styles.label}>{t("00025")}</Text>
            <Text style={styles.value}>{currentUser?.userName}</Text>
            <FontAwesome5 name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoRow}
          >
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{currentUser?.email}</Text>      
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoRow}         
          >
            <Text style={styles.label}>{t("00026")}</Text>
            <Text style={styles.value}>{currentUser?.phoneNumber}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}