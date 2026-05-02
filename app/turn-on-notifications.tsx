import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedButton } from '@/components/themed-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  linkButton: {
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});

export default function TurnOnNotifications() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const blurActive = () => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleContinue = () => {
    blurActive();
    setIsLoading(true);
    router.push('/pick-username');
    setIsLoading(false);
  };

  const handleSkip = () => {
    blurActive();
    router.push('/pick-username');
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Turn on Notifications',
          headerLeft: () => (
            <ThemedText type="link" onPress={() => router.back()}>
              ⬅️ Back
            </ThemedText>
          ),
        }}
      />

      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Turn on notifications
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Enable push notifications to get the latest updates and activity alerts.
        </ThemedText>

        <ThemedButton
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={isLoading}
          lightColor="#000"
          darkColor="#fff"
        >
          {isLoading ? 'Enabling...' : 'Turn on notifications'}
        </ThemedButton>

        <ThemedButton style={styles.linkButton} onPress={handleSkip}>
          <ThemedText type="link" style={styles.linkText}>
            Skip for now
          </ThemedText>
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}