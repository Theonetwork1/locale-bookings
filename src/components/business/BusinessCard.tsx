import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail } from 'lucide-react';
import { Business } from '@/lib/supabase';
import { DistanceCalculator } from '@/components/location/DistanceCalculator';
import { useNavigate } from 'react-router-dom';

interface BusinessCardProps {
  business: Business;
  userLocation?: { lat: number; lng: number };
  showDistance?: boolean;
  className?: string;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  userLocation,
  showDistance = true,
  className = ""
}) => {
  const navigate = useNavigate();

  return (
    <Card className={`bg-white/95 border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                {business.logo_url ? (
                  <img src={business.logo_url} alt={business.name} className="w-8 h-8 rounded" />
                ) : (
                  <span className="text-primary font-bold text-lg">
                    {business.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {business.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{business.category}</Badge>
                  {business.rating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{business.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Description */}
            {business.description && (
              <p className="text-muted-foreground mb-3 line-clamp-2">{business.description}</p>
            )}
            
            {/* Location & Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{business.address || `${business.city}, ${business.state}, ${business.country}`}</span>
              </div>
              
              {showDistance && userLocation && business.latitude && business.longitude && (
                <DistanceCalculator
                  userLocation={userLocation}
                  businessLocation={{ lat: business.latitude, lng: business.longitude }}
                />
              )}
              
              {business.phone && (
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{business.phone}</span>
                </div>
              )}
              
              {business.email && (
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{business.email}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => navigate(`/book-appointment/${business.id}`)}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white transition-all duration-200 hover:scale-105"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/business/${business.id}`)}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};