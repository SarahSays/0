import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedButton } from '@/components/themed-button';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  const blurActive = () => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Stack.Screen options={{ headerShown: false }} />

          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Welcome to the App
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Simplify connecting.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.main}>
            <ThemedText style={styles.description}>
              By continuing, you agree to our{' '}
              <ThemedText type="link" style={styles.link}>
                Terms of Use
              </ThemedText>{' '}
              and have read our{' '}
              <ThemedText type="link" style={styles.link}>
                Privacy Policy
              </ThemedText>
              .
            </ThemedText>

            <ThemedButton
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={() => {
                blurActive();
                router.push('/enter-email');
              }}
              disabled={isLoading}
              lightColor="#000"
              darkColor="#fff"
            >
              {isLoading ? 'Loading...' : 'Continue with Email'}
            </ThemedButton>
          </ThemedView>

          <ThemedView style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Already have an account?{' '}
              <ThemedText
                type="link"
                style={styles.link}
                onPress={() => {
                  blurActive();
                  router.push('/enter-email');
                }}
              >
                Sign in
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </ScrollView>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemedView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  link: {
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  footerText: {
    textAlign: 'center',
  },
});