import { useState, useEffect, useRef } from 'react';
import Map, { Source, Layer, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useBarContext } from '../bar-context';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './bar-map.layers';
import { BarMapMarkers } from './bar-map-markers.component';
import { convertBarDataToGeojson } from './helpers';
import { GeoJsonFeatureCollection } from '../types';
import { handleMapClick } from './bar-map-click-handler';
import Loading from '@components/Loading';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiamVyb21lYWJlbCIsImEiOiJjbHBoM2N0cnQwNWFlMmpwZDI1c3h2NXJqIn0.v9Z0ML_8Fe2xlzX_ggRyOA';

export const BarMap = () => {
  const { filteredBars, loading } = useBarContext();
  const [geojsonData, setGeojsonData] = useState<GeoJsonFeatureCollection>();
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!loading) {
      try {
        const convertedData = convertBarDataToGeojson(filteredBars);
        setGeojsonData(convertedData);
      } catch (error) {
        console.error('Erreur lors de la conversion en GeoJSON :', error);
      }
    }
  }, [filteredBars, loading]);

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    handleMapClick(event, mapRef);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen w-full">
      <Map
        id="barmap"
        initialViewState={{
          longitude: -4.4852,
          latitude: 48.3891,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id as string]}
        ref={mapRef}
        onClick={onClick}
      >
        {geojsonData ? (
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
        ) : null}
        <BarMapMarkers bars={filteredBars} />
      </Map>
    </div>
  );
};
