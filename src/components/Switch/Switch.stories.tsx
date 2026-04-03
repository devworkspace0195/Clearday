import type { Meta, StoryObj } from '@storybook/react-native';
import { ThemeProvider } from '../../context/ThemeContext';
import SwitchView from './SwitchView';

const meta = {
  title: 'Components/Switch',
  component: SwitchView,
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    value: false,
    onValueChange: () => {},
    disabled: false,
  },
} satisfies Meta<typeof SwitchView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: {
    value: false,
  },
};

export const On: Story = {
  args: {
    value: true,
  },
};

export const Disabled: Story = {
  args: {
    value: false,
    disabled: true,
  },
};
