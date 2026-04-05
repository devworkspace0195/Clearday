import React, { memo, useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../components/Button/ButtonView';
import Input from '../../components/Input/InputView';
import { useTheme } from '../../context/ThemeContext';
import { useLoginScreenViewModel } from './LoginScreenViewModel';
import { loginScreenStyles } from './LoginScreenStyles';
import { STRINGS } from '../../constants';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenViewProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreenView: React.FC<LoginScreenViewProps> = memo(({ navigation }) => {
  const { colors } = useTheme();
  const { isLoading, error, login, clearError } = useLoginScreenViewModel();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    await login({ email, password });
  }, [email, password, login]);

  const handleGoToSignup = useCallback(() => {
    clearError();
    navigation.navigate('Signup');
  }, [navigation, clearError]);

  return (
    <SafeAreaView
      style={[loginScreenStyles.safeArea, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        style={loginScreenStyles.safeArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={loginScreenStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={loginScreenStyles.logoContainer}>
            <View
              style={[loginScreenStyles.logoCircle, { backgroundColor: colors.primary }]}
            >
              <Text style={loginScreenStyles.logoText}>{STRINGS.APP.LOGO_EMOJI}</Text>
            </View>
            <Text style={[loginScreenStyles.appName, { color: colors.textPrimary }]}>
              {STRINGS.APP.NAME}
            </Text>
            <Text style={[loginScreenStyles.tagline, { color: colors.textSecondary }]}>
              {STRINGS.APP.TAGLINE}
            </Text>
          </View>

          <View style={[loginScreenStyles.card, { backgroundColor: colors.surface }]}>
            <Text style={[loginScreenStyles.cardTitle, { color: colors.textPrimary }]}>
              {STRINGS.LOGIN.TITLE}
            </Text>
            <Text style={[loginScreenStyles.cardSubtitle, { color: colors.textSecondary }]}>
              {STRINGS.LOGIN.SUBTITLE}
            </Text>

            {error ? (
              <View
                style={[
                  loginScreenStyles.errorBanner,
                  { backgroundColor: `${colors.error}18` },
                ]}
              >
                <Text style={[loginScreenStyles.errorText, { color: colors.error }]}>
                  {error}
                </Text>
              </View>
            ) : null}

            <Input
              label={STRINGS.LOGIN.EMAIL_LABEL}
              value={email}
              onChangeText={setEmail}
              placeholder={STRINGS.LOGIN.EMAIL_PLACEHOLDER}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label={STRINGS.LOGIN.PASSWORD_LABEL}
              value={password}
              onChangeText={setPassword}
              placeholder={STRINGS.LOGIN.PASSWORD_PLACEHOLDER}
              isSecure
            />

            <View style={loginScreenStyles.buttonContainer}>
              <Button
                label={STRINGS.LOGIN.BUTTON}
                onPress={handleLogin}
                isLoading={isLoading}
                isDisabled={!email.trim() || !password}
              />
            </View>
          </View>

          <View style={loginScreenStyles.footerRow}>
            <Text style={[loginScreenStyles.footerText, { color: colors.textSecondary }]}>
              {STRINGS.LOGIN.FOOTER_TEXT}
            </Text>
            <TouchableOpacity onPress={handleGoToSignup}>
              <Text style={[loginScreenStyles.footerLink, { color: colors.primary }]}>
                {STRINGS.LOGIN.FOOTER_LINK}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

LoginScreenView.displayName = 'LoginScreenView';

export default LoginScreenView;
