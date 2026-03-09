import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { Colors, FontSize, FontWeight, BorderRadius, Layout, Spacing } from '../constants/theme';

interface TextInputProps extends RNTextInputProps {
  containerStyle?: ViewStyle;
}

export const TextInput: React.FC<TextInputProps> = ({
  containerStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focused, containerStyle]}>
      <RNTextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.textGray}
        allowFontScaling={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.inputWidth,
    height: Layout.inputHeight,
    backgroundColor: Colors.inputBackground,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    alignSelf: 'center',
  },
  focused: {
    borderWidth: 1,
    borderColor: Colors.textGray,
  },
  input: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.regular,
    color: Colors.textDark,
    fontFamily: 'System',
    padding: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
