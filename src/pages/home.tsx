import { Header } from '@containers/Header';
import { BarList, BarMap } from '@features/bar';
//grid min-h-screen grid-rows-[auto_1fr]
// divide-x
export const Home = () => {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <Header />
      <div className="grid grid-cols-[1fr_2fr] ">
        <BarList />
        <BarMap />
      </div>
    </div>
  );
};
