import { api } from './axios';

export const login = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        const response = await api.post('/api/v1/auth/login', credentials);

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
