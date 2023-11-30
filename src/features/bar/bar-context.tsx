import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { BarType } from './types';
import { fetchBars } from './bar-service';

interface BarContextProps {
  bars: BarType[];
  filteredBars: BarType[];
  updateFilteredBars: (filteredData: BarType[]) => void;
  loading: boolean;
}

export const BarContext = createContext<BarContextProps | undefined>(undefined);

export const BarProvider = ({ children }: PropsWithChildren) => {
  const [bars, setBars] = useState<BarType[]>([]);
  const [filteredBars, setFilteredBars] = useState<BarType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBars();
        setBars(data);
        setFilteredBars(data);
      } catch (error) {
        // Gérer l'erreur
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const updateFilteredBars = (filteredData: BarType[]) => {
    setFilteredBars(filteredData);
  };

  const contextValue: BarContextProps = {
    bars,
    filteredBars,
    updateFilteredBars,
    loading,
  };

  return <BarContext.Provider value={contextValue}>{children}</BarContext.Provider>;
};

export const useBarContext = (): BarContextProps => {
  const context = useContext(BarContext);
  if (!context) {
    throw new Error('useBarContext must be used inside the BarProvider');
  }
  return context;
};
