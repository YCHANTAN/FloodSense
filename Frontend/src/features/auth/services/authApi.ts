import api from '@/services/api';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export const login = async (credentials: any): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/login', credentials);
  return response.data;
};

export const register = async (userData: any): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/register', userData);
  return response.data;
};
