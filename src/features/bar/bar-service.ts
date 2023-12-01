import { ApiResponse } from './types';

// const API_URL = import.meta.env.VITE_API_BARS_URL as string;
const API_URL = 'https://api.brest.bar/items/bars';
const LOCAL_JSON = '../../assets/bars.json';

export const fetchBars = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch bars from online API. Status: ${response.status}`);
    }
    const data = (await response.json()) as ApiResponse;
    return data.data;
  } catch (onlineError) {
    console.error('Error fetching bars online. Trying locally...', onlineError);
    try {
      // Dynamically import DATA only if the online fetch fails
      const { data: localData } = (await import(/* @vite-ignore */ LOCAL_JSON)) as ApiResponse;
      return localData;
    } catch (localError) {
      console.error('Error fetching bars locally:', localError);
      throw new Error('Failed to fetch bars both online and locally.');
    }
  }
};
