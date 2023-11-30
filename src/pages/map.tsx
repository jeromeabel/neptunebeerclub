import Map from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiamVyb21lYWJlbCIsImEiOiJjbHBoM2N0cnQwNWFlMmpwZDI1c3h2NXJqIn0.v9Z0ML_8Fe2xlzX_ggRyOA';

export const MapView = () => {
  return (
    <Map
      id="mymap"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    />
  );
};
