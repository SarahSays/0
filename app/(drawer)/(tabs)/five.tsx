import { Stack } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Five' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/five.tsx" title="Tab Five" />
      </Container>
    </>
  );
}
