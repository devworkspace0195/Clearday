import type { Meta, StoryObj } from '@storybook/react-native';
import { ThemeProvider } from '../../context/ThemeContext';
import TaskScreenView from './TaskScreenView';

const meta = {
  title: 'Screens/TaskScreen',
  component: TaskScreenView,
  decorators: [Story => <ThemeProvider><Story /></ThemeProvider>],
} satisfies Meta<typeof TaskScreenView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
