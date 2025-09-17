// Comprehensive location data for countries, states/regions, and cities
// This data structure supports the business onboarding form

export interface Country {
  code: string;
  name: string;
  states: State[];
}

export interface State {
  code: string;
  name: string;
  cities: City[];
}

export interface City {
  name: string;
  postalCode?: string;
}

export const locationData: Country[] = [
  {
    code: 'HT',
    name: 'Haiti',
    states: [
      {
        code: 'AR',
        name: 'Artibonite',
        cities: [
          { name: 'Gonaïves', postalCode: 'HT4110' },
          { name: 'Saint-Marc', postalCode: 'HT4310' },
          { name: 'Verrettes', postalCode: 'HT4210' },
          { name: 'Dessalines', postalCode: 'HT4410' },
          { name: 'Petite-Rivière-de-l\'Artibonite', postalCode: 'HT4510' }
        ]
      },
      {
        code: 'CE',
        name: 'Centre',
        cities: [
          { name: 'Hinche', postalCode: 'HT5110' },
          { name: 'Mirebalais', postalCode: 'HT5210' },
          { name: 'Boucan-Carré', postalCode: 'HT5310' },
          { name: 'Cerca-la-Source', postalCode: 'HT5410' }
        ]
      },
      {
        code: 'GA',
        name: 'Grand\'Anse',
        cities: [
          { name: 'Jérémie', postalCode: 'HT7110' },
          { name: 'Anse-d\'Hainault', postalCode: 'HT7210' },
          { name: 'Dame-Marie', postalCode: 'HT7310' },
          { name: 'Les Irois', postalCode: 'HT7410' }
        ]
      },
      {
        code: 'NI',
        name: 'Nippes',
        cities: [
          { name: 'Miragoâne', postalCode: 'HT7510' },
          { name: 'Baradères', postalCode: 'HT7610' },
          { name: 'Petit-Trou-de-Nippes', postalCode: 'HT7710' }
        ]
      },
      {
        code: 'ND',
        name: 'Nord',
        cities: [
          { name: 'Cap-Haïtien', postalCode: 'HT1110' },
          { name: 'Limbé', postalCode: 'HT1210' },
          { name: 'Plaisance', postalCode: 'HT1310' },
          { name: 'Acul-du-Nord', postalCode: 'HT1410' }
        ]
      },
      {
        code: 'NE',
        name: 'Nord-Est',
        cities: [
          { name: 'Fort-Liberté', postalCode: 'HT2110' },
          { name: 'Ouanaminthe', postalCode: 'HT2210' },
          { name: 'Trou-du-Nord', postalCode: 'HT2310' }
        ]
      },
      {
        code: 'NO',
        name: 'Nord-Ouest',
        cities: [
          { name: 'Port-de-Paix', postalCode: 'HT3110' },
          { name: 'Môle-Saint-Nicolas', postalCode: 'HT3210' },
          { name: 'Jean-Rabel', postalCode: 'HT3310' }
        ]
      },
      {
        code: 'OU',
        name: 'Ouest',
        cities: [
          { name: 'Port-au-Prince', postalCode: 'HT6110' },
          { name: 'Carrefour', postalCode: 'HT6210' },
          { name: 'Delmas', postalCode: 'HT6310' },
          { name: 'Pétion-Ville', postalCode: 'HT6410' },
          { name: 'Cité Soleil', postalCode: 'HT6510' },
          { name: 'Tabarre', postalCode: 'HT6610' }
        ]
      },
      {
        code: 'SD',
        name: 'Sud',
        cities: [
          { name: 'Les Cayes', postalCode: 'HT8110' },
          { name: 'Aquin', postalCode: 'HT8210' },
          { name: 'Cavaillon', postalCode: 'HT8310' },
          { name: 'Chantal', postalCode: 'HT8410' }
        ]
      },
      {
        code: 'SE',
        name: 'Sud-Est',
        cities: [
          { name: 'Jacmel', postalCode: 'HT9110' },
          { name: 'Bainet', postalCode: 'HT9210' },
          { name: 'Belle-Anse', postalCode: 'HT9310' },
          { name: 'Côtes-de-Fer', postalCode: 'HT9410' }
        ]
      }
    ]
  },
  {
    code: 'US',
    name: 'United States',
    states: [
      {
        code: 'CA',
        name: 'California',
        cities: [
          { name: 'Los Angeles', postalCode: '90210' },
          { name: 'San Francisco', postalCode: '94102' },
          { name: 'San Diego', postalCode: '92101' },
          { name: 'Sacramento', postalCode: '95814' },
          { name: 'San Jose', postalCode: '95110' }
        ]
      },
      {
        code: 'NY',
        name: 'New York',
        cities: [
          { name: 'New York City', postalCode: '10001' },
          { name: 'Buffalo', postalCode: '14201' },
          { name: 'Rochester', postalCode: '14604' },
          { name: 'Albany', postalCode: '12207' },
          { name: 'Syracuse', postalCode: '13202' }
        ]
      },
      {
        code: 'FL',
        name: 'Florida',
        cities: [
          { name: 'Miami', postalCode: '33101' },
          { name: 'Orlando', postalCode: '32801' },
          { name: 'Tampa', postalCode: '33602' },
          { name: 'Jacksonville', postalCode: '32202' },
          { name: 'Fort Lauderdale', postalCode: '33301' }
        ]
      },
      {
        code: 'TX',
        name: 'Texas',
        cities: [
          { name: 'Houston', postalCode: '77001' },
          { name: 'Dallas', postalCode: '75201' },
          { name: 'Austin', postalCode: '78701' },
          { name: 'San Antonio', postalCode: '78201' },
          { name: 'Fort Worth', postalCode: '76101' }
        ]
      }
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    states: [
      {
        code: 'ON',
        name: 'Ontario',
        cities: [
          { name: 'Toronto', postalCode: 'M5H 2N2' },
          { name: 'Ottawa', postalCode: 'K1A 0A6' },
          { name: 'Hamilton', postalCode: 'L8P 4X3' },
          { name: 'London', postalCode: 'N6A 3K7' },
          { name: 'Windsor', postalCode: 'N9A 6T3' }
        ]
      },
      {
        code: 'QC',
        name: 'Quebec',
        cities: [
          { name: 'Montreal', postalCode: 'H1A 0A1' },
          { name: 'Quebec City', postalCode: 'G1A 0A1' },
          { name: 'Laval', postalCode: 'H7A 0A1' },
          { name: 'Gatineau', postalCode: 'J8X 0A1' },
          { name: 'Longueuil', postalCode: 'J4H 0A1' }
        ]
      },
      {
        code: 'BC',
        name: 'British Columbia',
        cities: [
          { name: 'Vancouver', postalCode: 'V6B 1A1' },
          { name: 'Victoria', postalCode: 'V8W 1P1' },
          { name: 'Surrey', postalCode: 'V3T 0A1' },
          { name: 'Burnaby', postalCode: 'V5A 1A1' },
          { name: 'Richmond', postalCode: 'V6V 1A1' }
        ]
      }
    ]
  },
  {
    code: 'FR',
    name: 'France',
    states: [
      {
        code: 'IDF',
        name: 'Île-de-France',
        cities: [
          { name: 'Paris', postalCode: '75001' },
          { name: 'Boulogne-Billancourt', postalCode: '92100' },
          { name: 'Saint-Denis', postalCode: '93200' },
          { name: 'Argenteuil', postalCode: '95100' },
          { name: 'Montreuil', postalCode: '93100' }
        ]
      },
      {
        code: 'PACA',
        name: 'Provence-Alpes-Côte d\'Azur',
        cities: [
          { name: 'Marseille', postalCode: '13001' },
          { name: 'Nice', postalCode: '06000' },
          { name: 'Toulon', postalCode: '83000' },
          { name: 'Aix-en-Provence', postalCode: '13100' },
          { name: 'Avignon', postalCode: '84000' }
        ]
      },
      {
        code: 'ARA',
        name: 'Auvergne-Rhône-Alpes',
        cities: [
          { name: 'Lyon', postalCode: '69001' },
          { name: 'Grenoble', postalCode: '38000' },
          { name: 'Saint-Étienne', postalCode: '42000' },
          { name: 'Clermont-Ferrand', postalCode: '63000' },
          { name: 'Annecy', postalCode: '74000' }
        ]
      }
    ]
  },
  {
    code: 'BR',
    name: 'Brazil',
    states: [
      {
        code: 'SP',
        name: 'São Paulo',
        cities: [
          { name: 'São Paulo', postalCode: '01000-000' },
          { name: 'Guarulhos', postalCode: '07000-000' },
          { name: 'Campinas', postalCode: '13000-000' },
          { name: 'São Bernardo do Campo', postalCode: '09700-000' },
          { name: 'Santo André', postalCode: '09000-000' }
        ]
      },
      {
        code: 'RJ',
        name: 'Rio de Janeiro',
        cities: [
          { name: 'Rio de Janeiro', postalCode: '20000-000' },
          { name: 'São Gonçalo', postalCode: '24400-000' },
          { name: 'Duque de Caxias', postalCode: '25000-000' },
          { name: 'Nova Iguaçu', postalCode: '26000-000' },
          { name: 'Niterói', postalCode: '24000-000' }
        ]
      },
      {
        code: 'MG',
        name: 'Minas Gerais',
        cities: [
          { name: 'Belo Horizonte', postalCode: '30000-000' },
          { name: 'Uberlândia', postalCode: '38400-000' },
          { name: 'Contagem', postalCode: '32000-000' },
          { name: 'Juiz de Fora', postalCode: '36000-000' },
          { name: 'Betim', postalCode: '32600-000' }
        ]
      }
    ]
  },
  {
    code: 'MX',
    name: 'Mexico',
    states: [
      {
        code: 'CMX',
        name: 'Ciudad de México',
        cities: [
          { name: 'Mexico City', postalCode: '01000' },
          { name: 'Iztapalapa', postalCode: '09000' },
          { name: 'Gustavo A. Madero', postalCode: '07000' },
          { name: 'Álvaro Obregón', postalCode: '01000' },
          { name: 'Coyoacán', postalCode: '04000' }
        ]
      },
      {
        code: 'JAL',
        name: 'Jalisco',
        cities: [
          { name: 'Guadalajara', postalCode: '44100' },
          { name: 'Zapopan', postalCode: '45000' },
          { name: 'Tlaquepaque', postalCode: '45500' },
          { name: 'Tonalá', postalCode: '45400' },
          { name: 'Puerto Vallarta', postalCode: '48300' }
        ]
      },
      {
        code: 'NLE',
        name: 'Nuevo León',
        cities: [
          { name: 'Monterrey', postalCode: '64000' },
          { name: 'Guadalupe', postalCode: '67100' },
          { name: 'San Nicolás de los Garza', postalCode: '66400' },
          { name: 'Apodaca', postalCode: '66600' },
          { name: 'Escobedo', postalCode: '66000' }
        ]
      }
    ]
  }
];

// Helper functions for location data
export const getCountries = (): Country[] => {
  return locationData;
};

export const getStatesByCountry = (countryCode: string): State[] => {
  const country = locationData.find(c => c.code === countryCode);
  return country ? country.states : [];
};

export const getCitiesByState = (countryCode: string, stateCode: string): City[] => {
  const country = locationData.find(c => c.code === countryCode);
  if (!country) return [];
  
  const state = country.states.find(s => s.code === stateCode);
  return state ? state.cities : [];
};

export const getCountryByCode = (countryCode: string): Country | undefined => {
  return locationData.find(c => c.code === countryCode);
};

export const getStateByCode = (countryCode: string, stateCode: string): State | undefined => {
  const country = getCountryByCode(countryCode);
  if (!country) return undefined;
  
  return country.states.find(s => s.code === stateCode);
};
