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
              <Text style={signupScreenStyles.logoText}>☀️</Text>
            </View>
            <Text style={[signupScreenStyles.appName, { color: colors.textPrimary }]}>
              Clearday
            </Text>
            <Text style={[signupScreenStyles.tagline, { color: colors.textSecondary }]}>
              Your day, your way.
            </Text>
          </View>

          <View style={[signupScreenStyles.card, { backgroundColor: colors.surface }]}>
            <Text style={[signupScreenStyles.cardTitle, { color: colors.textPrimary }]}>
              Create account
            </Text>
            <Text style={[signupScreenStyles.cardSubtitle, { color: colors.textSecondary }]}>
              Get started for free
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
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Jane Doe"
              autoCapitalize="words"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Min. 6 characters"
              isSecure
            />
            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter password"
              isSecure
            />

            <View style={signupScreenStyles.buttonContainer}>
              <Button
                label="Create Account"
                onPress={handleSignup}
                isLoading={isLoading}
                isDisabled={!isFormValid}
              />
            </View>
          </View>

          <View style={signupScreenStyles.footerRow}>
            <Text style={[signupScreenStyles.footerText, { color: colors.textSecondary }]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={handleGoToLogin}>
              <Text style={[signupScreenStyles.footerLink, { color: colors.primary }]}>
                Sign in
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
