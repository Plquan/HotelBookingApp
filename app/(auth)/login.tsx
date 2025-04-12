import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import LoginScreen from '@/components/screens/Auth/Login';


export default function LoginTab() {
  const router = useRouter();

  return (
   <LoginScreen/>
  );
}
