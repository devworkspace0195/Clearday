import { useCallback, useState } from 'react';

interface UseInputViewModelReturn {
  isFocused: boolean;
  isPasswordVisible: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  toggleVisibility: () => void;
}

export const useInputViewModel = (): UseInputViewModelReturn => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const toggleVisibility = useCallback(
    () => setIsPasswordVisible(prev => !prev),
    [],
  );

  return { isFocused, isPasswordVisible, handleFocus, handleBlur, toggleVisibility };
};
