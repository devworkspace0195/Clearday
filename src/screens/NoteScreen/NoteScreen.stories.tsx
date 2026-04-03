import type { Meta, StoryObj } from '@storybook/react-native';
import { ThemeProvider } from '../../context/ThemeContext';
import NoteScreenView from './NoteScreenView';

const meta = {
  title: 'Screens/NoteScreen',
  component: NoteScreenView,
  decorators: [Story => <ThemeProvider><Story /></ThemeProvider>],
} satisfies Meta<typeof NoteScreenView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
