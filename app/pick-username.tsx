import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../utils/auth';

export default function PickUsername() {
  const [username, setUsername] = useState('SarahSays');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

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
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Pick a Username',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backButton}>Back</Text>
            </Pressable>
          ),
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Pick a username</Text>
        <Text style={styles.subtitle}>
          Choose a unique username that represents you
        </Text>

        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Username"
          autoCapitalize="none"
          autoComplete="username"
          value={username}
          onChangeText={handleUsernameChange}
          maxLength={20}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.hint}>
          Your username will be visible to other users and cannot be changed later.
        </Text>

        <Pressable
          style={[
            styles.button,
            (!username.trim() || !!error || isLoading) && styles.buttonDisabled
          ]}
          onPress={handleContinue}
          disabled={!username.trim() || !!error || isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating account...' : 'Continue'}
          </Text>
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
  hint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
    lineHeight: 20,
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
});