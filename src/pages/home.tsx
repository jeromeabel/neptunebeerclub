import { Header } from '@containers/Header';
import { BarList, BarMap, BarFilters, BarProvider } from '@features/bar';
import { MapProvider } from 'react-map-gl';

export const Home = () => {
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-[1fr_2fr]">
        <BarProvider>
          <MapProvider>
            <div className="flex flex-col">
              <BarFilters />
              <BarList />
            </div>
            <BarMap />
          </MapProvider>
        </BarProvider>
      </div>
    </div>
  );
};
