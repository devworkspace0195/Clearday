export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface StoredUser {
  name: string;
  email: string;
  password: string;
}
