import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import SignupScreenView from './SignupScreenView';

const meta: Meta<typeof SignupScreenView> = {
  title: 'Screens/SignupScreen',
  component: SignupScreenView,
  decorators: [
    Story => (
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <Story />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignupScreenView>;

export const Default: Story = {};
