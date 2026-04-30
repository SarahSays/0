import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../utils/auth';

export default function EnterCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pendingEmail } = useAuth();

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
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Enter your code',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backButton}>Back</Text>
            </Pressable>
          ),
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Enter your code</Text>
        <Text style={styles.subtitle}>
          Check your email for a verification code to continue.
        </Text>

        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="6-digit code"
          keyboardType="numeric"
          autoCapitalize="none"
          value={code}
          onChangeText={(text) => {
            setCode(text);
            if (error) setError('');
          }}
          maxLength={6}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Verifying...' : 'Continue'}</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/enter-email')} style={styles.linkButton}>
          <Text style={styles.linkText}>Resend code</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
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