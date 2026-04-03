import type { Meta, StoryObj } from '@storybook/react-native';
import { ThemeProvider } from '../../context/ThemeContext';
import ReminderScreenView from './ReminderScreenView';

const meta = {
  title: 'Screens/ReminderScreen',
  component: ReminderScreenView,
  decorators: [Story => <ThemeProvider><Story /></ThemeProvider>],
} satisfies Meta<typeof ReminderScreenView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
