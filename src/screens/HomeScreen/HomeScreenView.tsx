import React, { memo, useCallback } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useHomeScreenViewModel } from './HomeScreenViewModel';
import { homeScreenStyles } from './HomeScreenStyles';
import { STRINGS } from '../../constants';
import type { WeatherState, WeatherSuggestion } from './HomeScreenModel';

// ─── Weather widget ───────────────────────────────────────────────────────────
interface WeatherWidgetProps {
  weather: WeatherState;
  cardBackground: string;
  primaryColor: string;
  textPrimary: string;
  textSecondary: string;
  surfaceColor: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = memo(
  ({ weather, cardBackground, primaryColor, textPrimary, textSecondary, surfaceColor }) => {
    if (weather.status === 'idle') {
      return null;
    }

    if (weather.status === 'loading') {
      return (
        <View style={[homeScreenStyles.weatherLoading, { backgroundColor: surfaceColor }]}>
          <ActivityIndicator size="small" color={primaryColor} />
          <Text style={[homeScreenStyles.weatherLoadingText, { color: textSecondary }]}>
            {STRINGS.WEATHER.LOADING}
          </Text>
        </View>
      );
    }

    if (weather.status === 'error') {
      return (
        <View style={[homeScreenStyles.weatherError, { backgroundColor: surfaceColor }]}>
          <Text>🌡️</Text>
          <Text style={[homeScreenStyles.weatherErrorText, { color: textSecondary }]}>
            {weather.message}
          </Text>
        </View>
      );
    }

    const { data } = weather;

    return (
      <View style={[homeScreenStyles.weatherCard, { backgroundColor: cardBackground }]}>
        <View style={homeScreenStyles.weatherTop}>
          <View style={homeScreenStyles.weatherLeft}>
            <Text style={[homeScreenStyles.weatherTemp, { color: textPrimary }]}>
              {data.temperature}°C
            </Text>
            <Text style={[homeScreenStyles.weatherFeels, { color: textSecondary }]}>
              {STRINGS.WEATHER.FEELS_LIKE(data.feelsLike)}
            </Text>
            <Text style={[homeScreenStyles.weatherCity, { color: textPrimary }]}>
              {data.city}
            </Text>
            <Text style={[homeScreenStyles.weatherDescription, { color: textSecondary }]}>
              {data.description}
            </Text>
          </View>
          <Text style={homeScreenStyles.weatherEmoji}>{data.emoji}</Text>
        </View>
        <View style={homeScreenStyles.weatherDetails}>
          <Text style={[homeScreenStyles.weatherDetailText, { color: textSecondary }]}>
            {STRINGS.WEATHER.HUMIDITY(data.humidity)}
          </Text>
          <Text style={[homeScreenStyles.weatherDetailText, { color: textSecondary }]}>
            {STRINGS.WEATHER.WIND(data.windSpeed)}
          </Text>
        </View>
      </View>
    );
  },
);

WeatherWidget.displayName = 'WeatherWidget';

// ─── Weather suggestion card ──────────────────────────────────────────────────
interface WeatherSuggestionCardProps {
  suggestion: WeatherSuggestion;
  onReschedule: () => void;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  primaryColor: string;
}

const WeatherSuggestionCard: React.FC<WeatherSuggestionCardProps> = memo(
  ({ suggestion, onReschedule, cardBackground, textPrimary, textSecondary, primaryColor }) => {
    // Rain/storm/snow → amber tint; clear/cloudy → subtle green tint
    const tintColor = suggestion.isRain ? '#F59E0B' : '#10B981';
    const badgeLabel = suggestion.isRain
      ? STRINGS.HOME.WEATHER_ALERT_RESCHEDULE
      : '✓ Good to go';

    return (
      <View
        style={[
          homeScreenStyles.weatherSuggestionCard,
          { backgroundColor: cardBackground, borderLeftColor: tintColor },
        ]}
      >
        <Text style={homeScreenStyles.weatherSuggestionEmoji}>{suggestion.weatherEmoji}</Text>
        <View style={homeScreenStyles.weatherSuggestionContent}>
          <Text style={[homeScreenStyles.weatherSuggestionTitle, { color: textPrimary }]} numberOfLines={1}>
            {suggestion.taskTitle}
          </Text>
          <Text style={[homeScreenStyles.weatherSuggestionBody, { color: textSecondary }]}>
            {STRINGS.HOME.weatherAlertBody(suggestion.weatherDescription, suggestion.taskTimeLabel)}
          </Text>
        </View>
        <TouchableOpacity
          style={[homeScreenStyles.weatherSuggestionButton, { backgroundColor: tintColor + '22' }]}
          onPress={suggestion.isRain ? onReschedule : undefined}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.HOME.a11yDismissAlert(suggestion.taskTitle)}
        >
          <Text style={[homeScreenStyles.weatherSuggestionButtonText, { color: tintColor }]}>
            {badgeLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

WeatherSuggestionCard.displayName = 'WeatherSuggestionCard';

// ─── Main screen ──────────────────────────────────────────────────────────────
const HomeScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const {
    user,
    greeting,
    avatarInitial,
    stats,
    upcomingTasks,
    todayReminders,
    weather,
    weatherSuggestions,
    navigateToProfile,
    navigateToSection,
  } = useHomeScreenViewModel();

  const handleReschedule = useCallback(() => navigateToSection('Tasks'), [navigateToSection]);

  const handleProfilePress = useCallback(() => {
    navigateToProfile();
  }, [navigateToProfile]);

  return (
    <SafeAreaView
      style={[homeScreenStyles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={homeScreenStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={homeScreenStyles.header}>
          <View>
            <Text style={[homeScreenStyles.greeting, { color: colors.textSecondary }]}>
              {greeting} 👋
            </Text>
            <Text style={[homeScreenStyles.userName, { color: colors.textPrimary }]}>
              {user?.name ?? STRINGS.HOME.USER_FALLBACK}
            </Text>
          </View>
          <TouchableOpacity
            style={[homeScreenStyles.avatarButton, { backgroundColor: colors.primary }]}
            onPress={handleProfilePress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={STRINGS.HOME.A11Y_OPEN_PROFILE}
          >
            <Text style={[homeScreenStyles.avatarInitial, { color: colors.white }]}>
              {avatarInitial}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Weather ── */}
        <WeatherWidget
          weather={weather}
          cardBackground={colors.surface}
          primaryColor={colors.primary}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          surfaceColor={colors.surface}
        />

        {/* ── Weather suggestions ── */}
        {weatherSuggestions.length > 0 ? (
          <View style={homeScreenStyles.weatherSuggestionsSection}>
            <Text style={[homeScreenStyles.sectionTitle, { color: colors.textPrimary }]}>
              {STRINGS.HOME.SECTION_WEATHER_ALERTS}
            </Text>
            {weatherSuggestions.map(suggestion => (
              <WeatherSuggestionCard
                key={suggestion.taskId}
                suggestion={suggestion}
                onReschedule={handleReschedule}
                cardBackground={colors.surface}
                textPrimary={colors.textPrimary}
                textSecondary={colors.textSecondary}
                primaryColor={colors.primary}
              />
            ))}
          </View>
        ) : null}

        {/* ── Stats ── */}
        <View style={homeScreenStyles.statsRow}>
          {stats.map(stat => (
            <TouchableOpacity
              key={stat.label}
              style={[homeScreenStyles.statCard, { backgroundColor: colors.surface }]}
              onPress={() => navigateToSection(stat.label as 'Tasks' | 'Notes' | 'Reminders')}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel={STRINGS.HOME.a11yOpenSection(stat.label)}
            >
              <Text style={homeScreenStyles.statEmoji}>{stat.emoji}</Text>
              <Text style={[homeScreenStyles.statValue, { color: colors.textPrimary }]}>
                {stat.value}
              </Text>
              <Text style={[homeScreenStyles.statLabel, { color: colors.textSecondary }]}>
                {stat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Upcoming tasks ── */}
        {upcomingTasks.length > 0 ? (
          <View style={homeScreenStyles.dueTomorrowSection}>
            <Text style={[homeScreenStyles.sectionTitle, { color: colors.textPrimary }]}>
              {STRINGS.HOME.SECTION_UPCOMING}
            </Text>
            {upcomingTasks.map(task => (
              <View
                key={task.id}
                style={[homeScreenStyles.dueTomorrowItem, { backgroundColor: colors.surface }]}
              >
                <Text style={homeScreenStyles.dueTomorrowItemEmoji}>
                  {STRINGS.TASK.ICON_DATE}
                </Text>
                <Text
                  style={[homeScreenStyles.dueTomorrowItemText, { color: colors.textPrimary }]}
                  numberOfLines={1}
                >
                  {task.title}
                </Text>
                <View
                  style={[
                    homeScreenStyles.dueDateBadge,
                    { backgroundColor: colors.primary + '20' },
                  ]}
                >
                  <Text
                    style={[homeScreenStyles.dueDateBadgeText, { color: colors.primary }]}
                  >
                    {task.dateLabel}{task.timeLabel ? ` · ${task.timeLabel}` : ''}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* ── Today's reminders ── */}
        {todayReminders.length > 0 ? (
          <View style={homeScreenStyles.dueTomorrowSection}>
            <Text style={[homeScreenStyles.sectionTitle, { color: colors.textPrimary }]}>
              {STRINGS.HOME.SECTION_REMINDERS_TODAY}
            </Text>
            {todayReminders.map(reminder => (
              <View
                key={reminder.id}
                style={[homeScreenStyles.todayReminderItem, { backgroundColor: colors.surface }]}
              >
                <Text style={homeScreenStyles.todayReminderEmoji}>
                  {reminder.completed ? '✅' : '🔔'}
                </Text>
                <View style={homeScreenStyles.todayReminderContent}>
                  <Text
                    style={[
                      homeScreenStyles.todayReminderTitle,
                      { color: colors.textPrimary },
                      reminder.completed && homeScreenStyles.todayReminderDone,
                    ]}
                    numberOfLines={1}
                  >
                    {reminder.title}
                  </Text>
                  <Text style={[homeScreenStyles.todayReminderTime, { color: colors.textSecondary }]}>
                    🕐 {reminder.timeLabel}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* ── All clear card (nothing due today/tomorrow, no reminders today) ── */}
        {upcomingTasks.length === 0 && todayReminders.length === 0 ? (
          <>
            <Text style={[homeScreenStyles.sectionTitle, { color: colors.textPrimary }]}>
              {STRINGS.HOME.SECTION_OVERVIEW}
            </Text>
            <View style={[homeScreenStyles.welcomeCard, { backgroundColor: colors.primary }]}>
              <Text style={[homeScreenStyles.welcomeTitle, { color: colors.white }]}>
                {STRINGS.HOME.WELCOME_TITLE}
              </Text>
              <Text style={[homeScreenStyles.welcomeSubtitle, { color: `${colors.white}CC` }]}>
                {STRINGS.HOME.WELCOME_SUBTITLE}
              </Text>
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
});

HomeScreenView.displayName = 'HomeScreenView';

export default HomeScreenView;
