import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import InputView from './InputView';

const meta: Meta<typeof InputView> = {
  title: 'Components/Input',
  component: InputView,
  decorators: [
    Story => (
      <Provider store={store}>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </Provider>
    ),
  ],
  args: {
    label: 'Label',
    value: '',
    onChangeText: () => {},
    placeholder: 'Placeholder...',
  },
};

export default meta;
type Story = StoryObj<typeof InputView>;

export const Default: Story = {};
export const WithError: Story = { args: { errorMessage: 'This field is required' } };
export const Password: Story = { args: { label: 'Password', isSecure: true } };
