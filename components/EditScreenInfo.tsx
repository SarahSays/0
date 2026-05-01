import { StyleSheet } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function EditScreenInfo({ path }: { path: string }) {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';
  const codeBackgroundColor = useThemeColor(
    { light: '#f3f3f3', dark: '#1e1e1e' },
    'background'
  );

  return (
    <ThemedView style={styles.getStartedContainer}>
      <ThemedText style={styles.getStartedText}>{title}</ThemedText>
      <ThemedView
        style={[
          styles.codeHighlightContainer,
          styles.homeScreenFilename,
          { backgroundColor: codeBackgroundColor },
        ]}
      >
        <ThemedText type="defaultSemiBold">{path}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.getStartedText}>{description}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    lineHeight: 24,
    textAlign: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
});
