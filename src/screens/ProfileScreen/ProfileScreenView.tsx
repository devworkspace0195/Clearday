import React, { memo, useCallback } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/Button/ButtonView';
import SwitchView from '../../components/Switch/SwitchView';
import { useProfileScreenViewModel } from './ProfileScreenViewModel';
import { profileScreenStyles } from './ProfileScreenStyles';
import { STRINGS } from '../../constants';

const ProfileScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const { user, isDarkMode, isLoading, toggleTheme, logout, goBack } =
    useProfileScreenViewModel();

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView
      style={[profileScreenStyles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={profileScreenStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[profileScreenStyles.header, { borderBottomColor: colors.border }]}
        >
          <TouchableOpacity
            onPress={handleBackPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={STRINGS.PROFILE.A11Y_GO_BACK}
            style={profileScreenStyles.backButton}
          >
            <Text style={[profileScreenStyles.backArrow, { color: colors.textPrimary }]}>
              {STRINGS.PROFILE.BACK}
            </Text>
          </TouchableOpacity>
          <View style={profileScreenStyles.headerContent}>
            <Text style={[profileScreenStyles.headerTitle, { color: colors.textPrimary }]}>
              {STRINGS.PROFILE.TITLE}
            </Text>
            <View style={profileScreenStyles.userInfo}>
              <Text
                style={[profileScreenStyles.userName, { color: colors.textPrimary }]}
              >
                {user?.name ?? STRINGS.PROFILE.USER_NAME_FALLBACK}
              </Text>
              <Text
                style={[profileScreenStyles.userEmail, { color: colors.textSecondary }]}
              >
                {user?.email ?? STRINGS.PROFILE.USER_EMAIL_FALLBACK}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            profileScreenStyles.sectionContainer,
            { borderBottomColor: colors.border },
          ]}
        >
          <Text
            style={[profileScreenStyles.sectionTitle, { color: colors.textPrimary }]}
          >
            {STRINGS.PROFILE.SECTION_SETTINGS}
          </Text>
          <View style={profileScreenStyles.settingRow}>
            <Text
              style={[profileScreenStyles.settingLabel, { color: colors.textPrimary }]}
            >
              {isDarkMode ? STRINGS.PROFILE.THEME_DARK : STRINGS.PROFILE.THEME_LIGHT}
            </Text>
            <SwitchView
              value={isDarkMode}
              onValueChange={handleToggleTheme}
            />
          </View>
        </View>

        <View style={profileScreenStyles.signOutButton}>
          <Button
            label={STRINGS.PROFILE.SIGN_OUT}
            onPress={handleLogout}
            variant="outline"
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

ProfileScreenView.displayName = 'ProfileScreenView';

export default ProfileScreenView;
