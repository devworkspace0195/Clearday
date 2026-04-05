import React, { memo, useCallback, useMemo, useState } from 'react';
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
import { useSignupScreenViewModel } from './SignupScreenViewModel';
import { signupScreenStyles } from './SignupScreenStyles';
import { STRINGS } from '../../constants';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

interface SignupScreenViewProps {
  navigation: SignupScreenNavigationProp;
}

const SignupScreenView: React.FC<SignupScreenViewProps> = memo(({ navigation }) => {
  const { colors } = useTheme();
  const { isLoading, error, signup, clearError } = useSignupScreenViewModel();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid = useMemo(
    () =>
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0,
    [name, email, password, confirmPassword],
  );

  const handleSignup = useCallback(async () => {
    await signup({ name, email, password, confirmPassword });
  }, [name, email, password, confirmPassword, signup]);

  const handleGoToLogin = useCallback(() => {
    clearError();
    navigation.navigate('Login');
  }, [navigation, clearError]);

  return (
    <SafeAreaView
      style={[signupScreenStyles.safeArea, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        style={signupScreenStyles.safeArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={signupScreenStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={signupScreenStyles.logoContainer}>
            <View
              style={[signupScreenStyles.logoCircle, { backgroundColor: colors.primary }]}
            >
              <Text style={signupScreenStyles.logoText}>{STRINGS.APP.LOGO_EMOJI}</Text>
            </View>
            <Text style={[signupScreenStyles.appName, { color: colors.textPrimary }]}>
              {STRINGS.APP.NAME}
            </Text>
            <Text style={[signupScreenStyles.tagline, { color: colors.textSecondary }]}>
              {STRINGS.APP.TAGLINE}
            </Text>
          </View>

          <View style={[signupScreenStyles.card, { backgroundColor: colors.surface }]}>
            <Text style={[signupScreenStyles.cardTitle, { color: colors.textPrimary }]}>
              {STRINGS.SIGNUP.TITLE}
            </Text>
            <Text style={[signupScreenStyles.cardSubtitle, { color: colors.textSecondary }]}>
              {STRINGS.SIGNUP.SUBTITLE}
            </Text>

            {error ? (
              <View
                style={[
                  signupScreenStyles.errorBanner,
                  { backgroundColor: `${colors.error}18` },
                ]}
              >
                <Text style={[signupScreenStyles.errorText, { color: colors.error }]}>
                  {error}
                </Text>
              </View>
            ) : null}

            <Input
              label={STRINGS.SIGNUP.NAME_LABEL}
              value={name}
              onChangeText={setName}
              placeholder={STRINGS.SIGNUP.NAME_PLACEHOLDER}
              autoCapitalize="words"
            />
            <Input
              label={STRINGS.SIGNUP.EMAIL_LABEL}
              value={email}
              onChangeText={setEmail}
              placeholder={STRINGS.SIGNUP.EMAIL_PLACEHOLDER}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label={STRINGS.SIGNUP.PASSWORD_LABEL}
              value={password}
              onChangeText={setPassword}
              placeholder={STRINGS.SIGNUP.PASSWORD_PLACEHOLDER}
              isSecure
            />
            <Input
              label={STRINGS.SIGNUP.CONFIRM_PASSWORD_LABEL}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder={STRINGS.SIGNUP.CONFIRM_PASSWORD_PLACEHOLDER}
              isSecure
            />

            <View style={signupScreenStyles.buttonContainer}>
              <Button
                label={STRINGS.SIGNUP.BUTTON}
                onPress={handleSignup}
                isLoading={isLoading}
                isDisabled={!isFormValid}
              />
            </View>
          </View>

          <View style={signupScreenStyles.footerRow}>
            <Text style={[signupScreenStyles.footerText, { color: colors.textSecondary }]}>
              {STRINGS.SIGNUP.FOOTER_TEXT}
            </Text>
            <TouchableOpacity onPress={handleGoToLogin}>
              <Text style={[signupScreenStyles.footerLink, { color: colors.primary }]}>
                {STRINGS.SIGNUP.FOOTER_LINK}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

SignupScreenView.displayName = 'SignupScreenView';

export default SignupScreenView;
