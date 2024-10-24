'use server';
import { api } from './axios';
import { getAccessToken } from './token';

export const getClass = async () => {
    try {
        const response = await api.get('api/v1/class/', {
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`,
            },
        });

        return response.data.classes;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};
