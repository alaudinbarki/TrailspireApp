import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors, FontSize, FontWeight, BorderRadius, Layout } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textLight} />
      ) : (
        <Text allowFontScaling={false} style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Layout.buttonWidth,
    height: Layout.buttonHeight,
    backgroundColor: Colors.buttonDark,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: Colors.buttonText,
    fontSize: FontSize.large,
    fontWeight: FontWeight.semiBold,
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
