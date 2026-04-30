import { useColorScheme as useRNColorScheme } from 'react-native';

export function useColorScheme() {
  const colorScheme = useRNColorScheme();
  // Fallback to 'light' if null to ensure a value is always returned
  return colorScheme ?? 'light';
}
