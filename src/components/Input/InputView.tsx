import React, { memo } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useInputViewModel } from './InputViewModel';
import { inputStyles } from './InputStyles';
import type { InputProps } from './InputModel';

const InputView: React.FC<InputProps> = memo(
  ({
    label,
    value,
    onChangeText,
    placeholder,
    isSecure = false,
    keyboardType = 'default',
    errorMessage,
    autoCapitalize = 'none',
  }) => {
    const { colors } = useTheme();
    const { isFocused, isPasswordVisible, handleFocus, handleBlur, toggleVisibility } =
      useInputViewModel();

    const borderColor = errorMessage
      ? colors.error
      : isFocused
        ? colors.primary
        : colors.border;

    return (
      <View style={inputStyles.wrapper}>
        <Text style={[inputStyles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
        <View
          style={[
            inputStyles.inputContainer,
            { borderColor, backgroundColor: colors.surface },
          ]}
        >
          <TextInput
            style={[inputStyles.input, { color: colors.textPrimary }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            secureTextEntry={isSecure && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onFocus={handleFocus}
            onBlur={handleBlur}
            accessibilityLabel={label}
          />
          {isSecure && (
            <TouchableOpacity
              onPress={toggleVisibility}
              accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
              style={inputStyles.eyeButton}
            >
              <Text style={[inputStyles.eyeText, { color: colors.textSecondary }]}>
                {isPasswordVisible ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {errorMessage ? (
          <Text style={[inputStyles.error, { color: colors.error }]}>
            {errorMessage}
          </Text>
        ) : null}
      </View>
    );
  },
);

InputView.displayName = 'InputView';

export default InputView;
