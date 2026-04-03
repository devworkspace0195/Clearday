import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '../../constants';
import { TASK_ITEM_HEIGHT } from './TaskScreenModel';

export const taskScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  // ─── Header ───────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
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
  },
  headerTextGroup: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  subtitle: {
    fontSize: FONT_SIZE.xs,
    marginTop: 1,
  },

  // ─── Search ───────────────────────────────────────────────
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    height: 44,
  },
  searchIcon: {
    fontSize: FONT_SIZE.md,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    paddingVertical: 0,
  },
  searchClear: {
    fontSize: FONT_SIZE.md,
    paddingLeft: SPACING.sm,
  },

  // ─── Filter tabs ──────────────────────────────────────────
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    borderRadius: 12,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterTabText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  filterTabActive: {
    // background set inline
  },
  filterTabTextActive: {
    fontWeight: FONT_WEIGHT.bold,
  },

  // ─── Add task card ────────────────────────────────────────
  addCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    borderRadius: 16,
    padding: SPACING.md,
  },
  addInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  addInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    paddingVertical: 0,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonEmoji: {
    fontSize: 18,
  },
  imagePreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  imagePreview: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  removeImageButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  // ─── Date chip ────────────────────────────────────────────
  dateChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  dateChipText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  dateChipRemove: {
    fontSize: 10,
    fontWeight: FONT_WEIGHT.bold,
  },

  // ─── Due date label in task item ──────────────────────────
  taskDueDate: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },

  // ─── Add button ───────────────────────────────────────────
  addButton: {
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },

  // ─── Task list ────────────────────────────────────────────
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  // ─── Task item ────────────────────────────────────────────
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TASK_ITEM_HEIGHT,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  taskItemDivider: {
    height: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkmark: {
    fontSize: 13,
    fontWeight: FONT_WEIGHT.bold,
  },
  taskTextGroup: {
    flex: 1,
  },
  taskTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.45,
  },
  taskThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginTop: 4,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  deleteIcon: {
    fontSize: FONT_SIZE.sm,
  },

  // ─── Empty state ──────────────────────────────────────────
  emptyContainer: {
    alignItems: 'center',
    paddingTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
  },
});
