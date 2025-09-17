import { useState, useEffect, useCallback } from 'react';
import { 
  Country, 
  State, 
  Department, 
  City, 
  Neighborhood,
  AdministrativeLevel,
  getCountries,
  getStatesByCountry,
  getDepartmentsByState,
  getDepartmentsByCountry,
  getCitiesByDepartment,
  getCitiesByState,
  getCitiesByCountry,
  getNeighborhoodsByCity,
  getAdministrativeLevels
} from '@/lib/supabase';

interface GeographicCache {
  countries: Country[];
  states: { [countryId: string]: State[] };
  departments: { [stateId: string]: Department[] };
  departmentsByCountry: { [countryId: string]: Department[] };
  cities: { [departmentId: string]: City[] };
  citiesByState: { [stateId: string]: City[] };
  citiesByCountry: { [countryId: string]: City[] };
  neighborhoods: { [cityId: string]: Neighborhood[] };
  administrativeLevels: { [countryId: string]: AdministrativeLevel[] };
}

interface UseGeographicDataReturn {
  // Data
  countries: Country[];
  states: State[];
  departments: Department[];
  cities: City[];
  neighborhoods: Neighborhood[];
  administrativeLevels: AdministrativeLevel[];
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Actions
  loadStates: (countryId: string) => Promise<void>;
  loadDepartments: (stateId: string) => Promise<void>;
  loadDepartmentsByCountry: (countryId: string) => Promise<void>;
  loadCities: (departmentId: string) => Promise<void>;
  loadCitiesByState: (stateId: string) => Promise<void>;
  loadCitiesByCountry: (countryId: string) => Promise<void>;
  loadNeighborhoods: (cityId: string) => Promise<void>;
  loadAdministrativeLevels: (countryId: string) => Promise<void>;
  
  // Cache management
  clearCache: () => void;
  preloadCountryData: (countryId: string) => Promise<void>;
}

// Global cache to persist across component unmounts
let globalCache: GeographicCache = {
  countries: [],
  states: {},
  departments: {},
  departmentsByCountry: {},
  cities: {},
  citiesByState: {},
  citiesByCountry: {},
  neighborhoods: {},
  administrativeLevels: {}
};

export const useGeographicData = (): UseGeographicDataReturn => {
  const [countries, setCountries] = useState<Country[]>(globalCache.countries);
  const [states, setStates] = useState<State[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [administrativeLevels, setAdministrativeLevels] = useState<AdministrativeLevel[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load countries on mount
  useEffect(() => {
    const loadCountries = async () => {
      if (globalCache.countries.length > 0) {
        setCountries(globalCache.countries);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const data = await getCountries();
        globalCache.countries = data;
        setCountries(data);
      } catch (err) {
        const errorMessage = 'Failed to load countries';
        setError(errorMessage);
        console.error(errorMessage, err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const loadStates = useCallback(async (countryId: string) => {
    if (globalCache.states[countryId]) {
      setStates(globalCache.states[countryId]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getStatesByCountry(countryId);
      globalCache.states[countryId] = data;
      setStates(data);
    } catch (err) {
      const errorMessage = 'Failed to load states';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDepartments = useCallback(async (stateId: string) => {
    if (globalCache.departments[stateId]) {
      setDepartments(globalCache.departments[stateId]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getDepartmentsByState(stateId);
      globalCache.departments[stateId] = data;
      setDepartments(data);
    } catch (err) {
      const errorMessage = 'Failed to load departments';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDepartmentsByCountry = useCallback(async (countryId: string) => {
    if (globalCache.departmentsByCountry[countryId]) {
      setDepartments(globalCache.departmentsByCountry[countryId]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getDepartmentsByCountry(countryId);
      globalCache.departmentsByCountry[countryId] = data;
      setDepartments(data);
    } catch (err) {
      const errorMessage = 'Failed to load departments';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCities = useCallback(async (departmentId: string) => {
    if (globalCache.cities[departmentId]) {
      setCities(globalCache.cities[departmentId]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getCitiesByDepartment(departmentId);
      globalCache.cities[departmentId] = data;
      setCities(data);
    } catch (err) {
      const errorMessage = 'Failed to load cities';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCitiesByState = useCallback(async (stateId: string) => {
    if (globalCache.citiesByState[stateId]) {
      setCities(globalCache.citiesByState[stateId]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getCitiesByState(stateId);
      globalCache.citiesByState[stateId] = data;
      setCities(data);
    } catch (err) {
      const errorMessage = 'Failed to load cities';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCitiesByCountry = useCallback(async (countryId: string) => {
    if (globalCache.citiesByCountry[countryId]) {
      setCities(globalCache.citiesByCountry[countryId]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getCitiesByCountry(countryId);
      globalCache.citiesByCountry[countryId] = data;
      setCities(data);
    } catch (err) {
      const errorMessage = 'Failed to load cities';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadNeighborhoods = useCallback(async (cityId: string) => {
    if (globalCache.neighborhoods[cityId]) {
      setNeighborhoods(globalCache.neighborhoods[cityId]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getNeighborhoodsByCity(cityId);
      globalCache.neighborhoods[cityId] = data;
      setNeighborhoods(data);
    } catch (err) {
      const errorMessage = 'Failed to load neighborhoods';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAdministrativeLevels = useCallback(async (countryId: string) => {
    if (globalCache.administrativeLevels[countryId]) {
      setAdministrativeLevels(globalCache.administrativeLevels[countryId]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getAdministrativeLevels(countryId);
      globalCache.administrativeLevels[countryId] = data;
      setAdministrativeLevels(data);
    } catch (err) {
      const errorMessage = 'Failed to load administrative levels';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    globalCache = {
      countries: [],
      states: {},
      departments: {},
      departmentsByCountry: {},
      cities: {},
      citiesByState: {},
      citiesByCountry: {},
      neighborhoods: {},
      administrativeLevels: {}
    };
    setStates([]);
    setDepartments([]);
    setCities([]);
    setNeighborhoods([]);
    setAdministrativeLevels([]);
  }, []);

  const preloadCountryData = useCallback(async (countryId: string) => {
    try {
      // Preload states and administrative levels in parallel
      await Promise.all([
        loadStates(countryId),
        loadAdministrativeLevels(countryId)
      ]);
    } catch (err) {
      console.error('Failed to preload country data:', err);
    }
  }, [loadStates, loadAdministrativeLevels]);

  return {
    // Data
    countries,
    states,
    departments,
    cities,
    neighborhoods,
    administrativeLevels,
    
    // Loading states
    loading,
    error,
    
    // Actions
    loadStates,
    loadDepartments,
    loadDepartmentsByCountry,
    loadCities,
    loadCitiesByState,
    loadCitiesByCountry,
    loadNeighborhoods,
    loadAdministrativeLevels,
    
    // Cache management
    clearCache,
    preloadCountryData
  };
};
