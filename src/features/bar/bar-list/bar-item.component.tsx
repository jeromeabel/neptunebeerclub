import React from 'react';
import { Bar } from '../types';

interface BarItemProps {
  bar: Bar;
}

export const BarItem: React.FC<BarItemProps> = ({ bar }) => {
  return (
    <div className="h-full rounded-xl bg-slate-900 px-8 py-6">
      <span className="text-2xl font-bold uppercase">{bar.name}</span>
      <p>🏃‍♂️ A ?? KM {bar.address}</p>
    </div>
  );
};
