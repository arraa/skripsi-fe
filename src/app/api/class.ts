import { api } from './axios';

export const getClass = async () => {
    try {
        const response = await api.get('/class/');
        return response;
    } catch (error: any) {
        console.error('API request error', error);
        return error.response;
    }
};
