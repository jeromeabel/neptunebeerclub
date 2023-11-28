import { BarItem } from './bar-item.component';
import { useBarList } from './use-bar-list';

export const BarList = () => {
  const { bars, isPending, error } = useBarList();

  if (isPending) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>{`Une erreur s'est produite: ${error}`}</div>;
  }

  return (
    <section className="h-5/6 overflow-y-scroll">
      <ul className="flex flex-col gap-4  p-4">
        {bars.map((bar) => (
          <li key={bar.id}>
            <BarItem bar={bar} />
          </li>
        ))}
      </ul>
    </section>
  );
};
