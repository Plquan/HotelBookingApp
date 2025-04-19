import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingOverlayViewProps {
  visible: boolean;
  text?: string;
}

const LoadingOverlayView: React.FC<LoadingOverlayViewProps> = ({
  visible,
  text = 'Xin chờ trong giây lát',
}) => {
  if (!visible) return null; // Không hiện gì khi ẩn

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>{text}</Text>
      </View>
    </View>
  );
};

export default LoadingOverlayView;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // đảm bảo overlay nằm trên cùng
  },
  container: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
  },
});
