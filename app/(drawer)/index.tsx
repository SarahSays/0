import { Stack, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedButton } from '@/components/themed-button';
import { useAuth } from '../../utils/auth';

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
      <ThemedView style={styles.topSection}>
        <ThemedText type="defaultSemiBold" style={styles.welcomeText}>
          Welcome to Orbits, {user?.username ?? user?.email ?? 'User'}!
        </ThemedText>
        <ThemedButton
          style={styles.signOutButton}
          onPress={handleSignOut}
          lightColor="#000"
          darkColor="#fff"
        >
          Sign Out
        </ThemedButton>
      </ThemedView>

      <Container>
        <ScreenContent path="app/(drawer)/index.tsx" title="Home" />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  topSection: {
    padding: 16,
  },
  welcomeText: {
    marginBottom: 12,
  },
  signOutButton: {
    borderRadius: 8,
    alignItems: 'center',
  },
});
