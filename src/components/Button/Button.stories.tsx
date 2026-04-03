import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import ButtonView from './ButtonView';

const meta: Meta<typeof ButtonView> = {
  title: 'Components/Button',
  component: ButtonView,
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
    label: 'Button',
    onPress: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ButtonView>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Loading: Story = { args: { isLoading: true } };
export const Disabled: Story = { args: { isDisabled: true } };
