export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
  isDisabled?: boolean;
}
