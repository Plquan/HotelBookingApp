import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import MainLayout from '@/components/Layouts/MainLayout';
// Nếu bạn muốn Dropdown quốc gia, có thể dùng Picker hoặc thư viện dropdown
// import { Picker } from '@react-native-picker/picker';

export default function UserInfoScreen() {
  // State cho dữ liệu form
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Việt Nam');
  const [phone, setPhone] = useState('');

  // Sự kiện bấm nút "Bước tiếp theo"
  const handleNextStep = () => {
    // TODO: Xử lý logic (chuyển màn hình, validate, v.v.)
    alert('Chuyển sang bước tiếp theo!');
  };

  // Sự kiện bấm nút "Đăng nhập"
  const handleLogin = () => {
    // TODO: Điều hướng hoặc mở modal đăng nhập
    alert('Mở màn hình đăng nhập!');
  };

  return (
    <MainLayout>
      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.headerRight}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung chính */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Họ của khách */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Họ của khách *</Text>
          <TextInput
            style={styles.input}
            placeholder="Vui lòng nhập họ của bạn"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Tên của khách */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên của khách *</Text>
          <TextInput
            style={styles.input}
            placeholder="Vui lòng nhập tên của bạn"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        {/* Địa chỉ email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Địa chỉ email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Vui lòng nhập địa chỉ email của bạn"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Vùng/quốc gia */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Vùng/quốc gia *</Text>
          {/* Nếu muốn Dropdown, dùng Picker hoặc thư viện dropdown */}
          <TextInput
            style={styles.input}
            placeholder="Vui lòng nhập quốc gia"
            placeholderTextColor="#999"
            value={country}
            onChangeText={setCountry}
          />
          {/*
          <Picker
            selectedValue={country}
            style={styles.input}
            onValueChange={(itemValue) => setCountry(itemValue)}
          >
            <Picker.Item label="Việt Nam" value="Việt Nam" />
            <Picker.Item label="United States" value="United States" />
            <Picker.Item label="Japan" value="Japan" />
            ...
          </Picker>
          */}
        </View>

        {/* Số điện thoại */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Số điện thoại *</Text>
          <TextInput
            style={styles.input}
            placeholder="Vui lòng nhập số điện thoại"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </ScrollView>

      {/* Thanh đáy */}
      <View style={styles.bottomBar}>
        <Text style={styles.priceText}>US$28 Đã bao gồm thuế và phí</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Bước tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#333', // Nền xám đậm
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#222',
    borderColor: '#b58e50', // Màu viền nâu (nếu muốn)
    borderWidth: 1, // Nếu muốn hiển thị viền
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    color: '#fff',
    fontSize: 15,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#007AFF', // Màu xanh dương
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
