import React from 'react';
import { Business } from '@/lib/supabase';
import { MapPin, Navigation } from 'lucide-react';

interface BusinessMapProps {
  businesses: Business[];
  userLocation?: { lat: number; lng: number };
  onBusinessSelect?: (business: Business) => void;
  className?: string;
}

export const BusinessMap: React.FC<BusinessMapProps> = ({
  businesses,
  userLocation,
  onBusinessSelect,
  className = "h-96 w-full rounded-lg"
}) => {
  return (
    <div className={`${className} bg-muted/30 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center`}>
      <div className="text-center space-y-4">
        <MapPin className="w-16 h-16 text-muted-foreground mx-auto" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">Interactive Map</h3>
          <p className="text-sm text-muted-foreground">
            Map view will be available after Leaflet installation
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Showing {businesses.length} businesses
            {userLocation && ' in your area'}
          </p>
        </div>
        
        {/* Liste simple en attendant la carte */}
        <div className="max-w-sm mx-auto space-y-2">
          {businesses.slice(0, 3).map((business) => (
            <div
              key={business.id}
              className="p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onBusinessSelect?.(business)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{business.name}</p>
                  <p className="text-xs text-muted-foreground">{business.city}</p>
                </div>
                <Navigation className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
