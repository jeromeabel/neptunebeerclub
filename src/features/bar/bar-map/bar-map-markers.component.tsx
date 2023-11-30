import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import Pin from './bar-map-pin.component';
import { BarType, PopupInfosType } from '../types';
import { useBarContext } from '../bar-context';

export const BarMapMarkers = ({ bars }: { bars: BarType[] }) => {
  const [popupInfo, setPopupInfo] = useState<PopupInfosType | null>(null);
  const { currentBar, updateCurrentBar } = useBarContext();

  const pins = bars.map((bar, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={bar.location.coordinates[0]}
      latitude={bar.location.coordinates[1]}
      anchor="center"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        updateCurrentBar(bar);
      }}
    >
      <Pin />
    </Marker>
  ));

  useEffect(() => {
    if (currentBar) {
      setPopupInfo({
        lng: currentBar.location.coordinates[0],
        lat: currentBar.location.coordinates[1],
        name: currentBar.name,
      });
    }
  }, [currentBar]);

  const popups = popupInfo && (
    <Popup
      closeButton={false}
      longitude={Number(popupInfo.lng)}
      latitude={Number(popupInfo.lat)}
      onClose={() => setPopupInfo(null)}
      className="min-w-fit text-black"
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
