import { useBarContext } from '../bar-context';
import { BarItem } from './bar-item.component';

export const BarList = () => {
  const { filteredBars, loading } = useBarContext();

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <section className="p-4">
      <ul className="flex flex-col gap-4">
        {filteredBars.map((bar) => (
          <li key={bar.id}>
            <BarItem bar={bar} />
          </li>
        ))}
      </ul>
    </section>
  );
};
