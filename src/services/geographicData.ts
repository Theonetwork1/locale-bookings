import { supabase, Country, State, Department, City } from '@/lib/supabase';

// Global geographic data service
export interface GeographicSubdivision {
  id: string;
  name: string;
  name_en: string;
  name_fr: string;
  name_es: string;
  name_ht: string;
  description?: string;
  type: 'state' | 'department' | 'province' | 'region';
  country_id: string;
  latitude?: number;
  longitude?: number;
}

export interface CountryWithSubdivisions {
  country: Country;
  subdivisions: GeographicSubdivision[];
}

// Comprehensive country data with subdivisions
const GLOBAL_COUNTRY_DATA: Record<string, CountryWithSubdivisions> = {
  'HT': {
    country: {
      id: 'ht',
      code: 'HT',
      name_en: 'Haiti',
      name_fr: 'Haïti',
      name_es: 'Haití',
      name_ht: 'Ayiti',
      currency_code: 'HTG',
      phone_code: '+509',
      created_at: new Date().toISOString()
    },
    subdivisions: [
      { id: 'ht-ouest', name: 'Ouest', name_en: 'Ouest', name_fr: 'Ouest', name_es: 'Oeste', name_ht: 'Lwès', description: 'Capital region and business center', type: 'department', country_id: 'ht', latitude: 18.5944, longitude: -72.3074 },
      { id: 'ht-artibonite', name: 'Artibonite', name_en: 'Artibonite', name_fr: 'Artibonite', name_es: 'Artibonito', name_ht: 'Latibonit', description: 'Agriculture and commerce hub', type: 'department', country_id: 'ht', latitude: 19.4517, longitude: -72.6889 },
      { id: 'ht-nord', name: 'Nord', name_en: 'Nord', name_fr: 'Nord', name_es: 'Norte', name_ht: 'Nò', description: 'Historical and cultural center', type: 'department', country_id: 'ht', latitude: 19.5744, longitude: -72.3022 },
      { id: 'ht-sud', name: 'Sud', name_en: 'Sud', name_fr: 'Sud', name_es: 'Sur', name_ht: 'Sid', description: 'Tourism and fishing industry', type: 'department', country_id: 'ht', latitude: 18.3381, longitude: -73.4003 },
      { id: 'ht-centre', name: 'Centre', name_en: 'Centre', name_fr: 'Centre', name_es: 'Centro', name_ht: 'Sant', description: 'Mountain region and agriculture', type: 'department', country_id: 'ht', latitude: 19.0431, longitude: -72.0000 },
      { id: 'ht-nord-est', name: 'Nord-Est', name_en: 'Nord-Est', name_fr: 'Nord-Est', name_es: 'Nordeste', name_ht: 'Nòdès', description: 'Border region and trade', type: 'department', country_id: 'ht', latitude: 19.5000, longitude: -71.7500 },
      { id: 'ht-nord-ouest', name: 'Nord-Ouest', name_en: 'Nord-Ouest', name_fr: 'Nord-Ouest', name_es: 'Noroeste', name_ht: 'Nòdwès', description: 'Coastal and agricultural area', type: 'department', country_id: 'ht', latitude: 19.8333, longitude: -73.1667 },
      { id: 'ht-sud-est', name: 'Sud-Est', name_en: 'Sud-Est', name_fr: 'Sud-Est', name_es: 'Sureste', name_ht: 'Sidès', description: 'Tourism and fishing', type: 'department', country_id: 'ht', latitude: 18.2500, longitude: -72.4167 },
      { id: 'ht-grand-anse', name: "Grand'Anse", name_en: "Grand'Anse", name_fr: "Grand'Anse", name_es: "Grand'Anse", name_ht: "Grandans", description: 'Agriculture and fishing', type: 'department', country_id: 'ht', latitude: 18.4167, longitude: -74.0833 },
      { id: 'ht-nippes', name: 'Nippes', name_en: 'Nippes', name_fr: 'Nippes', name_es: 'Nippes', name_ht: 'Nip', description: 'Agriculture and crafts', type: 'department', country_id: 'ht', latitude: 18.4167, longitude: -73.0833 }
    ]
  },
  'US': {
    country: {
      id: 'us',
      code: 'US',
      name_en: 'United States',
      name_fr: 'États-Unis',
      name_es: 'Estados Unidos',
      name_ht: 'Etazini',
      currency_code: 'USD',
      phone_code: '+1',
      created_at: new Date().toISOString()
    },
    subdivisions: [
      { id: 'us-ca', name: 'California', name_en: 'California', name_fr: 'Californie', name_es: 'California', name_ht: 'Kalifòni', description: 'Golden State - Technology and entertainment hub', type: 'state', country_id: 'us', latitude: 36.7783, longitude: -119.4179 },
      { id: 'us-ny', name: 'New York', name_en: 'New York', name_fr: 'New York', name_es: 'Nueva York', name_ht: 'Nouyòk', description: 'Empire State - Financial and cultural center', type: 'state', country_id: 'us', latitude: 42.1657, longitude: -74.9481 },
      { id: 'us-tx', name: 'Texas', name_en: 'Texas', name_fr: 'Texas', name_es: 'Texas', name_ht: 'Teksas', description: 'Lone Star State - Energy and technology', type: 'state', country_id: 'us', latitude: 31.9686, longitude: -99.9018 },
      { id: 'us-fl', name: 'Florida', name_en: 'Florida', name_fr: 'Floride', name_es: 'Florida', name_ht: 'Florid', description: 'Sunshine State - Tourism and aerospace', type: 'state', country_id: 'us', latitude: 27.7663, longitude: -82.6404 },
      { id: 'us-il', name: 'Illinois', name_en: 'Illinois', name_fr: 'Illinois', name_es: 'Illinois', name_ht: 'Ilinwa', description: 'Prairie State - Transportation and finance', type: 'state', country_id: 'us', latitude: 40.3363, longitude: -89.0022 },
      { id: 'us-pa', name: 'Pennsylvania', name_en: 'Pennsylvania', name_fr: 'Pennsylvanie', name_es: 'Pensilvania', name_ht: 'Pennsilvani', description: 'Keystone State - History and industry', type: 'state', country_id: 'us', latitude: 41.2033, longitude: -77.1945 },
      { id: 'us-oh', name: 'Ohio', name_en: 'Ohio', name_fr: 'Ohio', name_es: 'Ohio', name_ht: 'Ohio', description: 'Buckeye State - Manufacturing and agriculture', type: 'state', country_id: 'us', latitude: 40.3888, longitude: -82.7649 },
      { id: 'us-ga', name: 'Georgia', name_en: 'Georgia', name_fr: 'Géorgie', name_es: 'Georgia', name_ht: 'Georgi', description: 'Peach State - Agriculture and technology', type: 'state', country_id: 'us', latitude: 33.0406, longitude: -83.6431 },
      { id: 'us-nc', name: 'North Carolina', name_en: 'North Carolina', name_fr: 'Caroline du Nord', name_es: 'Carolina del Norte', name_ht: 'Karolin di Nò', description: 'Tar Heel State - Technology and banking', type: 'state', country_id: 'us', latitude: 35.7596, longitude: -79.0193 },
      { id: 'us-mi', name: 'Michigan', name_en: 'Michigan', name_fr: 'Michigan', name_es: 'Míchigan', name_ht: 'Michigan', description: 'Great Lakes State - Automotive industry', type: 'state', country_id: 'us', latitude: 43.3266, longitude: -84.5361 },
      { id: 'us-nj', name: 'New Jersey', name_en: 'New Jersey', name_fr: 'New Jersey', name_es: 'Nueva Jersey', name_ht: 'Nou Jèze', description: 'Garden State - Pharmaceuticals and finance', type: 'state', country_id: 'us', latitude: 40.2989, longitude: -74.5210 },
      { id: 'us-va', name: 'Virginia', name_en: 'Virginia', name_fr: 'Virginie', name_es: 'Virginia', name_ht: 'Vijini', description: 'Old Dominion - Government and technology', type: 'state', country_id: 'us', latitude: 37.7693, longitude: -78.1699 },
      { id: 'us-wa', name: 'Washington', name_en: 'Washington', name_fr: 'Washington', name_es: 'Washington', name_ht: 'Washington', description: 'Evergreen State - Technology and aerospace', type: 'state', country_id: 'us', latitude: 47.7511, longitude: -120.7401 },
      { id: 'us-az', name: 'Arizona', name_en: 'Arizona', name_fr: 'Arizona', name_es: 'Arizona', name_ht: 'Arizona', description: 'Grand Canyon State - Tourism and technology', type: 'state', country_id: 'us', latitude: 33.7298, longitude: -111.4312 },
      { id: 'us-ma', name: 'Massachusetts', name_en: 'Massachusetts', name_fr: 'Massachusetts', name_es: 'Massachusetts', name_ht: 'Massachusetts', description: 'Bay State - Education and biotechnology', type: 'state', country_id: 'us', latitude: 42.2373, longitude: -71.5314 }
    ]
  },
  'CA': {
    country: {
      id: 'ca',
      code: 'CA',
      name_en: 'Canada',
      name_fr: 'Canada',
      name_es: 'Canadá',
      name_ht: 'Kanada',
      currency_code: 'CAD',
      phone_code: '+1',
      created_at: new Date().toISOString()
    },
    subdivisions: [
      { id: 'ca-on', name: 'Ontario', name_en: 'Ontario', name_fr: 'Ontario', name_es: 'Ontario', name_ht: 'Ontario', description: 'Most populous province - Financial center', type: 'province', country_id: 'ca', latitude: 51.2538, longitude: -85.3232 },
      { id: 'ca-qc', name: 'Quebec', name_en: 'Quebec', name_fr: 'Québec', name_es: 'Quebec', name_ht: 'Kebèk', description: 'French-speaking province - Culture and aerospace', type: 'province', country_id: 'ca', latitude: 52.9399, longitude: -73.5491 },
      { id: 'ca-bc', name: 'British Columbia', name_en: 'British Columbia', name_fr: 'Colombie-Britannique', name_es: 'Columbia Británica', name_ht: 'Kolombi Britanik', description: 'Pacific province - Natural resources and technology', type: 'province', country_id: 'ca', latitude: 53.7267, longitude: -127.6476 },
      { id: 'ca-ab', name: 'Alberta', name_en: 'Alberta', name_fr: 'Alberta', name_es: 'Alberta', name_ht: 'Alberta', description: 'Energy province - Oil and gas industry', type: 'province', country_id: 'ca', latitude: 53.9333, longitude: -116.5765 },
      { id: 'ca-mb', name: 'Manitoba', name_en: 'Manitoba', name_fr: 'Manitoba', name_es: 'Manitoba', name_ht: 'Manitoba', description: 'Prairie province - Agriculture and mining', type: 'province', country_id: 'ca', latitude: 53.7609, longitude: -98.8139 },
      { id: 'ca-sk', name: 'Saskatchewan', name_en: 'Saskatchewan', name_fr: 'Saskatchewan', name_es: 'Saskatchewan', name_ht: 'Saskatchewan', description: 'Prairie province - Agriculture and potash', type: 'province', country_id: 'ca', latitude: 52.9399, longitude: -106.4509 },
      { id: 'ca-ns', name: 'Nova Scotia', name_en: 'Nova Scotia', name_fr: 'Nouvelle-Écosse', name_es: 'Nueva Escocia', name_ht: 'Nouvo Ekòs', description: 'Maritime province - Fishing and shipbuilding', type: 'province', country_id: 'ca', latitude: 44.6820, longitude: -63.7443 },
      { id: 'ca-nb', name: 'New Brunswick', name_en: 'New Brunswick', name_fr: 'Nouveau-Brunswick', name_es: 'Nuevo Brunswick', name_ht: 'Nouvo Brunswick', description: 'Maritime province - Bilingual and forestry', type: 'province', country_id: 'ca', latitude: 46.5653, longitude: -66.4619 },
      { id: 'ca-nl', name: 'Newfoundland and Labrador', name_en: 'Newfoundland and Labrador', name_fr: 'Terre-Neuve-et-Labrador', name_es: 'Terranova y Labrador', name_ht: 'Tè Nèf ak Labrador', description: 'Atlantic province - Oil and fishing', type: 'province', country_id: 'ca', latitude: 53.1355, longitude: -57.6604 },
      { id: 'ca-pe', name: 'Prince Edward Island', name_en: 'Prince Edward Island', name_fr: 'Île-du-Prince-Édouard', name_es: 'Isla del Príncipe Eduardo', name_ht: 'Ile Prince Edward', description: 'Smallest province - Agriculture and tourism', type: 'province', country_id: 'ca', latitude: 46.5107, longitude: -63.4168 },
      { id: 'ca-yt', name: 'Yukon', name_en: 'Yukon', name_fr: 'Yukon', name_es: 'Yukón', name_ht: 'Yukon', description: 'Northern territory - Mining and wilderness', type: 'territory', country_id: 'ca', latitude: 64.2823, longitude: -139.0692 },
      { id: 'ca-nt', name: 'Northwest Territories', name_en: 'Northwest Territories', name_fr: 'Territoires du Nord-Ouest', name_es: 'Territorios del Noroeste', name_ht: 'Teritwa Nòdwès', description: 'Northern territory - Diamonds and natural resources', type: 'territory', country_id: 'ca', latitude: 64.8255, longitude: -124.8457 },
      { id: 'ca-nu', name: 'Nunavut', name_en: 'Nunavut', name_fr: 'Nunavut', name_es: 'Nunavut', name_ht: 'Nunavut', description: 'Northern territory - Inuit culture and mining', type: 'territory', country_id: 'ca', latitude: 70.2998, longitude: -83.1076 }
    ]
  },
  'FR': {
    country: {
      id: 'fr',
      code: 'FR',
      name_en: 'France',
      name_fr: 'France',
      name_es: 'Francia',
      name_ht: 'Frans',
      currency_code: 'EUR',
      phone_code: '+33',
      created_at: new Date().toISOString()
    },
    subdivisions: [
      { id: 'fr-idf', name: 'Île-de-France', name_en: 'Île-de-France', name_fr: 'Île-de-France', name_es: 'Isla de Francia', name_ht: 'Ile-de-Frans', description: 'Capital region - Business and culture', type: 'region', country_id: 'fr', latitude: 48.8566, longitude: 2.3522 },
      { id: 'fr-ara', name: 'Auvergne-Rhône-Alpes', name_en: 'Auvergne-Rhône-Alpes', name_fr: 'Auvergne-Rhône-Alpes', name_es: 'Auvernia-Ródano-Alpes', name_ht: 'Ovèny-Ron-Alp', description: 'Mountain region - Industry and tourism', type: 'region', country_id: 'fr', latitude: 45.7640, longitude: 4.8357 },
      { id: 'fr-hdf', name: 'Hauts-de-France', name_en: 'Hauts-de-France', name_fr: 'Hauts-de-France', name_es: 'Altos de Francia', name_ht: 'Oto-de-Frans', description: 'Northern region - Industry and agriculture', type: 'region', country_id: 'fr', latitude: 50.4801, longitude: 2.7937 },
      { id: 'fr-ge', name: 'Grand Est', name_en: 'Grand Est', name_fr: 'Grand Est', name_es: 'Gran Este', name_ht: 'Gran Lès', description: 'Eastern region - Industry and wine', type: 'region', country_id: 'fr', latitude: 48.6998, longitude: 6.1878 },
      { id: 'fr-na', name: 'Nouvelle-Aquitaine', name_en: 'Nouvelle-Aquitaine', name_fr: 'Nouvelle-Aquitaine', name_es: 'Nueva Aquitania', name_ht: 'Nouvo Akiten', description: 'Southwest region - Wine and aerospace', type: 'region', country_id: 'fr', latitude: 45.7075, longitude: 0.1538 },
      { id: 'fr-occ', name: 'Occitanie', name_en: 'Occitanie', name_fr: 'Occitanie', name_es: 'Occitania', name_ht: 'Oksitani', description: 'Southern region - Tourism and agriculture', type: 'region', country_id: 'fr', latitude: 43.6047, longitude: 1.4442 },
      { id: 'fr-pac', name: 'Provence-Alpes-Côte d\'Azur', name_en: 'Provence-Alpes-Côte d\'Azur', name_fr: 'Provence-Alpes-Côte d\'Azur', name_es: 'Provenza-Alpes-Costa Azul', name_ht: 'Provans-Alp-Kot Lazur', description: 'Southeast region - Tourism and technology', type: 'region', country_id: 'fr', latitude: 43.2965, longitude: 5.3698 },
      { id: 'fr-nor', name: 'Normandie', name_en: 'Normandy', name_fr: 'Normandie', name_es: 'Normandía', name_ht: 'Normandi', description: 'Northern region - Agriculture and history', type: 'region', country_id: 'fr', latitude: 49.1829, longitude: -0.3707 },
      { id: 'fr-bre', name: 'Bretagne', name_en: 'Brittany', name_fr: 'Bretagne', name_es: 'Bretaña', name_ht: 'Bretay', description: 'Western region - Fishing and technology', type: 'region', country_id: 'fr', latitude: 48.2020, longitude: -2.9326 },
      { id: 'fr-pdl', name: 'Pays de la Loire', name_en: 'Pays de la Loire', name_fr: 'Pays de la Loire', name_es: 'Países del Loira', name_ht: 'Peyi de la Lwar', description: 'Western region - Agriculture and industry', type: 'region', country_id: 'fr', latitude: 47.4739, longitude: -0.5517 },
      { id: 'fr-cvl', name: 'Centre-Val de Loire', name_en: 'Centre-Val de Loire', name_fr: 'Centre-Val de Loire', name_es: 'Centro-Valle del Loira', name_ht: 'Sant-Val de Lwar', description: 'Central region - Agriculture and castles', type: 'region', country_id: 'fr', latitude: 47.7516, longitude: 1.6751 },
      { id: 'fr-bfc', name: 'Bourgogne-Franche-Comté', name_en: 'Burgundy-Franche-Comté', name_fr: 'Bourgogne-Franche-Comté', name_es: 'Borgoña-Franco Condado', name_ht: 'Bourgogn-Fransh-Konte', description: 'Eastern region - Wine and industry', type: 'region', country_id: 'fr', latitude: 47.2375, longitude: 6.0241 },
      { id: 'fr-cor', name: 'Corse', name_en: 'Corsica', name_fr: 'Corse', name_es: 'Córcega', name_ht: 'Kòs', description: 'Island region - Tourism and agriculture', type: 'region', country_id: 'fr', latitude: 42.0396, longitude: 9.0129 }
    ]
  },
  'MX': {
    country: {
      id: 'mx',
      code: 'MX',
      name_en: 'Mexico',
      name_fr: 'Mexique',
      name_es: 'México',
      name_ht: 'Meksik',
      currency_code: 'MXN',
      phone_code: '+52',
      created_at: new Date().toISOString()
    },
    subdivisions: [
      { id: 'mx-cmx', name: 'Mexico City', name_en: 'Mexico City', name_fr: 'Mexico', name_es: 'Ciudad de México', name_ht: 'Meksiko', description: 'Capital - Financial and cultural center', type: 'state', country_id: 'mx', latitude: 19.4326, longitude: -99.1332 },
      { id: 'mx-jal', name: 'Jalisco', name_en: 'Jalisco', name_fr: 'Jalisco', name_es: 'Jalisco', name_ht: 'Jalisco', description: 'Western state - Tequila and technology', type: 'state', country_id: 'mx', latitude: 20.6597, longitude: -103.3496 },
      { id: 'mx-nl', name: 'Nuevo León', name_en: 'Nuevo León', name_fr: 'Nouveau León', name_es: 'Nuevo León', name_ht: 'Nouvo Leon', description: 'Northern state - Industry and commerce', type: 'state', country_id: 'mx', latitude: 25.5921, longitude: -99.9962 },
      { id: 'mx-bc', name: 'Baja California', name_en: 'Baja California', name_fr: 'Basse-Californie', name_es: 'Baja California', name_ht: 'Baja Kalifòni', description: 'Northern border state - Tourism and industry', type: 'state', country_id: 'mx', latitude: 30.8406, longitude: -115.2838 },
      { id: 'mx-yuc', name: 'Yucatán', name_en: 'Yucatán', name_fr: 'Yucatán', name_es: 'Yucatán', name_ht: 'Yukatan', description: 'Southeast state - Mayan culture and tourism', type: 'state', country_id: 'mx', latitude: 20.7099, longitude: -89.0943 },
      { id: 'mx-ver', name: 'Veracruz', name_en: 'Veracruz', name_fr: 'Veracruz', name_es: 'Veracruz', name_ht: 'Verakruz', description: 'Gulf coast state - Oil and agriculture', type: 'state', country_id: 'mx', latitude: 19.1738, longitude: -96.1342 },
      { id: 'mx-pue', name: 'Puebla', name_en: 'Puebla', name_fr: 'Puebla', name_es: 'Puebla', name_ht: 'Puebla', description: 'Central state - Industry and textiles', type: 'state', country_id: 'mx', latitude: 19.0414, longitude: -98.2063 },
      { id: 'mx-gro', name: 'Guerrero', name_en: 'Guerrero', name_fr: 'Guerrero', name_es: 'Guerrero', name_ht: 'Gerewo', description: 'Pacific coast state - Tourism and agriculture', type: 'state', country_id: 'mx', latitude: 17.4392, longitude: -99.5451 },
      { id: 'mx-oax', name: 'Oaxaca', name_en: 'Oaxaca', name_fr: 'Oaxaca', name_es: 'Oaxaca', name_ht: 'Oaxaka', description: 'Southern state - Indigenous culture and crafts', type: 'state', country_id: 'mx', latitude: 17.0732, longitude: -96.7266 },
      { id: 'mx-chi', name: 'Chihuahua', name_en: 'Chihuahua', name_fr: 'Chihuahua', name_es: 'Chihuahua', name_ht: 'Chihuahua', description: 'Northern state - Mining and agriculture', type: 'state', country_id: 'mx', latitude: 28.6330, longitude: -106.0691 }
    ]
  },
  'BR': {
    country: {
      id: 'br',
      code: 'BR',
      name_en: 'Brazil',
      name_fr: 'Brésil',
      name_es: 'Brasil',
      name_ht: 'Brezil',
      currency_code: 'BRL',
      phone_code: '+55',
      created_at: new Date().toISOString()
    },
    subdivisions: [
      { id: 'br-sp', name: 'São Paulo', name_en: 'São Paulo', name_fr: 'São Paulo', name_es: 'São Paulo', name_ht: 'São Paulo', description: 'Financial and industrial center', type: 'state', country_id: 'br', latitude: -23.5505, longitude: -46.6333 },
      { id: 'br-rj', name: 'Rio de Janeiro', name_en: 'Rio de Janeiro', name_fr: 'Rio de Janeiro', name_es: 'Río de Janeiro', name_ht: 'Rio de Janeiro', description: 'Tourism and cultural hub', type: 'state', country_id: 'br', latitude: -22.9068, longitude: -43.1729 },
      { id: 'br-mg', name: 'Minas Gerais', name_en: 'Minas Gerais', name_fr: 'Minas Gerais', name_es: 'Minas Gerais', name_ht: 'Minas Gerais', description: 'Mining and agriculture state', type: 'state', country_id: 'br', latitude: -19.9167, longitude: -43.9345 },
      { id: 'br-ba', name: 'Bahia', name_en: 'Bahia', name_fr: 'Bahia', name_es: 'Bahía', name_ht: 'Bahia', description: 'Northeast state - Culture and tourism', type: 'state', country_id: 'br', latitude: -12.9777, longitude: -38.5016 },
      { id: 'br-pr', name: 'Paraná', name_en: 'Paraná', name_fr: 'Paraná', name_es: 'Paraná', name_ht: 'Parana', description: 'Southern state - Agriculture and industry', type: 'state', country_id: 'br', latitude: -25.4244, longitude: -49.2654 },
      { id: 'br-rs', name: 'Rio Grande do Sul', name_en: 'Rio Grande do Sul', name_fr: 'Rio Grande do Sul', name_es: 'Río Grande del Sur', name_ht: 'Rio Grande do Sul', description: 'Southernmost state - Agriculture and technology', type: 'state', country_id: 'br', latitude: -30.0346, longitude: -51.2177 },
      { id: 'br-pe', name: 'Pernambuco', name_en: 'Pernambuco', name_fr: 'Pernambuco', name_es: 'Pernambuco', name_ht: 'Pernambuko', description: 'Northeast state - Culture and commerce', type: 'state', country_id: 'br', latitude: -8.0476, longitude: -34.8770 },
      { id: 'br-ce', name: 'Ceará', name_en: 'Ceará', name_fr: 'Ceará', name_es: 'Ceará', name_ht: 'Seara', description: 'Northeast state - Tourism and agriculture', type: 'state', country_id: 'br', latitude: -3.7319, longitude: -38.5267 },
      { id: 'br-go', name: 'Goiás', name_en: 'Goiás', name_fr: 'Goiás', name_es: 'Goiás', name_ht: 'Goias', description: 'Central state - Agriculture and mining', type: 'state', country_id: 'br', latitude: -16.6864, longitude: -49.2643 },
      { id: 'br-pa', name: 'Pará', name_en: 'Pará', name_fr: 'Pará', name_es: 'Pará', name_ht: 'Para', description: 'Amazon state - Natural resources', type: 'state', country_id: 'br', latitude: -1.4558, longitude: -48.5044 },
      { id: 'br-am', name: 'Amazonas', name_en: 'Amazonas', name_fr: 'Amazonas', name_es: 'Amazonas', name_ht: 'Amazonas', description: 'Largest state - Amazon rainforest', type: 'state', country_id: 'br', latitude: -3.1190, longitude: -60.0217 },
      { id: 'br-mt', name: 'Mato Grosso', name_en: 'Mato Grosso', name_fr: 'Mato Grosso', name_es: 'Mato Grosso', name_ht: 'Mato Grosso', description: 'Central state - Agriculture and cattle', type: 'state', country_id: 'br', latitude: -15.6014, longitude: -56.0979 },
      { id: 'br-df', name: 'Distrito Federal', name_en: 'Federal District', name_fr: 'District Fédéral', name_es: 'Distrito Federal', name_ht: 'Distri Federal', description: 'Capital district - Government center', type: 'state', country_id: 'br', latitude: -15.7801, longitude: -47.9292 }
    ]
  }
};

export const getCountries = async (): Promise<Country[]> => {
  try {
    // Try to fetch from database first
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name_en', { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }

    // Fallback to static data
    return Object.values(GLOBAL_COUNTRY_DATA).map(item => item.country);
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Return static data as fallback
    return Object.values(GLOBAL_COUNTRY_DATA).map(item => item.country);
  }
};

export const getSubdivisionsByCountry = async (countryCode: string): Promise<GeographicSubdivision[]> => {
  try {
    // Try to fetch from database first
    const { data: departments, error: deptError } = await supabase
      .from('departments')
      .select('*')
      .eq('country_id', countryCode.toLowerCase())
      .order('name_en', { ascending: true });

    if (!deptError && departments && departments.length > 0) {
      return departments.map(dept => ({
        id: dept.id,
        name: dept.name_en,
        name_en: dept.name_en,
        name_fr: dept.name_fr,
        name_es: dept.name_es,
        name_ht: dept.name_ht,
        description: `${dept.name_en} - Administrative division`,
        type: 'department' as const,
        country_id: dept.country_id,
        latitude: dept.latitude,
        longitude: dept.longitude
      }));
    }

    // Fallback to static data
    const countryData = GLOBAL_COUNTRY_DATA[countryCode.toUpperCase()];
    return countryData ? countryData.subdivisions : [];
  } catch (error) {
    console.error('Error fetching subdivisions:', error);
    // Return static data as fallback
    const countryData = GLOBAL_COUNTRY_DATA[countryCode.toUpperCase()];
    return countryData ? countryData.subdivisions : [];
  }
};

export const getCountryByCode = (countryCode: string): Country | null => {
  const countryData = GLOBAL_COUNTRY_DATA[countryCode.toUpperCase()];
  return countryData ? countryData.country : null;
};

export const searchSubdivisions = (subdivisions: GeographicSubdivision[], query: string): GeographicSubdivision[] => {
  if (!query.trim()) return subdivisions;
  
  const lowercaseQuery = query.toLowerCase();
  return subdivisions.filter(subdivision => 
    subdivision.name_en.toLowerCase().includes(lowercaseQuery) ||
    subdivision.name_fr.toLowerCase().includes(lowercaseQuery) ||
    subdivision.name_es.toLowerCase().includes(lowercaseQuery) ||
    subdivision.name_ht.toLowerCase().includes(lowercaseQuery) ||
    (subdivision.description && subdivision.description.toLowerCase().includes(lowercaseQuery))
  );
};
