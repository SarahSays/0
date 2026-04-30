import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const blurActive = () => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.title}>Welcome to the App</Text>
        <Text style={styles.subtitle}>
          Simplify connecting.
        </Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.description}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Use</Text> and have read our{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={() => {
            blurActive();
            router.push('/enter-email');
          }}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Continue with Email'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => {
              blurActive();
              router.push('/enter-email');
            }}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </ScrollView>
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
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    marginBottom: 32,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
});