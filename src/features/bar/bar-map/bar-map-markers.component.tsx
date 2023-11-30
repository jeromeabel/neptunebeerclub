import { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import Pin from './bar-map-pin.component';
import { BarType } from '../types';

export const BarMapMarkers = ({ bars }: { bars: BarType[] }) => {
  const [popupInfo, setPopupInfo] = useState<{ lng: number; lat: number; name: string } | null>(
    null,
  );

  const pins = bars.map((bar, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={bar.location.coordinates[0]}
      latitude={bar.location.coordinates[1]}
      anchor="center"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setPopupInfo({
          lng: bar.location.coordinates[0],
          lat: bar.location.coordinates[1],
          name: bar.name,
        });
      }}
    >
      <Pin />
    </Marker>
  ));

  const popups = popupInfo && (
    <Popup
      anchor="top"
      closeButton={false}
      longitude={Number(popupInfo.lng)}
      latitude={Number(popupInfo.lat)}
      onClose={() => setPopupInfo(null)}
      className="min-w-fit p-6 text-black"
    >
      <div className="flex items-center justify-between gap-8">
        <span className="text-lg text-black">{popupInfo.name}</span>
        <button
          className="h-6 w-6 rounded-full border border-black hover:bg-black hover:text-white"
          onClick={() => setPopupInfo(null)}
        >
          X
        </button>
      </div>
    </Popup>
  );

  return (
    <>
      {pins}
      {popups}
    </>
  );
};
