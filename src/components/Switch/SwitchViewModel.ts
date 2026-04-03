import { useCallback } from 'react';

interface UseSwitchViewModelReturn {
  handleToggle: () => void;
}

export const useSwitchViewModel = (
  value: boolean,
  onValueChange: (value: boolean) => void,
  disabled?: boolean,
): UseSwitchViewModelReturn => {
  const handleToggle = useCallback(() => {
    if (!disabled) {
      onValueChange(!value);
    }
  }, [value, onValueChange, disabled]);

  return { handleToggle };
};
