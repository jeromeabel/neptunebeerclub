import React from 'react';
import { BarType } from '../types';
import { useMap } from 'react-map-gl';
import { useBarContext } from '../bar-context';
import mapboxgl from 'mapbox-gl';

interface BarItemProps {
  bar: BarType;
}

export const BarItem: React.FC<BarItemProps> = ({ bar }) => {
  const { currentBar, updateCurrentBar, currentPosition } = useBarContext();
  const { barmap } = useMap();

  const onClick = () => {
    barmap?.easeTo({
      center: [bar.location.coordinates[0], bar.location.coordinates[1]],
      duration: 1000,
      zoom: 15,
    });
    updateCurrentBar(bar);
  };

  const start = new mapboxgl.LngLat(bar.location.coordinates[0], bar.location.coordinates[1]);
  const end = new mapboxgl.LngLat(currentPosition[0], currentPosition[1]);
  const distance = start.distanceTo(end) / 1000;

  return (
    <div
      onClick={onClick}
      className={`h-full rounded-xl px-8 py-6 hover:cursor-pointer hover:bg-stone-600 ${
        currentBar?.id === bar.id ? 'bg-stone-600' : 'bg-stone-800'
      } `}
    >
      <span className="text-2xl font-bold uppercase">{bar.name}</span>
      <p>
        🏃‍♂️ A {distance ? distance.toFixed(2) : 'No Data'} KM - {bar.address}
      </p>
    </div>
  );
};
