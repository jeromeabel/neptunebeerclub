import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import { MapRef } from 'react-map-gl';

export const handleMapClick = (
  event: mapboxgl.MapLayerMouseEvent,
  mapRef: React.RefObject<mapboxgl.Map | MapRef>,
): void => {
  const feature = event.features?.[0];

  if (!feature) {
    // Gérer le cas où event.features est undefined ou un tableau vide
    return;
  }

  const clusterId = feature.properties?.cluster_id as number;
  const mapboxSource = mapRef.current?.getSource('brest-bars') as GeoJSONSource;

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
