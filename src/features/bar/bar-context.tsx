import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { BarType } from './types';
import { fetchBars } from './bar-service';

interface BarContextProps {
  bars: BarType[];
  filteredBars: BarType[];
  updateFilteredBars: (filteredData: BarType[]) => void;
  loading: boolean;
  currentBar: BarType;
  updateCurrentBar: (newBar: BarType) => void;
  currentPosition: number[];
}

// const [pos, setPos] = useState([0, 0]);

// useEffect(() => {
//   navigator.geolocation.getCurrentPosition(
//     ({ coords }) => {
//       setPos([coords.longitude, coords.latitude]);
//     },
//     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//     (err: unknown) => console.warn(`Erreur de géocalisation ${err}`),
//   );
// }, []);

export const BarContext = createContext<BarContextProps | undefined>(undefined);

export const BarProvider = ({ children }: PropsWithChildren) => {
  const [bars, setBars] = useState<BarType[]>([]);
  const [currentBar, setCurrentBar] = useState<BarType>();
  const [filteredBars, setFilteredBars] = useState<BarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBars();
        setBars(data);
        setFilteredBars(data);
      } catch (error) {
        console.error("Erreur lors de l'importation des données des bars :", error);
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCurrentPosition([coords.longitude, coords.latitude]);
    });

    void fetchData();
  }, []);

  const updateFilteredBars = (filteredData: BarType[]) => {
    setFilteredBars(filteredData);
  };

  const updateCurrentBar = (newBar: BarType) => {
    if (newBar) {
      setCurrentBar(newBar);
    }
  };

  const contextValue: BarContextProps = {
    bars,
    filteredBars,
    updateFilteredBars,
    loading,
    currentBar: currentBar!,
    updateCurrentBar,
    currentPosition,
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