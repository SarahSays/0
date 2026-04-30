import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

// Firebase Auth (Commented Out - Using Local Dev Auth)
// ====================================================
// Original Firebase integration is preserved below for future use
// Currently using local AuthProvider for development (see utils/auth.ts)
//
// To switch to Firebase auth:
//   1. Uncomment the imports below
//   2. Update this component to use Firebase's onAuthStateChanged
//   3. Update utils/auth.ts to use Firebase auth functions
//
// import { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../utils/firebase';

import { useAuth, AuthProvider } from '../utils/auth';

export const unstable_settings = {
  initialRouteName: 'landing',
};

function RootStack() {
  const { user } = useAuth();

  return (
    <Stack>
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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootStack />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
