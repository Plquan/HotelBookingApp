import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    alert('Login success!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
         source={require('../../../../assets/images/banner.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        <View style={styles.container}>
          <Text style={styles.logoText}>Skyline</Text>
          <Text style={styles.title}>LOGIN ACCOUNT</Text>
          <Text style={styles.subtitle}>
            Lorem Ipsum is simply dummy text of the printing
          </Text>

          {/* USERNAME */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* PASSWORD với icon bên phải */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>Password</Text>

            {/* Container gộp TextInput & icon */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              {/* Icon con mắt */}
              <TouchableOpacity
                style={styles.iconEye}
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesome5
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.footerLinks}>
            <Text style={styles.footerLinkText}>I don’t have an account</Text>
            <Text style={styles.footerLinkSeparator}> - </Text>
            <Text style={styles.footerLinkText}>Forgot Password</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputBox: {
    marginBottom: 15,
  },
  label: {
    color: '#b58e50',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  // ================================
  // PHẦN QUAN TRỌNG CHO Ô PASSWORD
  // ================================
  passwordContainer: {
    position: 'relative', // Container cho TextInput & icon
  },
  passwordInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    // chừa khoảng trống bên phải để icon không đè text
    paddingRight: 40,
  },
  iconEye: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }], // canh giữa theo chiều dọc
  },

  loginButton: {
    backgroundColor: '#b58e50',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerLinkText: {
    color: '#fff',
    fontSize: 14,
  },
  footerLinkSeparator: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: '#222', // Màu nền cho ô nhập
    color: '#fff', // Màu chữ
    borderRadius: 4, // Bo góc
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#555',
  },
  
});
