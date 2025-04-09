import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MainLayout from '@/components/Layouts/MainLayout';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from "expo-router";



export default function SettingScreen() {
    const router = useRouter();

    const handleLogin = () => {
        router.navigate("/(auth)/login");
    };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.loginWrapper}>
          {/* Thay Image bằng icon user */}
          <View style={styles.avatarContainer}>
            <FontAwesome5 name="user" size={60} color="#fff" />
          </View>

          <Text style={styles.description}>
            Đăng nhập để quản lý chuyến đi và nhận giảm giá Genius 
            tại các chỗ nghỉ trên toàn cầu.
          </Text>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginWrapper: {
    backgroundColor: '#444',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: '#666',
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
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
