interface BarFilterProps {
  id: number;
  name: string;
  icon?: string;
  onSelect: (id: number) => void;
  selectedFilter: number;
}

export const BarFilter = ({ id, name, icon, onSelect, selectedFilter }: BarFilterProps) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`hover:border-primary flex flex-col items-center justify-center gap-4 rounded border bg-stone-800 ${
        selectedFilter === id ? 'border-primary' : 'border-stone-700'
      } `}
    >
      {icon ? <p className="text-4xl">{icon}</p> : null}
      <h3 className="text-lg">{name}</h3>
    </button>
  );
};
