import { useState } from 'react';
import { useBarContext } from '../bar-context';
import { BarFilter } from './bar-filter.components';

// 🍾 🧃 🧉 🍹 🍸 🥃 ☕ 🍷
export const BarFilters = () => {
  const { loading, bars, updateFilteredBars } = useBarContext();
  const [currentFilter, setCurrentFilter] = useState<number>(0);

  const handleOnFilter = (filterId: number) => {
    let filteredBars = [...bars];
    if (filterId !== 0) {
      filteredBars = [...filteredBars].filter((bar) =>
        bar.category.some((cat) => cat === filterId + 1),
      );
    }
    updateFilteredBars(filteredBars);
    setCurrentFilter(filterId);
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="border-b border-gray-500 p-4">
      <h2 className="font-heading text-5xl tracking-wide">
        Trouver le bar qu&apos;il vous faut <span className="text-primary">selon votre humeur</span>
      </h2>

      <div className="mt-4 grid h-40 grid-cols-3 gap-4">
        <BarFilter
          id={0}
          name="Tous"
          onSelect={handleOnFilter}
          icon="🍺"
          selectedFilter={currentFilter}
        />
        <BarFilter
          id={1}
          name="Midi"
          onSelect={handleOnFilter}
          icon="🍷"
          selectedFilter={currentFilter}
        />
        <BarFilter
          id={2}
          name="Soirée"
          onSelect={handleOnFilter}
          icon="🍹"
          selectedFilter={currentFilter}
        />
      </div>
    </div>
  );
};
