import type { Meta, StoryObj } from '@storybook/react-native';
import { ThemeProvider } from '../../context/ThemeContext';
import ProfileScreenView from './ProfileScreenView';

const meta = {
  title: 'Screens/ProfileScreen',
  component: ProfileScreenView,
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProfileScreenView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
