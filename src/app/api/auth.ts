import { AxiosResponse } from 'axios';
import { api } from './axios';

export const login = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        const response = await api.post('/auth/login', credentials);
        if (response.status === 200) {
            return response;
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
};

export const resetPassword = async (data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}) => {
    try {
        const response = await api.post('/auth/reset-password', data);
        if (response.status === 200) {
            return response.status;
        } else {
            throw new Error('Reset password failed');
        }
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
}

export const validateAccesToken = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get('/auth/validate-token');

        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const getNewAccessToken = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get('/auth/refresh-token');

        return response;
    } catch (error: any) {
        console.error('error:', error.response);
        return error.response;
    }
};

export const getUserType = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get('/auth/user-type');

        return response.data.user_type
    } catch (error: any) {
        return error.response;
    }
}
