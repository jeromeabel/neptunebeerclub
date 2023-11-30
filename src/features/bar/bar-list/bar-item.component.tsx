import React from 'react';
import { BarType } from '../types';
import { useMap } from 'react-map-gl';
import { useBarContext } from '../bar-context';

interface BarItemProps {
  bar: BarType;
}

export const BarItem: React.FC<BarItemProps> = ({ bar }) => {
  const { currentBar, updateCurrentBar } = useBarContext();

  const { barmap } = useMap();
  const onClick = () => {
    barmap?.easeTo({
      center: [bar.location.coordinates[0], bar.location.coordinates[1]],
      duration: 1000,
    });
    updateCurrentBar(bar);
  };

  return (
    <div
      onClick={onClick}
      className={`h-full rounded-xl px-8 py-6 hover:cursor-pointer ${
        currentBar?.id === bar.id ? 'bg-slate-600' : 'bg-slate-900'
      } `}
    >
      <span className="text-2xl font-bold uppercase">{bar.name}</span>
      <p>🏃‍♂️ A ?? KM {bar.address}</p>
    </div>
  );
};
