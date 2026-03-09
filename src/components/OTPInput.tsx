import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, BorderRadius, Layout, FontSize, FontWeight } from '../constants/theme';

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  gap?: number;
  containerStyle?: ViewStyle;
  boxStyle?: TextStyle;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  onComplete,
  gap,
  containerStyle,
  boxStyle,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newValues = [...values];
    // Only take the last character if pasting
    newValues[index] = text.slice(-1);
    setValues(newValues);

    // Auto-advance to next input
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all filled
    const code = newValues.join('');
    if (code.length === length && onComplete) {
      onComplete(code);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newValues = [...values];
      newValues[index - 1] = '';
      setValues(newValues);
    }
  };

  return (
    <View style={[styles.container, gap !== undefined ? { gap } : null, containerStyle]}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.box,
              boxStyle,
              values[index] ? styles.boxFilled : null,
            ]}
            value={values[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            allowFontScaling={false}
            textAlign="center"
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignSelf: 'center',
  },
  box: {
    width: Layout.otpBoxSize,
    height: Layout.otpBoxSize,
    backgroundColor: Colors.inputBackground,
    borderRadius: BorderRadius.lg,
    fontSize: FontSize.heading,
    fontWeight: FontWeight.semiBold,
    color: Colors.textDark,
    includeFontPadding: false,
    textAlignVertical: 'center',
    padding: 0,
    textAlign: 'center',
  },
  boxFilled: {
    borderWidth: 1,
    borderColor: Colors.textGray,
  },
});
