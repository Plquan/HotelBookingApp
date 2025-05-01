import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/providers/Languages/LanguageContext';
import { useTranslate } from '@/hooks/useTranslate';
import { useTheme } from '@/providers/ThemeContext';
import CustomHeader from '@/components/ui/CustomHeader';

export default function LanguageScreen() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const t = useTranslate();
  const { theme } = useTheme();
  
  const handleLanguageChange = async (lang: string) => {
    try {
      await setLanguage(lang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />
      
      <CustomHeader 
        title={t("00032")}
        showBackButton={true}
        onBackPress={() => router.back()}
      />

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => handleLanguageChange('vi')}
        >
          <Text style={[styles.optionText, { color: theme.text }]}>Tiếng Việt</Text>
          <View style={[
            styles.radioButton, 
            language === 'vi' && styles.radioButtonSelected
          ]}>
            {language === 'vi' && <View style={styles.radioButtonInner} />}
          </View>
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.borderInput }]} />

        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => handleLanguageChange('en')}
        >
          <Text style={[styles.optionText, { color: theme.text }]}>English</Text>
          <View style={[
            styles.radioButton, 
            language === 'en' && styles.radioButtonSelected
          ]}>
            {language === 'en' && <View style={styles.radioButtonInner} />}
          </View>
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.borderInput }]} />

        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => handleLanguageChange('zh')}
        >
          <Text style={[styles.optionText, { color: theme.text }]}>中文</Text>
          <View style={[
            styles.radioButton, 
            language === 'zh' && styles.radioButtonSelected
          ]}>
            {language === 'zh' && <View style={styles.radioButtonInner} />}
          </View>
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.borderInput }]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    paddingRight: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  optionDescription: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 5,
    flexShrink: 1,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#B58E50',
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#B58E50',
  },
  radioButtonDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginLeft: 20,
  },
});