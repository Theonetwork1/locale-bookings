import React from 'react';
import { Navigation } from 'lucide-react';
import { calculateDistance } from '@/lib/supabase';

interface DistanceCalculatorProps {
  userLocation?: { lat: number; lng: number };
  businessLocation?: { lat: number; lng: number };
  className?: string;
}

export const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({
  userLocation,
  businessLocation,
  className = ""
}) => {
  if (!userLocation || !businessLocation) {
    return null;
  }

  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    businessLocation.lat,
    businessLocation.lng
  );

  const getDistanceColor = (dist: number) => {
    if (dist <= 5) return 'text-success';
    if (dist <= 15) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getDistanceText = (dist: number) => {
    if (dist < 1) return `${(dist * 1000).toFixed(0)}m`;
    return `${dist.toFixed(1)}km`;
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Navigation className="w-4 h-4 mr-1" />
      <span className={`text-sm font-medium ${getDistanceColor(distance)}`}>
        {getDistanceText(distance)} away
      </span>
    </div>
  );
};