import React, { memo } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useButtonViewModel } from './ButtonViewModel';
import { buttonStyles } from './ButtonStyles';
import type { ButtonProps } from './ButtonModel';

const ButtonView: React.FC<ButtonProps> = memo(
  ({ label, onPress, variant = 'primary', isLoading = false, isDisabled = false }) => {
    const { colors } = useTheme();
    const { handlePress } = useButtonViewModel({ onPress, isLoading, isDisabled });

    const containerStyle = [
      buttonStyles.base,
      variant === 'primary' && { backgroundColor: colors.primary },
      variant === 'outline' && {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.primary,
      },
      variant === 'ghost' && { backgroundColor: 'transparent' },
      (isLoading || isDisabled) && buttonStyles.disabled,
    ];

    const textColor = variant === 'primary' ? colors.white : colors.primary;

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={isLoading || isDisabled}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? colors.white : colors.primary}
          />
        ) : (
          <Text style={[buttonStyles.label, { color: textColor }]}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  },
);

ButtonView.displayName = 'ButtonView';

export default ButtonView;
