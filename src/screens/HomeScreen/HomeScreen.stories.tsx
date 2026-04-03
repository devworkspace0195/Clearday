import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import HomeScreenView from './HomeScreenView';

const meta: Meta<typeof HomeScreenView> = {
  title: 'Screens/HomeScreen',
  component: HomeScreenView,
  decorators: [
    Story => (
      <Provider store={store}>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HomeScreenView>;

export const Default: Story = {};
