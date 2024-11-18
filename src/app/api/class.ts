'use server';
import { classDataProps } from '@/components/classGenerator/types/types';
import { api } from './axios';

export const getClass = async () => {
  try {
    const response = await api.get('/class/');

    return response.data.ClassName;
  } catch (error) {
    console.error('API request error', error);
    throw error;
  }
};

export const createClass = async (data: classDataProps) => {
  try {
    const response = await api.post('/class/create', data);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteClass = async (id: string | null) => {
  try {
      if (id) {
      const response = await api.delete(`/class/delete/${id}`);

      return response.data;
    }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};
