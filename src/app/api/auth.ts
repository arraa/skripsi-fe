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
};

export const validateAccesToken = async () => {
    try {
        const response = await api.get('/auth/validate-token');

        return response;
    } catch (error: any) {
        console.error('Token validation error:', error.response.status);
        return error.response;
    }
};

export const getNewAccessToken = async () => {
    try {
        const response = await api.get('/auth/refresh-token');

        return response;
    } catch (error: any) {
        console.error('Refresh token error:', error.response);
        return error.response;
    }
};


// TODO: refactor like this function
export const getStudent = async () => {
    try {
        const response = await api.get('/student/');
        return response;
    } catch (error: any) {
        console.error('API request error', error);
        return error.response;
    }
};
