import React, { memo } from 'react';
import { Switch } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import type { SwitchProps } from './SwitchModel';

const SwitchView: React.FC<SwitchProps> = memo(
  ({ value, onValueChange, disabled = false }) => {
    const { colors } = useTheme();

    return (
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.white}
        accessibilityRole="switch"
        accessibilityLabel="Theme toggle"
        accessibilityState={{ checked: value, disabled }}
      />
    );
  },
);

SwitchView.displayName = 'SwitchView';

export default SwitchView;
