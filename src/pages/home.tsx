import { Header } from '@containers/Header';
import { BarList, BarMap } from '@features/bar';
import { BarProvider } from '@features/bar/bar-context';
import { MapProvider } from 'react-map-gl';

export const Home = () => {
  return (
    <div className="">
      <Header />
      {/* <div className="grid grid-rows-[auto_1fr] grid grid-cols-[1fr_2fr] ">
       */}
      <div className="grid grid-cols-[1fr_2fr]">
        <BarProvider>
          <MapProvider>
            <BarList />
            <BarMap />
          </MapProvider>
        </BarProvider>
      </div>
    </div>
  );
};
