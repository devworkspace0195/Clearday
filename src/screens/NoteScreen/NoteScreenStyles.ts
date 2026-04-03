import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '../../constants';

export const noteScreenStyles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: SPACING.lg },
  header: { paddingTop: SPACING.lg, paddingBottom: SPACING.lg, borderBottomWidth: 1 },
  backButton: { paddingVertical: SPACING.sm, marginBottom: SPACING.sm },
  backText: { fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semibold },
  title: { fontSize: FONT_SIZE.xxl, fontWeight: FONT_WEIGHT.bold, marginBottom: SPACING.md },
});
