import { Stack, useRouter } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import { useAuth } from '../../utils/auth';

import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.replace('/landing');
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.topSection}>
        <Text style={styles.welcomeText}>
          Welcome, {user?.username ?? user?.email ?? 'User'}!
        </Text>
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>

      <Container>
        <ScreenContent path="app/(drawer)/index.tsx" title="Home" />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  topSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  signOutButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
