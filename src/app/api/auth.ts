import { api } from './axios';

export const login = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        const response = await api.post('/auth/login', credentials);
        if (response.status === 200) {
            return response.status;
        } else if (response.status === 401) {
            throw new Error('Invalid credentials');
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const forgetPassword = async (email: string) => {
    try {
        const response = await api.post('/auth/forget-password', { email });
        if (response.status === 200) {
            return response.status;
        } else {
            throw new Error('Forget password failed');
        }
    } catch (error) {
        console.error('Forget password error:', error);
        throw error;
    }
}
