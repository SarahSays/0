import { useState } from 'react';
import { TextInput, StyleSheet, Alert } from 'react-native';
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
  hint: {
    fontSize: 14,
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default function PickUsername() {
  const [username, setUsername] = useState('SarahSays');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const blurActive = () => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (username.length > 20) {
      return 'Username must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return null;
  };

  const handleContinue = () => {
    blurActive();
    const validationError = validateUsername(username.trim());
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    signIn(username.trim());
    router.replace('/');
    setIsLoading(false);
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (error) setError('');
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Pick a Username',
          headerLeft: () => (
            <ThemedText type="link" onPress={() => router.back()}>
              ⬅️ Back
            </ThemedText>
          ),
        }}
      />

      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Pick a username
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Choose a unique username that represents you
        </ThemedText>

        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            { color: textColor, borderColor: iconColor },
          ]}
          placeholder="Username"
          placeholderTextColor={iconColor}
          autoCapitalize="none"
          autoComplete="username"
          value={username}
          onChangeText={handleUsernameChange}
          maxLength={20}
        />

        {error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : null}

        <ThemedText style={styles.hint}>
          Your username will be visible to other users and cannot be changed later.
        </ThemedText>

        <ThemedButton
          style={[
            styles.button,
            (!username.trim() || !!error || isLoading) && styles.buttonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!username.trim() || !!error || isLoading}
          lightColor="#000"
          darkColor="#fff"
        >
          {isLoading ? 'Creating account...' : 'Continue'}
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}