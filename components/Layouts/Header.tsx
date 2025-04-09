import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const Header = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.replace('(tabs)'); // Điều hướng về route gốc
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleRefresh}>
        <Image
          source={require('@/assets/images/sky-logo-header.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Header;