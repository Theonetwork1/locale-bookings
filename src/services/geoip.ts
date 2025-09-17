// GeoIP detection service
export interface GeoIPResponse {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export const detectUserLocation = async (): Promise<GeoIPResponse | null> => {
  try {
    // Try multiple GeoIP services for better reliability
    const services = [
      'https://ipapi.co/json/',
      'https://ip-api.com/json/',
      'https://api.ipgeolocation.io/ipgeo?apiKey=free'
    ];

    for (const service of services) {
      try {
        const response = await fetch(service, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          // Normalize response format
          const normalizedData: GeoIPResponse = {
            country: data.country_name || data.country || 'Unknown',
            countryCode: data.country_code || data.countryCode || 'HT',
            region: data.region || data.regionName || 'Unknown',
            city: data.city || 'Unknown',
            latitude: parseFloat(data.latitude) || 0,
            longitude: parseFloat(data.longitude) || 0,
            timezone: data.timezone || 'America/Port-au-Prince'
          };

          return normalizedData;
        }
      } catch (error) {
        console.warn(`GeoIP service ${service} failed:`, error);
        continue;
      }
    }

    // Fallback to Haiti if all services fail
    return {
      country: 'Haiti',
      countryCode: 'HT',
      region: 'Ouest',
      city: 'Port-au-Prince',
      latitude: 18.5944,
      longitude: -72.3074,
      timezone: 'America/Port-au-Prince'
    };
  } catch (error) {
    console.error('GeoIP detection failed:', error);
    return null;
  }
};

export const getCountryByCode = (countryCode: string): string => {
  const countryMap: Record<string, string> = {
    'HT': 'Haiti',
    'US': 'United States',
    'CA': 'Canada',
    'FR': 'France',
    'MX': 'Mexico',
    'BR': 'Brazil',
    'AR': 'Argentina',
    'CL': 'Chile',
    'CO': 'Colombia',
    'PE': 'Peru',
    'DO': 'Dominican Republic',
    'CU': 'Cuba',
    'JM': 'Jamaica',
    'TT': 'Trinidad and Tobago',
    'BB': 'Barbados',
    'GD': 'Grenada',
    'LC': 'Saint Lucia',
    'VC': 'Saint Vincent and the Grenadines',
    'AG': 'Antigua and Barbuda',
    'KN': 'Saint Kitts and Nevis',
    'DM': 'Dominica',
    'BS': 'Bahamas',
    'BZ': 'Belize',
    'CR': 'Costa Rica',
    'GT': 'Guatemala',
    'HN': 'Honduras',
    'NI': 'Nicaragua',
    'PA': 'Panama',
    'SV': 'El Salvador',
    'GY': 'Guyana',
    'SR': 'Suriname',
    'UY': 'Uruguay',
    'PY': 'Paraguay',
    'BO': 'Bolivia',
    'EC': 'Ecuador',
    'VE': 'Venezuela',
    'GF': 'French Guiana',
    'FK': 'Falkland Islands',
    'GS': 'South Georgia and the South Sandwich Islands'
  };

  return countryMap[countryCode] || countryCode;
};
