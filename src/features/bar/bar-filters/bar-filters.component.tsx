import { useBarContext } from '../bar-context';

export const BarFilters = () => {
  const { loading, bars, updateFilteredBars } = useBarContext();

  const handleCategoryChange = (category: string) => {
    //[...bars].slice(0, Number(category) * 5)
    let filteredBars = [...bars];
    if (Number(category) !== 0) {
      filteredBars = [...filteredBars].filter((bar) =>
        bar.category.some((cat) => cat === Number(category) + 1),
      );
    }
    updateFilteredBars(filteredBars);
  };

  const handleTypeChange = (type: string) => {
    //[...bars].slice(0, Number(type) * 5)
    let filteredBars = [...bars];
    if (Number(type) !== 0) {
      filteredBars = [...filteredBars].filter((bar) =>
        bar.type.some((cat) => cat === Number(type) + 1),
      );
    }
    updateFilteredBars(filteredBars);
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h2>Filtrer</h2>

      <div className="flex gap-8">
        <div>
          <label>
            Category:
            <select className="bg-slate-800" onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value="0">All</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Type:
            <select className="bg-slate-800" onChange={(e) => handleTypeChange(e.target.value)}>
              <option value="0">All</option>
              <option value="1">Type 1</option>
              <option value="2">Type 2</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};
