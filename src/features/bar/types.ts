import { GeoJsonProperties, Geometry, Feature, FeatureCollection } from 'geojson';

export interface BarType {
  id: number;
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  place_id: string;
  rating: string;
  address: string;
  status: string;
  formatted_phone_number: string;
  international_phone_number: string;
  maps_url: string;
  user_ratings_total: number;
  opening_hours: string;
  website: string;
  category: number[];
  type: number[];
}

export interface ApiResponse {
  data: BarType[];
}

export type GeoJsonFeatureCollection = FeatureCollection<Geometry, GeoJsonProperties>;
export type GeoJsonFeature = Feature<Geometry, GeoJsonProperties>;
