import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Footer = () => {
  return (
    <View style={styles.footer}>
      {/* Vòng tròn Envelope */}
      <View style={styles.envelopeCircle}>
        <FontAwesome name="envelope" size={24} color="#b58e50" />
      </View>

      {/* Hộp nhập Email + nút mũi tên */}
      <View style={styles.subscriptionBox}>
        <TextInput
          style={styles.subscriptionInput}
          placeholder="Your email address"
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.arrowButton}>
          <Ionicons name="arrow-forward" size={24} color="#b58e50" />
        </TouchableOpacity>
      </View>

      {/* Các icon mạng xã hội */}
      <View style={styles.socialRow}>
        <FontAwesome name="twitter" size={24} color="#fff" style={styles.socialIcon} />
        <FontAwesome name="facebook" size={24} color="#fff" style={styles.socialIcon} />
        <FontAwesome name="tripadvisor" size={24} color="#fff" style={styles.socialIcon} />
        <FontAwesome name="instagram" size={24} color="#fff" style={styles.socialIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#222',
    alignItems: 'center',
    paddingVertical: 30,
  },
  envelopeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#b58e50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  subscriptionBox: {
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  subscriptionInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  arrowButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default Footer;
