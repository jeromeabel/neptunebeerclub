import { Header } from '@containers/Header';
import { BarList, BarMap, BarFilters, BarProvider } from '@features/bar';
import { MapProvider } from 'react-map-gl';

export const Home = () => {
  return (
    <BarProvider>
      <MapProvider>
        <div className="grid grid-cols-[1fr_2fr]">
          <div className="flex h-screen flex-col">
            <Header />
            <BarFilters />
            <BarList />
          </div>
          <div>
            <BarMap />
          </div>
        </div>
      </MapProvider>
    </BarProvider>
  );
};
