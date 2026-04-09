import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT, SPACING } from '../../constants';

export const homeScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  greeting: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  userName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    marginTop: 2,
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginVertical: SPACING.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: SPACING.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.md,
  },
  welcomeCard: {
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  welcomeTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
  },
  logoutButton: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },

  // ─── Due Tomorrow section ─────────────────────────────────
  dueTomorrowSection: {
    marginBottom: SPACING.md,
  },
  dueTomorrowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  dueTomorrowItemEmoji: {
    fontSize: 16,
  },
  dueTomorrowItemText: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  dueDateBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  dueDateBadgeText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
  },

  // ─── Today's reminders section ───────────────────────────
  todayReminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  todayReminderEmoji: {
    fontSize: 16,
  },
  todayReminderContent: {
    flex: 1,
  },
  todayReminderTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  todayReminderTime: {
    fontSize: FONT_SIZE.xs,
    marginTop: 1,
  },
  todayReminderDone: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  // ─── Weather suggestion cards ─────────────────────────────
  weatherSuggestionsSection: {
    marginBottom: SPACING.md,
  },
  weatherSuggestionCard: {
    borderRadius: 14,
    borderLeftWidth: 3,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  weatherSuggestionEmoji: {
    fontSize: 22,
  },
  weatherSuggestionContent: {
    flex: 1,
  },
  weatherSuggestionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
  },
  weatherSuggestionBody: {
    fontSize: FONT_SIZE.xs,
    marginTop: 1,
  },
  weatherSuggestionButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 5,
    borderRadius: 8,
  },
  weatherSuggestionButtonText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },

  // ─── Weather card ─────────────────────────────────────────
  weatherCard: {
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  weatherTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherLeft: {
    flex: 1,
  },
  weatherEmoji: {
    fontSize: 52,
  },
  weatherTemp: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: FONT_SIZE.xxxl * 1.1,
  },
  weatherFeels: {
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
  weatherCity: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    marginTop: SPACING.xs,
  },
  weatherDescription: {
    fontSize: FONT_SIZE.sm,
    textTransform: 'capitalize',
    marginTop: 1,
  },
  weatherDetails: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
    gap: SPACING.md,
  },
  weatherDetailText: {
    fontSize: FONT_SIZE.sm,
  },
  weatherLoading: {
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  weatherLoadingText: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.xs,
  },
  weatherError: {
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  weatherErrorText: {
    fontSize: FONT_SIZE.sm,
  },
});
