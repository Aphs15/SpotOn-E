
'use client';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { AlertTriangle } from 'lucide-react';

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
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
    preventGoogleFontsLoading: true,
    // Only attempt to load the script if an API key is provided.
    skip: !apiKey,
  });

  // Since we don't have lat/lng, we'll just center the map.
  // A real implementation would geocode the `location` string.
  const center = useMemo(() => defaultCenter, []);

  if (!apiKey) {
    return (
      <div className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
           <AlertTriangle className="mx-auto h-8 w-8 mb-2 text-primary" />
          <p className="font-semibold">Google Maps API Key Missing</p>
          <p className="text-sm">Please add your NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to see the map.</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="h-[400px] w-full bg-destructive/10 rounded-lg flex items-center justify-center p-4">
        <div className="text-center text-destructive">
           <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
          <p className="font-semibold">Map Error: Invalid API Key</p>
          <p className="text-sm">
            The provided Google Maps API key is invalid or misconfigured. Please check it in the Google Cloud Console.
          </p>
        </div>
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
