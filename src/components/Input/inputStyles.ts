import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '../../constants';

export const inputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    paddingVertical: 0,
  },
  eyeButton: {
    paddingLeft: SPACING.sm,
  },
  eyeText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  error: {
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
  },
});
