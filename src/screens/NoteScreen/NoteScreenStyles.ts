import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '../../constants';

export const noteScreenStyles = StyleSheet.create({
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

  // ── Note list ────────────────────────────────────────────────────────────────
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  noteCard: {
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  noteCardContent: {
    flex: 1,
  },
  noteCardTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    marginBottom: 3,
  },
  noteCardBody: {
    fontSize: FONT_SIZE.sm,
    lineHeight: FONT_SIZE.sm * 1.5,
  },
  noteCardDate: {
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
  },
  noteDeleteButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteDeleteIcon: {
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
    fontWeight: FONT_WEIGHT.semibold,
    borderRadius: 10,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  composeBodyInput: {
    fontSize: FONT_SIZE.md,
    borderRadius: 10,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  composeActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
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
