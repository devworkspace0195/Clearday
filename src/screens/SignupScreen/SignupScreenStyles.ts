import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '../../constants';

export const signupScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  logoText: {
    fontSize: 32,
  },
  appName: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.xs,
  },
  card: {
    borderRadius: 20,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.lg,
  },
  errorBanner: {
    borderRadius: 10,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  errorText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  buttonContainer: {
    marginTop: SPACING.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZE.sm,
  },
  footerLink: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    marginLeft: 4,
  },
});
