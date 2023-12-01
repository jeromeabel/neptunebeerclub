import Loading from '@components/Loading';
import { useBarContext } from '../bar-context';
import { BarItem } from './bar-item.component';

export const BarList = () => {
  const { filteredBars, loading, udpateNumberOfBars, numberOfBars } = useBarContext();

  const handleClickMore = () => {
    udpateNumberOfBars(numberOfBars + 5);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="grow overflow-y-scroll p-4">
      <ul className="flex flex-col gap-4">
        {filteredBars.slice(0, numberOfBars).map((bar) => (
          <li key={bar.id}>
            <BarItem bar={bar} />
          </li>
        ))}
      </ul>

      {filteredBars.length > 4 ? (
        <div className="w-full pt-4 text-center">
          <button
            className="rounded-xl bg-stone-800 px-4 py-2 hover:bg-stone-600"
            onClick={handleClickMore}
          >
            Voir plus
          </button>
        </div>
      ) : null}
    </section>
  );
};
