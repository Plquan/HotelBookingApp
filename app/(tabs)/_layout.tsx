import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/ui/Tab/HapticTab';
import { IconSymbol } from '@/components/ui/Icon/IconSymbol';
import { useTheme } from '@/providers/ThemeContext';
import { useTranslate } from '@/hooks/useTranslate';

export default function TabLayout() {
  const { theme, themeMode } = useTheme();
  const t = useTranslate();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#B58E50',
        tabBarInactiveTintColor: themeMode ? '#666' : '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: theme.background,
            height: 80,
            borderTopWidth: 1,
            borderTopColor: theme.borderInput,
            shadowOffset: { width: 0, height: -5 },
            shadowOpacity: themeMode ? 0.2 : 0.1,
            shadowRadius: 5,
          },
          default: {
            backgroundColor: theme.background,
            height: 80,
            borderTopColor: theme.borderInput,
            borderTopWidth: 1,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("00108"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
        }}
      />
     <Tabs.Screen
          name="saved"
          options={{
            title: t("00109"),
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={28}
                name={focused ? 'heart.fill' : 'heart'}
                color={color}
              />
            ),
          }}
        />
       <Tabs.Screen
        name="booked"
        options={{
          title: t("00110"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="suitcase.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: t("00111"),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
       
    </Tabs>
  );
}
