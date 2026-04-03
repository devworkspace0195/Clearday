import { useCallback } from 'react';

interface UseButtonViewModelProps {
  onPress: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

interface UseButtonViewModelReturn {
  handlePress: () => void;
}

export const useButtonViewModel = ({
  onPress,
  isLoading,
  isDisabled,
}: UseButtonViewModelProps): UseButtonViewModelReturn => {
  const handlePress = useCallback(() => {
    if (!isLoading && !isDisabled) {
      onPress();
    }
  }, [onPress, isLoading, isDisabled]);

  return { handlePress };
};
