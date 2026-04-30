import { Tabs } from 'expo-router';
//import { TabBarIcon } from '@/components/TabBarIcon';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Tab One',
          title: 'Tab One',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarLabel: 'Tab Two',
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sun.max.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          tabBarLabel: 'Tab Three',
          title: 'Tab Three',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="thermometer.variable" color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          tabBarLabel: 'Tab Four',
          title: 'Tab Four',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="five"
        options={{
          tabBarLabel: 'Tab Five',
          title: 'Tab Five',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
