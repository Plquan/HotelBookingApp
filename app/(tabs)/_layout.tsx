import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/ui/Tab/HapticTab';
import { IconSymbol } from '@/components/ui/Icon/IconSymbol';
import TabBarBackground from '@/components/ui/Tab/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: Platform.select({
        ios: {
          position: 'absolute',
          backgroundColor: '#111', 
          height: 85,            
          borderTopWidth: 1,       
          borderTopColor: '#555',  
          shadowOffset: { width: 0, height: -5 }, 
          shadowOpacity: 0.1,       
          shadowRadius: 5,          
        },
        default: {
          backgroundColor: '#111',
          height: 85,
        },
      }),
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
        }}
      />
     <Tabs.Screen
          name="saved"
          options={{
            title: 'Đã lưu',
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
          title: 'Đã đặt',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="suitcase.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
       
    </Tabs>
  );
}
