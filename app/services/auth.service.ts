import api from './api';

// adapt front dto to back dto
export interface SignInDto {
  username: string;
  password: string;
}

export interface SignUpDto {
  display_name: string;
  user_name: string;
  email: string;
  password: string;
}

// backend routes
export const authService = {
  signin: (data: SignInDto) => 
    api.post('/auth/signin', data),
  
  signup: (data: SignUpDto) => 
    api.post('/auth/signup', data),
  
};