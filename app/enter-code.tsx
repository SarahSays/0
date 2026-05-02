import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../utils/auth';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedButton } from '@/components/themed-button';
import { useThemeColor } from '@/hooks/use-theme-color';

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
  linkText: {
    textDecorationLine: 'underline',
  },
});

export default function EnterCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pendingEmail } = useAuth();
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const { user } = useAuth();

  const blurActive = () => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleContinue = () => {
    blurActive();
    setError('');

    if (!code.trim()) {
      setError('Code is required');
      return;
    }

    if (code.trim().length < 6) {
      setError('Enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    router.push('/turn-on-notifications');
    setIsLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Enter Your Code',
          headerLeft: () => (
            <ThemedText type="link" onPress={() => router.back()}>
              ⬅️ Back
            </ThemedText>
          ),
        }}
      />

      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Enter your code
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Check your {user?.email ?? 'email'} for a verification code to continue.
        </ThemedText>

        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            { color: textColor, borderColor: iconColor },
          ]}
          placeholder="6-digit code"
          placeholderTextColor={iconColor}
          keyboardType="numeric"
          autoCapitalize="none"
          value={code}
          onChangeText={(text) => {
            setCode(text);
            if (error) setError('');
          }}
          maxLength={6}
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
          {isLoading ? 'Verifying...' : 'Continue'}
        </ThemedButton>

        <ThemedButton
          style={styles.linkButton}
          onPress={() => router.push('/enter-email')}
        >
          <ThemedText type="link" style={styles.linkText}>
            Resend code
          </ThemedText>
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}