'use client';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem',
};

// A default center, just in case. Johannesburg, South Africa.
const defaultCenter = {
  lat: -26.2041,
  lng: 28.0473,
};

interface EventMapProps {
  location: string;
}

export default function EventMap({ location }: EventMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
  });

  // Since we don't have lat/lng, we'll just center the map.
  // A real implementation would geocode the `location` string.
  const center = useMemo(() => defaultCenter, []);

  if (loadError) {
    return (
      <div className="h-[400px] w-full bg-destructive/20 rounded-lg flex items-center justify-center text-destructive-foreground p-4">
        <p>
          Map cannot be loaded right now, sorry. Make sure you have a valid
          Google Maps API key.
        </p>
      </div>
    );
  }

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* We are not placing a marker as we don't have coordinates for the location */}
    </GoogleMap>
  ) : (
    <div className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  );
}
