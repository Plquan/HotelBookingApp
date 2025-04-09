import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import LoginScreen from '@/components/screens/Auth/Login';


export default function login() {
  const router = useRouter();

  return (
   <LoginScreen/>
  );
}
