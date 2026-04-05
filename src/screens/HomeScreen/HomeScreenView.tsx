import React, { memo, useCallback } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useHomeScreenViewModel } from './HomeScreenViewModel';
import { homeScreenStyles } from './HomeScreenStyles';
import { STRINGS } from '../../constants';

const HomeScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const {
    user,
    greeting,
    avatarInitial,
    stats,
    upcomingTasks,
    navigateToProfile,
    navigateToSection,
  } = useHomeScreenViewModel();

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
                    {task.dateLabel}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {upcomingTasks.length === 0 ? (
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
