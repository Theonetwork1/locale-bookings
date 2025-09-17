import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Navigation, Eye } from 'lucide-react';
import { Business, getBusinessesByLocation, calculateDistance } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NearbyBusinessesProps {
  radius?: number;
  limit?: number;
  category?: string;
  className?: string;
}

export const NearbyBusinesses: React.FC<NearbyBusinessesProps> = ({
  radius = 25,
  limit = 5,
  category,
  className = ""
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearbyBusinesses();
  }, [user, radius, category]);

  const fetchNearbyBusinesses = async () => {
    if (!user?.latitude || !user?.longitude || !user?.country) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      let businessData = await getBusinessesByLocation(
        user.country,
        user.state,
        user.city,
        radius,
        user.latitude,
        user.longitude
      );

      // Filtre par catégorie si spécifiée
      if (category) {
        businessData = businessData.filter(b => b.category === category);
      }

      // Limiter le nombre de résultats
      businessData = businessData.slice(0, limit);

      setBusinesses(businessData);
    } catch (error) {
      console.error('Error fetching nearby businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className={`border-0 shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-muted-foreground">Finding nearby businesses...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user?.latitude || !user?.longitude) {
    return (
      <Card className={`border-0 shadow-lg ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Nearby Businesses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Enable location access to see nearby businesses
            </p>
            <Button
              onClick={() => navigate('/client/profile')}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Update Location
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-0 shadow-lg ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Navigation className="w-5 h-5 mr-2" />
            Nearby Businesses
            {category && <Badge variant="secondary" className="ml-2">{category}</Badge>}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/find-business')}
            className="text-primary hover:bg-primary/10"
          >
            <Eye className="w-4 h-4 mr-1" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {businesses.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No businesses found within {radius}km
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/book-appointment/${business.id}`)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-foreground">{business.name}</h4>
                    {business.rating && (
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="ml-1 text-xs">{business.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{business.category}</span>
                    <div className="flex items-center">
                      <Navigation className="w-3 h-3 mr-1" />
                      {calculateDistance(
                        user.latitude!,
                        user.longitude!,
                        business.latitude!,
                        business.longitude!
                      ).toFixed(1)}km
                    </div>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/book-appointment/${business.id}`);
                  }}
                >
                  Book
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};