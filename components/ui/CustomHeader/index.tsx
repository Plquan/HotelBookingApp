import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

const CustomHeader = ({
  title,
  showBackButton = true,
  onBackPress,
  rightComponent,
}: CustomHeaderProps) => {
  
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      {/* Left side - either back button or placeholder */}
      <View style={styles.leftContainer}>
        {showBackButton ? (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyButton} />
        )}
      </View>
      
      {/* Center - title */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      
      {/* Right side - either custom component or placeholder */}
      <View style={styles.rightContainer}>
        {rightComponent ? rightComponent : <View style={styles.emptyButton} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 5,
  },
  emptyButton: {
    width: 34,
    height: 34,
  },
  headerTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CustomHeader;