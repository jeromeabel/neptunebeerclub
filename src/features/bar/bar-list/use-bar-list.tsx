import { useEffect, useState } from 'react';
// import barData from '@assets/bars.json';
import { Bar } from '../types';

export interface ApiResponse {
  data: Bar[];
}

export const useBarList = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch('https://api.brest.bar/items/bars');
        if (!response.ok) throw new Error(response.statusText);
        const json = (await response.json()) as ApiResponse; // Error Unsafe assignment of an `any` value
        const dataArray = Array.isArray(json.data) ? json.data : [json.data];
        setBars(dataArray);
        setIsPending(false);
        setError('');
      } catch (err) {
        setError('Erreur de récupération des données');
        setIsPending(false);
      }
    };
    void fetchData();
  }, []);
  return { bars, isPending, error };
};
