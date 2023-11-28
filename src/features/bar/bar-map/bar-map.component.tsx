import { useRef, useState, useMemo } from 'react';
import Map, { Source, Layer, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { MapRef } from 'react-map-gl';
import type { GeoJSONSource } from 'react-map-gl';
import { GeoJsonProperties, Geometry, Feature, FeatureCollection } from 'geojson';

import Pin from './bar-map-pin.component';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './bar-map.layers';
import BARS from '@assets/bars.json';

// const MAPBOX_TOKEN = import.meta.env.VITE_MAP_PUBLIC_TOKEN as string;
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiamVyb21lYWJlbCIsImEiOiJjbHBoM2N0cnQwNWFlMmpwZDI1c3h2NXJqIn0.v9Z0ML_8Fe2xlzX_ggRyOA';

const geojsonData: FeatureCollection<Geometry, GeoJsonProperties> = {
  type: 'FeatureCollection',
  features: BARS.data.map((item) => {
    return {
      id: item.id,
      type: 'Feature',
      properties: {
        placeID: item.id,
        name: item.name,
        addressFormatted: item.address,
      },
      geometry: item.location,
    } as Feature<Geometry, GeoJsonProperties>;
  }),
};

type popupInfoType = {
  lng: number;
  lat: number;
  name: string;
};

export const BarMap = () => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<popupInfoType | null>(null);

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    const feature = event.features?.[0];

    if (!feature) {
      // Gérer le cas où event.features est undefined ou un tableau vide
      return;
    }

    const clusterId = feature.properties?.cluster_id as number;
    const mapboxSource = mapRef.current?.getSource('brest-bars') as GeoJSONSource;

    if (!mapboxSource) {
      // Gérer le cas où mapRef.current est null
      return;
    }

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || zoom === undefined) {
        // Gérer les erreurs ou le cas où zoom est undefined
        return;
      }

      const coordinates =
        feature.geometry?.type === 'Point'
          ? (feature.geometry.coordinates as [number, number])
          : undefined;

      if (coordinates) {
        mapRef.current?.easeTo({
          center: coordinates,
          zoom,
          duration: 500,
        });
      }
    });
  };

  const pins = useMemo(
    () =>
      BARS.data.map((bar, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={bar.location.coordinates[0]}
          latitude={bar.location.coordinates[1]}
          anchor="center"
          onClick={(e) => {
            // don't let click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
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
      )),
    [],
  );

  return (
    <div className="map-wrap">
      <Map
        initialViewState={{
          longitude: -4.4852,
          latitude: 48.3891,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id as string]}
        onClick={onClick}
        ref={mapRef}
      >
        {pins}
        <Source
          id="brest-bars"
          type="geojson"
          data={geojsonData}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>

        {popupInfo && (
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
        )}
      </Map>
    </div>
  );
};
