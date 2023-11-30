import { BarType, GeoJsonFeatureCollection, GeoJsonFeature } from '../types';

export const convertBarDataToGeojson = (data: BarType[]): GeoJsonFeatureCollection => {
  const geojsonData: GeoJsonFeatureCollection = {
    type: 'FeatureCollection',
    features: data.map((item) => {
      return {
        type: 'Feature',
        properties: {
          placeID: item.id,
          name: item.name,
          addressFormatted: item.address,
        },
        geometry: {
          type: 'Point',
          coordinates: item.location.coordinates,
        },
      } as GeoJsonFeature;
    }),
  };

  return geojsonData;
};
