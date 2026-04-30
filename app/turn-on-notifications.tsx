import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

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
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Turn on Notifications',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backButton}>Back</Text>
            </Pressable>
          ),
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Turn on notifications</Text>
        <Text style={styles.subtitle}>
          Enable push notifications to get the latest updates and activity alerts.
        </Text>

        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Enabling...' : 'Turn on notifications'}
          </Text>
        </Pressable>

        <Pressable onPress={handleSkip} style={styles.linkButton}>
          <Text style={styles.linkText}>Skip for now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});