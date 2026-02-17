export interface SignUpDto {
  display_name: string;
  user_name: string;
  email: string;
  password: string;
}

export interface SignInDto {
  user_name: string;
  password: string;
}
