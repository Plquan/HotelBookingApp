import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import SettingScreen from '@/components/screens/Setting';
export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SettingScreen/>
  );
}

