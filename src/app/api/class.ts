'use server';
import { api } from './axios';

export const getClass = async () => {
  try {
    const response = await api.get('api/v1/class/');

    console.log('data class', response.data.classes);

    return response.data.classes;
  } catch (error) {
    console.error('API request error', error);
    throw error;
  }
};
