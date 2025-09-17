import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ht' | 'es';

interface Translations {
  // Navigation
  services: string;
  pricing: string;
  overview: string;
  resources: string;
  signIn: string;
  getStarted: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  startFreeTrial: string;
  learnMore: string;
  monthlyPrice: string;
  yearlyPrice: string;
  
  // Pricing Section
  pricingTitle: string;
  pricingSubtitle: string;
  freeTrial: string;
  freeTrialDesc: string;
  monthlyPlan: string;
  monthlyPlanDesc: string;
  yearlyPlan: string;
  yearlyPlanDesc: string;
  mostPopular: string;
  bestValue: string;
  pricingFooter: string;
  
  // Features
  fullPlatformAccess: string;
  upTo20Bookings: string;
  basicCustomerMgmt: string;
  emailNotifications: string;
  standardSupport: string;
  unlimitedBookings: string;
  advancedCustomerMgmt: string;
  smsEmailNotifications: string;
  paymentProcessing: string;
  customBranding: string;
  analyticsDashboard: string;
  prioritySupport: string;
  allFeaturesMonthly: string;
  advancedIntegrations: string;
  dedicatedAccountManager: string;
  customFeatures: string;
  phoneSupport247: string;
  
  // Footer
  phone: string;
  email: string;
  privacyPolicy: string;
  contact: string;
  allRightsReserved: string;
  
  // Demo Section
  experiencePlatform: string;
  experienceDesc: string;
  viewDemoDashboard: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    services: 'Services',
    pricing: 'Pricing', 
    overview: 'Overview',
    resources: 'Resources',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    
    // Hero Section
    heroTitle: 'Streamline Your Local Business with Bizli Solution',
    heroSubtitle: 'Since 2013, we\'ve guided millions of local businesses on their digital success journey!',
    startFreeTrial: 'Start Free Trial',
    learnMore: 'Learn More',
    monthlyPrice: '$57.97/mo',
    yearlyPrice: '$665.64/year',
    
    // Pricing Section
    pricingTitle: 'Simple, Transparent Pricing',
    pricingSubtitle: 'Choose the perfect plan for your business. All plans include our core features with no hidden fees.',
    freeTrial: 'Free Trial',
    freeTrialDesc: 'Perfect to get started',
    monthlyPlan: 'Monthly Plan',
    monthlyPlanDesc: 'Ideal for service providers of all sizes',
    yearlyPlan: 'Yearly Plan',
    yearlyPlanDesc: 'Best value – 1 month free included',
    mostPopular: 'Most Popular',
    bestValue: 'Best Value',
    pricingFooter: 'All plans include 24/7 customer support and a 30-day money-back guarantee.',
    
    // Features
    fullPlatformAccess: 'Full platform access',
    upTo20Bookings: 'Up to 20 bookings',
    basicCustomerMgmt: 'Basic customer management',
    emailNotifications: 'Email notifications',
    standardSupport: 'Standard support',
    unlimitedBookings: 'Unlimited bookings',
    advancedCustomerMgmt: 'Advanced customer management',
    smsEmailNotifications: 'SMS & Email notifications',
    paymentProcessing: 'Payment processing',
    customBranding: 'Custom branding',
    analyticsDashboard: 'Analytics dashboard',
    prioritySupport: 'Priority support',
    allFeaturesMonthly: 'All features in Monthly',
    advancedIntegrations: 'Advanced integrations',
    dedicatedAccountManager: 'Dedicated account manager',
    customFeatures: 'Custom features',
    phoneSupport247: '24/7 phone support',
    
    // Footer
    phone: 'Phone: +1 774 506 9615',
    email: 'Email: contact@bizlisolution.com',
    privacyPolicy: 'Privacy Policy',
    contact: 'Contact',
    allRightsReserved: 'All rights reserved.',
    
    // Demo Section
    experiencePlatform: 'Experience the Platform',
    experienceDesc: 'Take a look at our admin dashboard and see how Bizli Solution can transform your business operations.',
    viewDemoDashboard: 'View Demo Dashboard'
  },
  fr: {
    // Navigation
    services: 'Services',
    pricing: 'Tarifs',
    overview: 'Aperçu',
    resources: 'Ressources',
    signIn: 'Se Connecter',
    getStarted: 'Commencer',
    
    // Hero Section
    heroTitle: 'Optimisez Votre Entreprise Locale avec Bizli Solution',
    heroSubtitle: 'Depuis 2013, nous avons guidé des millions d\'entreprises locales vers le succès numérique!',
    startFreeTrial: 'Essai Gratuit',
    learnMore: 'En Savoir Plus',
    monthlyPrice: '57,97$/mois',
    yearlyPrice: '665,64$/an',
    
    // Pricing Section
    pricingTitle: 'Tarifs Simples et Transparents',
    pricingSubtitle: 'Choisissez le plan parfait pour votre entreprise. Tous les plans incluent nos fonctionnalités principales sans frais cachés.',
    freeTrial: 'Essai Gratuit',
    freeTrialDesc: 'Parfait pour commencer',
    monthlyPlan: 'Plan Mensuel',
    monthlyPlanDesc: 'Idéal pour les prestataires de services de toutes tailles',
    yearlyPlan: 'Plan Annuel',
    yearlyPlanDesc: 'Meilleure valeur – 1 mois gratuit inclus',
    mostPopular: 'Plus Populaire',
    bestValue: 'Meilleure Valeur',
    pricingFooter: 'Tous les plans incluent un support client 24/7 et une garantie de remboursement de 30 jours.',
    
    // Features
    fullPlatformAccess: 'Accès complet à la plateforme',
    upTo20Bookings: 'Jusqu\'à 20 réservations',
    basicCustomerMgmt: 'Gestion client de base',
    emailNotifications: 'Notifications par email',
    standardSupport: 'Support standard',
    unlimitedBookings: 'Réservations illimitées',
    advancedCustomerMgmt: 'Gestion client avancée',
    smsEmailNotifications: 'Notifications SMS et Email',
    paymentProcessing: 'Traitement des paiements',
    customBranding: 'Image de marque personnalisée',
    analyticsDashboard: 'Tableau de bord analytique',
    prioritySupport: 'Support prioritaire',
    allFeaturesMonthly: 'Toutes les fonctionnalités du plan Mensuel',
    advancedIntegrations: 'Intégrations avancées',
    dedicatedAccountManager: 'Gestionnaire de compte dédié',
    customFeatures: 'Fonctionnalités personnalisées',
    phoneSupport247: 'Support téléphonique 24/7',
    
    // Footer
    phone: 'Téléphone: +1 774 506 9615',
    email: 'Email: contact@bizlisolution.com',
    privacyPolicy: 'Politique de Confidentialité',
    contact: 'Contact',
    allRightsReserved: 'Tous droits réservés.',
    
    // Demo Section
    experiencePlatform: 'Découvrez la Plateforme',
    experienceDesc: 'Jetez un œil à notre tableau de bord administrateur et voyez comment Bizli Solution peut transformer vos opérations commerciales.',
    viewDemoDashboard: 'Voir le Tableau de Bord Démo'
  },
  es: {
    // Navigation
    services: 'Servicios',
    pricing: 'Precios',
    overview: 'Resumen',
    resources: 'Recursos',
    signIn: 'Iniciar Sesión',
    getStarted: 'Comenzar',
    
    // Hero Section
    heroTitle: 'Optimiza Tu Negocio Local con Bizli Solution',
    heroSubtitle: '¡Desde 2013, hemos guiado a millones de negocios locales en su viaje hacia el éxito digital!',
    startFreeTrial: 'Prueba Gratuita',
    learnMore: 'Saber Más',
    monthlyPrice: '$57.97/mes',
    yearlyPrice: '$665.64/año',
    
    // Pricing Section
    pricingTitle: 'Precios Simples y Transparentes',
    pricingSubtitle: 'Elige el plan perfecto para tu negocio. Todos los planes incluyen nuestras características principales sin tarifas ocultas.',
    freeTrial: 'Prueba Gratuita',
    freeTrialDesc: 'Perfecto para empezar',
    monthlyPlan: 'Plan Mensual',
    monthlyPlanDesc: 'Ideal para proveedores de servicios de todos los tamaños',
    yearlyPlan: 'Plan Anual',
    yearlyPlanDesc: 'Mejor valor – 1 mes gratis incluido',
    mostPopular: 'Más Popular',
    bestValue: 'Mejor Valor',
    pricingFooter: 'Todos los planes incluyen soporte al cliente 24/7 y una garantía de devolución de dinero de 30 días.',
    
    // Features
    fullPlatformAccess: 'Acceso completo a la plataforma',
    upTo20Bookings: 'Hasta 20 reservas',
    basicCustomerMgmt: 'Gestión básica de clientes',
    emailNotifications: 'Notificaciones por email',
    standardSupport: 'Soporte estándar',
    unlimitedBookings: 'Reservas ilimitadas',
    advancedCustomerMgmt: 'Gestión avanzada de clientes',
    smsEmailNotifications: 'Notificaciones SMS y Email',
    paymentProcessing: 'Procesamiento de pagos',
    customBranding: 'Marca personalizada',
    analyticsDashboard: 'Panel de análisis',
    prioritySupport: 'Soporte prioritario',
    allFeaturesMonthly: 'Todas las características del plan Mensual',
    advancedIntegrations: 'Integraciones avanzadas',
    dedicatedAccountManager: 'Gerente de cuenta dedicado',
    customFeatures: 'Características personalizadas',
    phoneSupport247: 'Soporte telefónico 24/7',
    
    // Footer
    phone: 'Teléfono: +1 774 506 9615',
    email: 'Email: contact@bizlisolution.com',
    privacyPolicy: 'Política de Privacidad',
    contact: 'Contacto',
    allRightsReserved: 'Todos los derechos reservados.',
    
    // Demo Section
    experiencePlatform: 'Experimenta la Plataforma',
    experienceDesc: 'Echa un vistazo a nuestro panel de administración y ve cómo Bizli Solution puede transformar las operaciones de tu negocio.',
    viewDemoDashboard: 'Ver Panel de Demostración'
  },
  ht: {
    // Navigation
    services: 'Sèvis',
    pricing: 'Pri',
    overview: 'Apèsi',
    resources: 'Resous',
    signIn: 'Konekte',
    getStarted: 'Kòmanse',
    
    // Hero Section
    heroTitle: 'Optimize Biznis Lokal Ou ak Bizli Solution',
    heroSubtitle: 'Depi 2013, nou te gide dè milyon biznis lokal nan vwayaj siksè dijital yo!',
    startFreeTrial: 'Eseye Gratis',
    learnMore: 'Aprann Plis',
    monthlyPrice: '$57.97/mwa',
    yearlyPrice: '$665.64/ane',
    
    // Pricing Section
    pricingTitle: 'Pri Senp ak Transparan',
    pricingSubtitle: 'Chwazi plan ki pafè pou biznis ou. Tout plan yo genyen karakteristik prensipal nou yo san frè kache.',
    freeTrial: 'Eseye Gratis',
    freeTrialDesc: 'Pafè pou kòmanse',
    monthlyPlan: 'Plan Mwa',
    monthlyPlanDesc: 'Ideal pou founisè sèvis nan tout gwosè',
    yearlyPlan: 'Plan Ane',
    yearlyPlanDesc: 'Pi bon valè – 1 mwa gratis enkli',
    mostPopular: 'Pi Popilè',
    bestValue: 'Pi Bon Valè',
    pricingFooter: 'Tout plan yo genyen sipò kliyan 24/7 ak garanti rembousman 30 jou.',
    
    // Features
    fullPlatformAccess: 'Aksè konplè nan platfòm nan',
    upTo20Bookings: 'Jiska 20 rezèvasyon',
    basicCustomerMgmt: 'Jesyon kliyan debaz',
    emailNotifications: 'Notifikasyon email',
    standardSupport: 'Sipò estanda',
    unlimitedBookings: 'Rezèvasyon san limit',
    advancedCustomerMgmt: 'Jesyon kliyan avanse',
    smsEmailNotifications: 'Notifikasyon SMS ak Email',
    paymentProcessing: 'Tretman peman',
    customBranding: 'Mak pèsonalize',
    analyticsDashboard: 'Tablèt analiz',
    prioritySupport: 'Sipò priyorite',
    allFeaturesMonthly: 'Tout karakteristik nan plan Mwa',
    advancedIntegrations: 'Entegrasyon avanse',
    dedicatedAccountManager: 'Manadjè kont dedye',
    customFeatures: 'Karakteristik pèsonalize',
    phoneSupport247: 'Sipò telefòn 24/7',
    
    // Footer
    phone: 'Telefòn: +1 774 506 9615',
    email: 'Email: contact@bizlisolution.com',
    privacyPolicy: 'Règleman Konfidansyalite',
    contact: 'Kontak',
    allRightsReserved: 'Tout dwa rezève.',
    
    // Demo Section
    experiencePlatform: 'Eksperyans Platfòm nan',
    experienceDesc: 'Gade tablèt administrateur nou an epi wè kijan Bizli Solution ka transfòme operasyon biznis ou yo.',
    viewDemoDashboard: 'Gade Tablèt Demo'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

// Create context with a default value to prevent undefined errors
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    console.error('useLanguage must be used within a LanguageProvider');
    // Return default English translations as fallback
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: translations.en,
    };
  }
  return context;
}