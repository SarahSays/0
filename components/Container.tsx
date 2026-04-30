import { StyleSheet, SafeAreaView } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const backgroundColor = useThemeColor({}, 'background');
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
