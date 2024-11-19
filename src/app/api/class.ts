import { AxiosResponse } from 'axios';
import { api } from './axios';

export const getClass = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get('/class/');
        if (response.status !== 200) {
            throw new Error('Error fetching student data');
        }
        return response;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};
