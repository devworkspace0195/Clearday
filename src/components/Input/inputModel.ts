export interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isSecure?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  errorMessage?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}
