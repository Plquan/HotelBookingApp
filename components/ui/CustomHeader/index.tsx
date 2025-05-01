import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { createStyles } from './CustomHeader.style';
import { useTheme } from '@/providers/ThemeContext';
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
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      {/* Left side - either back button or placeholder */}
      <View style={styles.leftContainer}>
        {showBackButton ? (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} style={styles.backButtonColor} />
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


export default CustomHeader;