import { api } from './axios';

export const getClass = async () => {
    try {
        const response = await api.get('/class/');
        return response;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};
