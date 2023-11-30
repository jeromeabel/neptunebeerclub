import { ApiResponse } from './types';

const API_URL = import.meta.env.VITE_API_BARS_URL as string;

export const fetchBars = async () => {
  try {
    const response = await fetch(API_URL);
    const data = (await response.json()) as ApiResponse;
    return data.data;
  } catch (error) {
    console.error('Error fetching bars:', error);
    throw error;
  }
};
