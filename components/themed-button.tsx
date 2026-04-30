import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  textColor?: string;
  children: string | React.ReactNode;
  disabled?: boolean;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  textColor,
  children,
  disabled = false,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor || '#000', dark: darkColor || '#fff' },
    'background'
  );
  const tintColor = useThemeColor({ light: '#000', dark: '#fff' }, 'tint');

  const computedStyle: ViewStyle = {
    backgroundColor: disabled ? (tintColor === '#fff' ? '#333' : '#ccc') : backgroundColor,
  };

  return (
    <Pressable
      style={[
        styles.button,
        computedStyle,
        style as ViewStyle,
      ]}
      disabled={disabled}
      {...rest}
    >
      {typeof children === 'string' ? (
        <ThemedText
          style={[
            styles.text,
            {
              color: disabled
                ? tintColor === '#fff'
                  ? '#fff'
                  : '#666'
                : textColor || (backgroundColor === '#000' ? '#fff' : '#000'),
            },
          ]}
        >
          {children}
        </ThemedText>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
