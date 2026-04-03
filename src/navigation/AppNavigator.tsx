import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useRestoreSession } from '../hooks/useRestoreSession';
import LoginScreenView from '../screens/LoginScreen/LoginScreenView';
import SignupScreenView from '../screens/SignupScreen/SignupScreenView';
import HomeScreenView from '../screens/HomeScreen/HomeScreenView';
import ProfileScreenView from '../screens/ProfileScreen/ProfileScreenView';
import { COLORS } from '../constants';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = memo(() => {
  const { colors } = useTheme();
  const { isLoggedIn, isLoading } = useRestoreSession();

  if (isLoading) {
    return (
      <View style={[styles.loader, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade_from_bottom',
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreenView} />
            <Stack.Screen name="Profile" component={ProfileScreenView} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreenView} />
            <Stack.Screen name="Signup" component={SignupScreenView} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

AppNavigator.displayName = 'AppNavigator';

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;
