import { Header } from '@containers/Header';
import { BarList, BarMap } from '@features/bar';
import { BarProvider } from '@features/bar/bar-context';

export const Home = () => {
  return (
    <BarProvider>
      <div className="grid grid-rows-[auto_1fr]">
        <Header />
        <div className="grid grid-cols-[1fr_2fr] ">
          <BarList />
          <BarMap />
        </div>
      </div>
    </BarProvider>
  );
};
