import { useState } from 'react';
import { TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../utils/auth';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedButton } from '@/components/themed-button';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet } from 'react-native';

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
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginBottom: 16,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default function EnterEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setPendingEmail } = useAuth();
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const blurActive = () => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    blurActive();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setPendingEmail(email.trim());
    setIsLoading(true);
    router.push('/enter-code');
    setIsLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Enter Your Email',
          headerLeft: () => (
            <ThemedText type="link" onPress={() => router.back()}>
              ⬅️ Back
            </ThemedText>
          ),
        }}
      />

      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Enter your email
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          We'll send you a verification code to continue
        </ThemedText>

        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            { color: textColor, borderColor: iconColor },
          ]}
          placeholder="Email address"
          placeholderTextColor={iconColor}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError('');
          }}
        />

        {error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : null}

        <ThemedButton
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={isLoading}
          lightColor="#000"
          darkColor="#fff"
        >
          {isLoading ? 'Sending...' : 'Continue'}
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}