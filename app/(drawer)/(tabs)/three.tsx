import { Stack } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Three' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/three.tsx" title="Tab Three" />
      </Container>
    </>
  );
}
