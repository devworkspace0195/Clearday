import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '../../constants';

export const reminderScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  headerTextGroup: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    marginTop: 1,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.regular,
    textAlign: 'center',
  },

  // ── Search ───────────────────────────────────────────────────────────────────
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    gap: SPACING.xs,
  },
  searchIcon: {
    fontSize: FONT_SIZE.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    paddingVertical: SPACING.xs,
  },
  searchClear: {
    fontSize: FONT_SIZE.sm,
    paddingHorizontal: SPACING.xs,
  },

  // ── Reminder list ─────────────────────────────────────────────────────────
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  reminderCard: {
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
    color: '#fff',
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  reminderTitleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  reminderDateTime: {
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
  reminderBell: {
    fontSize: 16,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: FONT_SIZE.sm,
  },

  // ── Empty state ───────────────────────────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.xxl * 2,
    paddingHorizontal: SPACING.xl,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
    lineHeight: FONT_SIZE.sm * 1.6,
  },

  // ── Compose sheet ────────────────────────────────────────────────────────────
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  overlayBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  composeCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    elevation: 16,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  composeHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  composeHeading: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.md,
  },
  composeTitleInput: {
    fontSize: FONT_SIZE.md,
    borderRadius: 10,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  pickerButton: {
    flex: 1,
    borderRadius: 10,
    padding: SPACING.sm,
    alignItems: 'center',
    gap: 4,
  },
  pickerLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  pickerValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
  dateTimePicker: {
    marginBottom: SPACING.sm,
  },
  composeActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  composeCancelButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  composeCancelText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  composeSaveButton: {
    flex: 2,
    paddingVertical: SPACING.sm,
    borderRadius: 12,
    alignItems: 'center',
  },
  composeSaveText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: '#FFFFFF',
  },
});
