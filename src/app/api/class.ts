import { AxiosResponse } from 'axios';

interface ObjectInput {
    // create the input object here
    // name: string;
    // description: string;
}
import { api } from './axios';

export const getClass = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get('/class');
        if (response.status !== 200) {
            throw new Error('Error fetching student data');
        }
        return response;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};

export const createClass = async (
    data: ObjectInput
): Promise<AxiosResponse> => {
    try {
        const response = await api.post('/class', data);
        if (response.status !== 201) {
            throw new Error('Error creating student data');
        }
        return response;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};

export const deleteClass = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.delete(`/class/${id}`);
        if (response.status !== 204) {
            throw new Error('Error deleting student data');
        }
        return response;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};
