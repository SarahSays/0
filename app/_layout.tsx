import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth, AuthProvider } from '../utils/auth';

export const unstable_settings = {
  initialRouteName: 'landing',
};

function RootStack() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: user ? false : true,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#151718' : '#fff',
        },
        headerTintColor: colorScheme === 'dark' ? '#ECEDEE' : '#11181C',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colorScheme === 'dark' ? '#ECEDEE' : '#11181C',
        },
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="landing" options={{ headerShown: false }} />
          <Stack.Screen name="enter-email" options={{ headerShown: true }} />
          <Stack.Screen name="enter-code" options={{ headerShown: true }} />
          <Stack.Screen name="turn-on-notifications" options={{ headerShown: true }} />
          <Stack.Screen name="pick-username" options={{ headerShown: true }} />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <RootStack />
        </AuthProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
