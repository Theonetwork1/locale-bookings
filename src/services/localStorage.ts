// Local storage service for user preferences
export interface UserPreferences {
  selectedCountry: string;
  selectedLanguage: string;
  lastVisit: string;
}

const STORAGE_KEYS = {
  USER_PREFERENCES: 'bizli_user_preferences',
  SELECTED_COUNTRY: 'bizli_selected_country',
  SELECTED_LANGUAGE: 'bizli_selected_language'
};

export const getUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error reading user preferences from localStorage:', error);
  }

  // Default preferences
  return {
    selectedCountry: 'HT', // Default to Haiti
    selectedLanguage: 'en',
    lastVisit: new Date().toISOString()
  };
};

export const setUserPreferences = (preferences: Partial<UserPreferences>): void => {
  try {
    const current = getUserPreferences();
    const updated = { ...current, ...preferences, lastVisit: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
  } catch (error) {
    console.warn('Error saving user preferences to localStorage:', error);
  }
};

export const getSelectedCountry = (): string => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_COUNTRY);
    return stored || 'HT'; // Default to Haiti
  } catch (error) {
    console.warn('Error reading selected country from localStorage:', error);
    return 'HT';
  }
};

export const setSelectedCountry = (countryCode: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_COUNTRY, countryCode);
    setUserPreferences({ selectedCountry: countryCode });
  } catch (error) {
    console.warn('Error saving selected country to localStorage:', error);
  }
};

export const getSelectedLanguage = (): string => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_LANGUAGE);
    return stored || 'en'; // Default to English
  } catch (error) {
    console.warn('Error reading selected language from localStorage:', error);
    return 'en';
  }
};

export const setSelectedLanguage = (language: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_LANGUAGE, language);
    setUserPreferences({ selectedLanguage: language });
  } catch (error) {
    console.warn('Error saving selected language to localStorage:', error);
  }
};

export const clearUserPreferences = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_COUNTRY);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_LANGUAGE);
  } catch (error) {
    console.warn('Error clearing user preferences from localStorage:', error);
  }
};
