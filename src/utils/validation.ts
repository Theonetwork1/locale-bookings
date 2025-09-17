export const validateLocation = (location: {
  country: string;
  state: string;
  city: string;
}) => {
  const errors: string[] = [];

  if (!location.country) {
    errors.push('Country is required');
  }

  if (!location.state) {
    errors.push('State/Region is required');
  }

  if (!location.city) {
    errors.push('City is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateBusinessLocation = (business: {
  business_address?: string;
  country: string;
  state: string;
  city: string;
  latitude?: number;
  longitude?: number;
}) => {
  const locationValidation = validateLocation(business);
  
  if (!locationValidation.isValid) {
    return locationValidation;
  }

  const errors: string[] = [];

  if (!business.business_address) {
    errors.push('Business address is required');
  }

  if (!business.latitude || !business.longitude) {
    errors.push('GPS coordinates are required for precise location');
  }

  return {
    isValid: errors.length === 0,
    errors: [...locationValidation.errors, ...errors]
  };
};
