import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '../../constants';

export const buttonStyles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 0.3,
  },
  disabled: {
    opacity: 0.5,
  },
});
