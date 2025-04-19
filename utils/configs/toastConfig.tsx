// Toast config: src/components/Toast/toastConfig.ts
import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#4BB543',
        borderRadius: 8,
        zIndex: 9999,  // Đảm bảo Toast luôn hiển thị trên cùng
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2e7d32',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4caf50',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#f44336',
        borderRadius: 8,
        zIndex: 9999,  // Đảm bảo Toast luôn hiển thị trên cùng
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b71c1c',
      }}
      text2Style={{
        fontSize: 14,
        color: '#ef5350',
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#2196f3',
        borderRadius: 8,
        zIndex: 9999,  // Đảm bảo Toast luôn hiển thị trên cùng
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0d47a1',
      }}
      text2Style={{
        fontSize: 14,
        color: '#64b5f6',
      }}
    />
  ),
};

export default toastConfig;
