import { useLanguage } from '@/contexts/LanguageContext';

// Extended translations interface for all app content
interface AppTranslations {
  // Navigation
  dashboard: string;
  appointments: string;
  clients: string;
  messages: string;
  notifications: string;
  settings: string;
  profile: string;
  logout: string;
  backToDashboard: string;
  
  // Common actions
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  view: string;
  search: string;
  filter: string;
  clear: string;
  loading: string;
  saving: string;
  
  // Auth specific
  login: string;
  signUp: string;
  signIn: string;
  signingIn: string;
  createAccount: string;
  creatingAccount: string;
  enterEmail: string;
  enterPassword: string;
  password: string;
  enterFullName: string;
  selectAccountType: string;
  accountType: string;
  clientAccount: string;
  businessAccount: string;
  createPassword: string;
  loginFailed: string;
  welcomeBack: string;
  signInToAccount: string;
  joinBizli: string;
  chooseAccountType: string;
  createAccountType: string;
  verifyAccount: string;
  imAClient: string;
  findAndBookServices: string;
  imABusiness: string;
  offerServicesAndManage: string;
  businessProfile: string;
  manageBusinessInfo: string;
  saveChanges: string;
  adminDashboard: string;
  managePlatform: string;
  back: string;
  location: string;
  missingInformation: string;
  pleaseFillAllFields: string;
  enterPhoneNumber: string;
  paymentSetupOptional: string;
  
  // Settings
  profileInformation: string;
  businessInformation: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  preferredLanguage: string;
  notificationsSection: string;
  privacy: string;
  emailNotifications: string;
  smsNotifications: string;
  pushNotifications: string;
  appointmentReminders: string;
  paymentNotifications: string;
  profileVisibility: string;
  showEmail: string;
  showPhone: string;
  showAddress: string;
  public: string;
  private: string;
  friendsOnly: string;
  verifiedOnly: string;
  
  // Messages
  settingsSaved: string;
  settingsSaveError: string;
  emailCannotBeChanged: string;
  receiveNotificationsViaEmail: string;
  receiveNotificationsViaSMS: string;
  receivePushNotificationsInBrowser: string;
  sendRemindersToClients: string;
  notifyAboutPaymentsReceived: string;
  displayEmailOnProfile: string;
  displayPhoneOnProfile: string;
  displayAddressOnProfile: string;
  
  // Business specific
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessDescription: string;
  describeYourBusinessServices: string;
  
  // Services
  services: string;
  addService: string;
  addNewService: string;
  serviceName: string;
  serviceNamePlaceholder: string;
  serviceDescriptionPlaceholder: string;
  price: string;
  duration: string;
  noServicesYet: string;
  addFirstService: string;
  adding: string;
  quickStats: string;
  
  // Client specific
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  
  // Departments specific
  departments: string;
  myActiveDepartments: string;
  availableDepartments: string;
  selectCountry: string;
  searchDepartments: string;
  loadingDepartments: string;
  noDepartmentsYet: string;
  browseDepartmentsBelow: string;
  browseDepartments: string;
  viewBusinesses: string;
  joining: string;
  join: string;
  noResultsFound: string;
  noDepartmentsAvailable: string;
  tryDifferentSearch: string;
  selectDifferentCountry: string;
  clearSearch: string;
  businessesInMyDepartments: string;
  bookAppointment: string;
  detectingLocation: string;
  noSubdivisionsAvailable: string;
  subdivisionsComingSoon: string;
  
  // Messages specific
  loadingMessages: string;
  searchMessages: string;
  allMessages: string;
  messageAppointments: string;
  messagePromotions: string;
  messageSystem: string;
  messageBusinessReplies: string;
  messageGeneral: string;
  noMessagesFound: string;
  tryDifferentSearchMessages: string;
  noMessagesYet: string;
  selectAMessage: string;
  selectMessageToView: string;
  typeYourMessage: string;
  back: string;
  
  // Business onboarding specific
  businessInfo: string;
  contactAndMedia: string;
  paymentSetup: string;
  onboardingBusinessName: string;
  onboardingBusinessType: string;
  onboardingBusinessDescription: string;
  enterBusinessName: string;
  selectBusinessType: string;
  describeYourBusiness: string;
  enterFullAddress: string;
  businessMedia: string;
  businessLogo: string;
  coverPhoto: string;
  uploadLogo: string;
  uploadCoverPhoto: string;
  logoUploaded: string;
  coverUploaded: string;
  upload: string;
  stripePaymentLink: string;
  stripeLinkDescription: string;
  setupLater: string;
  paymentSetupLater: string;
  setupBusinessProfile: string;
  businessSetupDescription: string;
  step: string;
  of: string;
  previous: string;
  next: string;
  completing: string;
  completeSetup: string;
  setupComplete: string;
  businessProfileCreated: string;
  setupFailed: string;
  errorCreatingBusiness: string;
  uploadSuccess: string;
  fileUploadedSuccessfully: string;
  uploadFailed: string;
  uploadErrorTryAgain: string;
  pleaseLogin: string;
  login: string;

  // Activity History translations
  activityHistory: string;
  appointmentReports: string;
  moneySpent: string;
  frequentedBusinesses: string;
  totalAppointments: string;
  completedAppointments: string;
  cancelledAppointments: string;
  totalSpent: string;
  thisMonth: string;
  lastMonth: string;
  thisYear: string;
  averagePerAppointment: string;
  mostFrequented: string;
  totalVisits: string;
  lastVisit: string;
  favoriteCategory: string;
  spendingTrend: string;
  appointmentTrend: string;
  topBusinesses: string;
  recentActivity: string;
  noActivityYet: string;
  startBookingAppointments: string;
}

const translations: Record<string, AppTranslations> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    clients: 'Clients',
    messages: 'Messages',
    notifications: 'Notifications',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    backToDashboard: 'Back to Dashboard',
    
    // Common actions
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    loading: 'Loading...',
    saving: 'Saving...',
    
    // Auth specific
    login: 'Login',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    createAccount: 'Create Account',
    creatingAccount: 'Creating account...',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    password: 'Password',
    enterFullName: 'Enter your full name',
    selectAccountType: 'Select account type',
    accountType: 'Account Type',
    clientAccount: 'Client - Browse & Book Services',
    businessAccount: 'Business - Manage Services & Clients',
    createPassword: 'Create a password (min 6 characters)',
    loginFailed: 'Login failed. Please try again.',
    welcomeBack: 'Welcome Back',
    signInToAccount: 'Sign in to your account',
    joinBizli: 'Join Bizli Solution',
    chooseAccountType: 'Choose your account type to get started',
    createAccountType: 'Create your account',
    verifyAccount: 'Verify your account',
    imAClient: 'I\'m a Client',
    findAndBookServices: 'Find and book services from businesses',
    imABusiness: 'I\'m a Business',
    offerServicesAndManage: 'Offer services and manage my business',
    businessProfile: 'Business Profile',
    manageBusinessInfo: 'Manage your business information and location settings',
    saveChanges: 'Save Changes',
    adminDashboard: 'Admin Dashboard',
    managePlatform: 'Manage the entire platform',
    back: 'Back',
    location: 'Location',
    missingInformation: 'Missing Information',
    pleaseFillAllFields: 'Please fill in all required fields',
    enterPhoneNumber: 'Enter your phone number',
    paymentSetupOptional: 'Payment setup is optional and can be configured later',
    
    // Settings
    profileInformation: 'Profile Information',
    businessInformation: 'Business Information',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    address: 'Address',
    description: 'Description',
    preferredLanguage: 'Preferred Language',
    notificationsSection: 'Notifications',
    privacy: 'Privacy',
    emailNotifications: 'Email Notifications',
    smsNotifications: 'SMS Notifications',
    pushNotifications: 'Push Notifications',
    appointmentReminders: 'Appointment Reminders',
    paymentNotifications: 'Payment Notifications',
    profileVisibility: 'Profile Visibility',
    showEmail: 'Show Email',
    showPhone: 'Show Phone',
    showAddress: 'Show Address',
    public: 'Public',
    private: 'Private',
    friendsOnly: 'Friends Only',
    verifiedOnly: 'Verified Only',
    
    // Messages
    settingsSaved: 'Settings saved successfully',
    settingsSaveError: 'Failed to save settings. Please try again.',
    emailCannotBeChanged: 'Email cannot be changed',
    receiveNotificationsViaEmail: 'Receive notifications via email',
    receiveNotificationsViaSMS: 'Receive notifications via SMS',
    receivePushNotificationsInBrowser: 'Receive push notifications in browser',
    sendRemindersToClients: 'Send reminders to clients',
    notifyAboutPaymentsReceived: 'Notify about payments received',
    displayEmailOnProfile: 'Display email on profile',
    displayPhoneOnProfile: 'Display phone on profile',
    displayAddressOnProfile: 'Display address on profile',
    
    // Business specific
    businessName: 'Business Name',
    businessEmail: 'Business Email',
    businessPhone: 'Business Phone',
    businessAddress: 'Business Address',
    businessDescription: 'Business Description',
    describeYourBusinessServices: 'Describe your business services...',
    
    // Services
    services: 'Services',
    addService: 'Add Service',
    addNewService: 'Add New Service',
    serviceName: 'Service Name',
    serviceNamePlaceholder: 'e.g. Haircut',
    serviceDescriptionPlaceholder: 'Describe your service...',
    price: 'Price',
    duration: 'Duration',
    noServicesYet: 'No services yet',
    addFirstService: 'Add your first service to get started',
    adding: 'Adding...',
    quickStats: 'Quick Stats',
    
    // Client specific
    clientName: 'Client Name',
    clientEmail: 'Client Email',
    clientPhone: 'Client Phone',
    
    // Departments specific
    departments: 'Departments',
    myActiveDepartments: 'My Active Departments',
    availableDepartments: 'Available Departments',
    selectCountry: 'Select Country',
    searchDepartments: 'Search departments...',
    loadingDepartments: 'Loading departments...',
    noDepartmentsYet: 'No departments yet',
    browseDepartmentsBelow: 'Browse departments below to discover local businesses.',
    browseDepartments: 'Browse Departments',
    viewBusinesses: 'View Businesses',
    joining: 'Joining...',
    join: 'Join',
    noResultsFound: 'No results found',
    noDepartmentsAvailable: 'No departments available',
    tryDifferentSearch: 'Try a different search term or clear the search to see all departments.',
    selectDifferentCountry: 'Select a different country to see available departments.',
    clearSearch: 'Clear Search',
    businessesInMyDepartments: 'Businesses in My Departments',
    bookAppointment: 'Book Appointment',
    detectingLocation: 'Detecting location...',
    noSubdivisionsAvailable: 'No subdivisions available for this country yet.',
    subdivisionsComingSoon: 'We are working on adding subdivisions for this country. Please check back later or select a different country.',
    
    // Messages specific
    loadingMessages: 'Loading messages...',
    searchMessages: 'Search messages...',
    allMessages: 'All',
    messageAppointments: 'Appointments',
    messagePromotions: 'Promotions',
    messageSystem: 'System',
    messageBusinessReplies: 'Business Replies',
    messageGeneral: 'General',
    noMessagesFound: 'No messages found',
    tryDifferentSearchMessages: 'Try a different search term',
    noMessagesYet: 'You don\'t have any messages yet',
    selectAMessage: 'Select a message',
      selectMessageToView: 'Choose a message from the list to start a conversation',
      typeYourMessage: 'Type your message...',
    
    // Business onboarding specific
    businessInfo: 'Business Information',
    contactAndMedia: 'Contact & Media',
    paymentSetup: 'Payment Setup',
    onboardingBusinessName: 'Business Name',
    onboardingBusinessType: 'Business Type',
    onboardingBusinessDescription: 'Business Description',
    enterBusinessName: 'Enter your business name',
    selectBusinessType: 'Select your business type',
    describeYourBusiness: 'Describe your business, services, and what makes you unique',
    enterFullAddress: 'Enter your full business address',
    businessMedia: 'Business Media',
    businessLogo: 'Business Logo',
    coverPhoto: 'Cover Photo',
    uploadLogo: 'Upload your business logo',
    uploadCoverPhoto: 'Upload a cover photo',
    logoUploaded: 'Logo uploaded',
    coverUploaded: 'Cover photo uploaded',
    upload: 'Upload',
    stripePaymentLink: 'Stripe Payment Link',
    stripeLinkDescription: 'Add your Stripe payment link to accept online payments from clients.',
    setupLater: 'Setup Later',
    paymentSetupLater: 'You can always add payment processing later from your business settings.',
    setupBusinessProfile: 'Setup Your Business Profile',
    businessSetupDescription: 'Complete your business profile to start accepting appointments and growing your business.',
    step: 'Step',
    of: 'of',
    previous: 'Previous',
    next: 'Next',
    completing: 'Completing...',
    completeSetup: 'Complete Setup',
    setupComplete: 'Setup Complete!',
    businessProfileCreated: 'Your business profile has been created successfully.',
    setupFailed: 'Setup Failed',
    errorCreatingBusiness: 'Error creating business profile. Please try again.',
    uploadSuccess: 'Upload Successful',
    fileUploadedSuccessfully: 'File uploaded successfully',
    uploadFailed: 'Upload Failed',
    uploadErrorTryAgain: 'Failed to upload file. Please try again.',
    pleaseLogin: 'Please log in to continue',

    // Activity History
    activityHistory: 'Activity History',
    appointmentReports: 'Appointment Reports',
    moneySpent: 'Money Spent',
    frequentedBusinesses: 'Frequented Businesses',
    totalAppointments: 'Total Appointments',
    completedAppointments: 'Completed',
    cancelledAppointments: 'Cancelled',
    totalSpent: 'Total Spent',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    thisYear: 'This Year',
    averagePerAppointment: 'Average per Appointment',
    mostFrequented: 'Most Frequented',
    totalVisits: 'Total Visits',
    lastVisit: 'Last Visit',
    favoriteCategory: 'Favorite Category',
    spendingTrend: 'Spending Trend',
    appointmentTrend: 'Appointment Trend',
    topBusinesses: 'Top Businesses',
    recentActivity: 'Recent Activity',
    noActivityYet: 'No activity yet',
    startBookingAppointments: 'Start booking appointments to see your activity history',
  },
  
  fr: {
    // Navigation
    dashboard: 'Tableau de bord',
    appointments: 'Rendez-vous',
    clients: 'Clients',
    messages: 'Messages',
    notifications: 'Notifications',
    settings: 'Paramètres',
    profile: 'Profil',
    logout: 'Déconnexion',
    backToDashboard: 'Retour au tableau de bord',
    
    // Common actions
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    search: 'Rechercher',
    filter: 'Filtrer',
    clear: 'Effacer',
    loading: 'Chargement...',
    saving: 'Enregistrement...',
    
    // Auth specific
    login: 'Connexion',
    signUp: 'S\'inscrire',
    signIn: 'Se connecter',
    signingIn: 'Connexion en cours...',
    createAccount: 'Créer un compte',
    creatingAccount: 'Création du compte...',
    enterEmail: 'Entrez votre email',
    enterPassword: 'Entrez votre mot de passe',
    password: 'Mot de passe',
    enterFullName: 'Entrez votre nom complet',
    selectAccountType: 'Sélectionnez le type de compte',
    accountType: 'Type de compte',
    clientAccount: 'Client - Parcourir et réserver des services',
    businessAccount: 'Entreprise - Gérer les services et clients',
    createPassword: 'Créez un mot de passe (min 6 caractères)',
    loginFailed: 'Échec de la connexion. Veuillez réessayer.',
    welcomeBack: 'Bon retour',
    signInToAccount: 'Connectez-vous à votre compte',
    joinBizli: 'Rejoindre Bizli Solution',
    chooseAccountType: 'Choisissez votre type de compte pour commencer',
    createAccountType: 'Créez votre compte',
    verifyAccount: 'Vérifiez votre compte',
    imAClient: 'Je suis un Client',
    findAndBookServices: 'Trouvez et réservez des services auprès d\'entreprises',
    imABusiness: 'Je suis une Entreprise',
    offerServicesAndManage: 'Offrir des services et gérer mon entreprise',
    businessProfile: 'Profil d\'Entreprise',
    manageBusinessInfo: 'Gérez les informations de votre entreprise et les paramètres de localisation',
    saveChanges: 'Enregistrer les Modifications',
    adminDashboard: 'Tableau de Bord Admin',
    managePlatform: 'Gérer toute la plateforme',
    back: 'Retour',
    location: 'Localisation',
    missingInformation: 'Informations manquantes',
    pleaseFillAllFields: 'Veuillez remplir tous les champs requis',
    enterPhoneNumber: 'Entrez votre numéro de téléphone',
    paymentSetupOptional: 'La configuration du paiement est optionnelle et peut être configurée plus tard',
    
    // Settings
    profileInformation: 'Informations du profil',
    businessInformation: 'Informations de l\'entreprise',
    fullName: 'Nom complet',
    email: 'Email',
    phone: 'Numéro de téléphone',
    address: 'Adresse',
    description: 'Description',
    preferredLanguage: 'Langue préférée',
    notificationsSection: 'Notifications',
    privacy: 'Confidentialité',
    emailNotifications: 'Notifications par email',
    smsNotifications: 'Notifications par SMS',
    pushNotifications: 'Notifications push',
    appointmentReminders: 'Rappels de rendez-vous',
    paymentNotifications: 'Notifications de paiement',
    profileVisibility: 'Visibilité du profil',
    showEmail: 'Afficher l\'email',
    showPhone: 'Afficher le téléphone',
    showAddress: 'Afficher l\'adresse',
    public: 'Public',
    private: 'Privé',
    friendsOnly: 'Amis seulement',
    verifiedOnly: 'Vérifiés seulement',
    
    // Messages
    settingsSaved: 'Paramètres enregistrés avec succès',
    settingsSaveError: 'Échec de l\'enregistrement des paramètres. Veuillez réessayer.',
    emailCannotBeChanged: 'L\'email ne peut pas être modifié',
    receiveNotificationsViaEmail: 'Recevoir les notifications par email',
    receiveNotificationsViaSMS: 'Recevoir les notifications par SMS',
    receivePushNotificationsInBrowser: 'Recevoir les notifications push dans le navigateur',
    sendRemindersToClients: 'Envoyer des rappels aux clients',
    notifyAboutPaymentsReceived: 'Notifier des paiements reçus',
    displayEmailOnProfile: 'Afficher l\'email sur le profil',
    displayPhoneOnProfile: 'Afficher le téléphone sur le profil',
    displayAddressOnProfile: 'Afficher l\'adresse sur le profil',
    
    // Business specific
    businessName: 'Nom de l\'entreprise',
    businessEmail: 'Email de l\'entreprise',
    businessPhone: 'Téléphone de l\'entreprise',
    businessAddress: 'Adresse de l\'entreprise',
    businessDescription: 'Description de l\'entreprise',
    describeYourBusinessServices: 'Décrivez les services de votre entreprise...',
    
    // Services
    services: 'Services',
    addService: 'Ajouter un Service',
    addNewService: 'Ajouter un Nouveau Service',
    serviceName: 'Nom du Service',
    serviceNamePlaceholder: 'ex. Coupe de cheveux',
    serviceDescriptionPlaceholder: 'Décrivez votre service...',
    price: 'Prix',
    duration: 'Durée',
    noServicesYet: 'Aucun service pour le moment',
    addFirstService: 'Ajoutez votre premier service pour commencer',
    adding: 'Ajout en cours...',
    quickStats: 'Statistiques Rapides',
    
    // Client specific
    clientName: 'Nom du client',
    clientEmail: 'Email du client',
    clientPhone: 'Téléphone du client',
    
    // Departments specific
    departments: 'Départements',
    myActiveDepartments: 'Mes Départements Actifs',
    availableDepartments: 'Départements Disponibles',
    selectCountry: 'Sélectionner le Pays',
    searchDepartments: 'Rechercher des départements...',
    loadingDepartments: 'Chargement des départements...',
    noDepartmentsYet: 'Aucun département pour le moment',
    browseDepartmentsBelow: 'Parcourez les départements ci-dessous pour découvrir les entreprises locales.',
    browseDepartments: 'Parcourir les Départements',
    viewBusinesses: 'Voir les Entreprises',
    joining: 'Adhésion...',
    join: 'Rejoindre',
    noResultsFound: 'Aucun résultat trouvé',
    noDepartmentsAvailable: 'Aucun département disponible',
    tryDifferentSearch: 'Essayez un terme de recherche différent ou effacez la recherche pour voir tous les départements.',
    selectDifferentCountry: 'Sélectionnez un pays différent pour voir les départements disponibles.',
    clearSearch: 'Effacer la Recherche',
    businessesInMyDepartments: 'Entreprises dans Mes Départements',
    bookAppointment: 'Prendre Rendez-vous',
    detectingLocation: 'Détection de la localisation...',
    noSubdivisionsAvailable: 'Aucune subdivision disponible pour ce pays pour le moment.',
    subdivisionsComingSoon: 'Nous travaillons sur l\'ajout de subdivisions pour ce pays. Veuillez revenir plus tard ou sélectionner un autre pays.',
    
    // Messages specific
    loadingMessages: 'Chargement des messages...',
    searchMessages: 'Rechercher des messages...',
    allMessages: 'Tous',
    messageAppointments: 'Rendez-vous',
    messagePromotions: 'Promotions',
    messageSystem: 'Système',
    messageBusinessReplies: 'Réponses Business',
    messageGeneral: 'Général',
    noMessagesFound: 'Aucun message trouvé',
    tryDifferentSearchMessages: 'Essayez un terme de recherche différent',
    noMessagesYet: 'Vous n\'avez pas encore de messages',
    selectAMessage: 'Sélectionnez un message',
      selectMessageToView: 'Choisissez un message dans la liste pour commencer une conversation',
      typeYourMessage: 'Tapez votre message...',
    
    // Business onboarding specific
    businessInfo: 'Informations sur l\'entreprise',
    contactAndMedia: 'Contact et Médias',
    paymentSetup: 'Configuration des Paiements',
    onboardingBusinessName: 'Nom de l\'entreprise',
    onboardingBusinessType: 'Type d\'entreprise',
    onboardingBusinessDescription: 'Description de l\'entreprise',
    enterBusinessName: 'Entrez le nom de votre entreprise',
    selectBusinessType: 'Sélectionnez votre type d\'entreprise',
    describeYourBusiness: 'Décrivez votre entreprise, vos services et ce qui vous rend unique',
    enterFullAddress: 'Entrez votre adresse complète',
    businessMedia: 'Médias de l\'entreprise',
    businessLogo: 'Logo de l\'entreprise',
    coverPhoto: 'Photo de couverture',
    uploadLogo: 'Téléchargez le logo de votre entreprise',
    uploadCoverPhoto: 'Téléchargez une photo de couverture',
    logoUploaded: 'Logo téléchargé',
    coverUploaded: 'Photo de couverture téléchargée',
    upload: 'Télécharger',
    stripePaymentLink: 'Lien de Paiement Stripe',
    stripeLinkDescription: 'Ajoutez votre lien de paiement Stripe pour accepter les paiements en ligne des clients.',
    setupLater: 'Configuration Plus Tard',
    paymentSetupLater: 'Vous pouvez toujours ajouter le traitement des paiements plus tard depuis vos paramètres d\'entreprise.',
    setupBusinessProfile: 'Configurez Votre Profil d\'Entreprise',
    businessSetupDescription: 'Complétez votre profil d\'entreprise pour commencer à accepter les rendez-vous et développer votre entreprise.',
    step: 'Étape',
    of: 'de',
    previous: 'Précédent',
    next: 'Suivant',
    completing: 'Finalisation...',
    completeSetup: 'Terminer la Configuration',
    setupComplete: 'Configuration Terminée!',
    businessProfileCreated: 'Votre profil d\'entreprise a été créé avec succès.',
    setupFailed: 'Échec de la Configuration',
    errorCreatingBusiness: 'Erreur lors de la création du profil d\'entreprise. Veuillez réessayer.',
    uploadSuccess: 'Téléchargement Réussi',
    fileUploadedSuccessfully: 'Fichier téléchargé avec succès',
    uploadFailed: 'Échec du Téléchargement',
    uploadErrorTryAgain: 'Échec du téléchargement du fichier. Veuillez réessayer.',
    pleaseLogin: 'Veuillez vous connecter pour continuer',

    // Activity History
    activityHistory: 'Historique des Activités',
    appointmentReports: 'Rapports de Rendez-vous',
    moneySpent: 'Argent Dépensé',
    frequentedBusinesses: 'Entreprises Fréquentées',
    totalAppointments: 'Total des Rendez-vous',
    completedAppointments: 'Terminés',
    cancelledAppointments: 'Annulés',
    totalSpent: 'Total Dépensé',
    thisMonth: 'Ce Mois',
    lastMonth: 'Mois Dernier',
    thisYear: 'Cette Année',
    averagePerAppointment: 'Moyenne par Rendez-vous',
    mostFrequented: 'Plus Fréquenté',
    totalVisits: 'Total des Visites',
    lastVisit: 'Dernière Visite',
    favoriteCategory: 'Catégorie Préférée',
    spendingTrend: 'Tendance de Dépenses',
    appointmentTrend: 'Tendance des Rendez-vous',
    topBusinesses: 'Meilleures Entreprises',
    recentActivity: 'Activité Récente',
    noActivityYet: 'Aucune activité pour le moment',
    startBookingAppointments: 'Commencez à réserver des rendez-vous pour voir votre historique d\'activité',
  },
  
  es: {
    // Navigation
    dashboard: 'Panel de control',
    appointments: 'Citas',
    clients: 'Clientes',
    messages: 'Mensajes',
    notifications: 'Notificaciones',
    settings: 'Configuración',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    backToDashboard: 'Volver al panel',
    
    // Common actions
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    view: 'Ver',
    search: 'Buscar',
    filter: 'Filtrar',
    clear: 'Limpiar',
    loading: 'Cargando...',
    saving: 'Guardando...',
    
    // Auth specific
    login: 'Iniciar sesión',
    signUp: 'Registrarse',
    signIn: 'Iniciar sesión',
    signingIn: 'Iniciando sesión...',
    createAccount: 'Crear cuenta',
    creatingAccount: 'Creando cuenta...',
    enterEmail: 'Ingresa tu email',
    enterPassword: 'Ingresa tu contraseña',
    enterFullName: 'Ingresa tu nombre completo',
    selectAccountType: 'Selecciona el tipo de cuenta',
    clientAccount: 'Cliente - Explorar y reservar servicios',
    businessAccount: 'Negocio - Gestionar servicios y clientes',
    createPassword: 'Crea una contraseña (mín 6 caracteres)',
    loginFailed: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
    welcomeBack: 'Bienvenido de vuelta',
    signInToAccount: 'Inicia sesión en tu cuenta',
    joinBizli: 'Únete a Bizli Solution',
    chooseAccountType: 'Elige tu tipo de cuenta para comenzar',
    createAccountType: 'Crea tu cuenta',
    verifyAccount: 'Verifica tu cuenta',
    imAClient: 'Soy un Cliente',
    findAndBookServices: 'Encuentra y reserva servicios de negocios',
    imABusiness: 'Soy un Negocio',
    offerServicesAndManage: 'Ofrecer servicios y gestionar mi negocio',
    businessProfile: 'Perfil de Negocio',
    manageBusinessInfo: 'Gestiona la información de tu negocio y configuraciones de ubicación',
    saveChanges: 'Guardar Cambios',
    adminDashboard: 'Panel de Administración',
    managePlatform: 'Gestionar toda la plataforma',
    back: 'Atrás',
    
    // Settings
    profileInformation: 'Información del perfil',
    businessInformation: 'Información del negocio',
    fullName: 'Nombre completo',
    email: 'Email',
    phone: 'Número de teléfono',
    address: 'Dirección',
    description: 'Descripción',
    preferredLanguage: 'Idioma preferido',
    notificationsSection: 'Notificaciones',
    privacy: 'Privacidad',
    emailNotifications: 'Notificaciones por email',
    smsNotifications: 'Notificaciones por SMS',
    pushNotifications: 'Notificaciones push',
    appointmentReminders: 'Recordatorios de citas',
    paymentNotifications: 'Notificaciones de pago',
    profileVisibility: 'Visibilidad del perfil',
    showEmail: 'Mostrar email',
    showPhone: 'Mostrar teléfono',
    showAddress: 'Mostrar dirección',
    public: 'Público',
    private: 'Privado',
    friendsOnly: 'Solo amigos',
    verifiedOnly: 'Solo verificados',
    
    // Messages
    settingsSaved: 'Configuración guardada exitosamente',
    settingsSaveError: 'Error al guardar la configuración. Inténtalo de nuevo.',
    emailCannotBeChanged: 'El email no se puede cambiar',
    receiveNotificationsViaEmail: 'Recibir notificaciones por email',
    receiveNotificationsViaSMS: 'Recibir notificaciones por SMS',
    receivePushNotificationsInBrowser: 'Recibir notificaciones push en el navegador',
    sendRemindersToClients: 'Enviar recordatorios a clientes',
    notifyAboutPaymentsReceived: 'Notificar sobre pagos recibidos',
    displayEmailOnProfile: 'Mostrar email en el perfil',
    displayPhoneOnProfile: 'Mostrar teléfono en el perfil',
    displayAddressOnProfile: 'Mostrar dirección en el perfil',
    
    // Business specific
    businessName: 'Nombre del negocio',
    businessEmail: 'Email del negocio',
    businessPhone: 'Teléfono del negocio',
    businessAddress: 'Dirección del negocio',
    businessDescription: 'Descripción del negocio',
    describeYourBusinessServices: 'Describe los servicios de tu negocio...',
    
    // Services
    services: 'Servicios',
    addService: 'Agregar Servicio',
    addNewService: 'Agregar Nuevo Servicio',
    serviceName: 'Nombre del Servicio',
    serviceNamePlaceholder: 'ej. Corte de cabello',
    serviceDescriptionPlaceholder: 'Describe tu servicio...',
    price: 'Precio',
    duration: 'Duración',
    noServicesYet: 'Aún no hay servicios',
    addFirstService: 'Agrega tu primer servicio para comenzar',
    adding: 'Agregando...',
    quickStats: 'Estadísticas Rápidas',
    
    // Client specific
    clientName: 'Nombre del cliente',
    clientEmail: 'Email del cliente',
    clientPhone: 'Teléfono del cliente',
    
    // Departments specific
    departments: 'Departamentos',
    myActiveDepartments: 'Mis Departamentos Activos',
    availableDepartments: 'Departamentos Disponibles',
    selectCountry: 'Seleccionar País',
    searchDepartments: 'Buscar departamentos...',
    loadingDepartments: 'Cargando departamentos...',
    noDepartmentsYet: 'Aún no hay departamentos',
    browseDepartmentsBelow: 'Explora los departamentos a continuación para descubrir negocios locales.',
    browseDepartments: 'Explorar Departamentos',
    viewBusinesses: 'Ver Negocios',
    joining: 'Uniéndose...',
    join: 'Unirse',
    noResultsFound: 'No se encontraron resultados',
    noDepartmentsAvailable: 'No hay departamentos disponibles',
    tryDifferentSearch: 'Intenta un término de búsqueda diferente o borra la búsqueda para ver todos los departamentos.',
    selectDifferentCountry: 'Selecciona un país diferente para ver los departamentos disponibles.',
    clearSearch: 'Borrar Búsqueda',
    businessesInMyDepartments: 'Negocios en Mis Departamentos',
    bookAppointment: 'Reservar Cita',
    detectingLocation: 'Detectando ubicación...',
    noSubdivisionsAvailable: 'No hay subdivisiones disponibles para este país aún.',
    subdivisionsComingSoon: 'Estamos trabajando en agregar subdivisiones para este país. Por favor, vuelve más tarde o selecciona un país diferente.',
    
    // Messages specific
    loadingMessages: 'Cargando mensajes...',
    searchMessages: 'Buscar mensajes...',
    allMessages: 'Todos',
    messageAppointments: 'Citas',
    messagePromotions: 'Promociones',
    messageSystem: 'Sistema',
    messageBusinessReplies: 'Respuestas de Negocios',
    messageGeneral: 'General',
    noMessagesFound: 'No se encontraron mensajes',
    tryDifferentSearchMessages: 'Intenta un término de búsqueda diferente',
    noMessagesYet: 'Aún no tienes mensajes',
    selectAMessage: 'Selecciona un mensaje',
      selectMessageToView: 'Elige un mensaje de la lista para comenzar una conversación',
      typeYourMessage: 'Escribe tu mensaje...',
    
    // Business onboarding specific
    businessInfo: 'Información del Negocio',
    contactAndMedia: 'Contacto y Medios',
    paymentSetup: 'Configuración de Pagos',
    onboardingBusinessName: 'Nombre del Negocio',
    onboardingBusinessType: 'Tipo de Negocio',
    onboardingBusinessDescription: 'Descripción del Negocio',
    enterBusinessName: 'Ingresa el nombre de tu negocio',
    selectBusinessType: 'Selecciona tu tipo de negocio',
    describeYourBusiness: 'Describe tu negocio, servicios y lo que te hace único',
    enterFullAddress: 'Ingresa tu dirección completa',
    businessMedia: 'Medios del Negocio',
    businessLogo: 'Logo del Negocio',
    coverPhoto: 'Foto de Portada',
    uploadLogo: 'Sube el logo de tu negocio',
    uploadCoverPhoto: 'Sube una foto de portada',
    logoUploaded: 'Logo subido',
    coverUploaded: 'Foto de portada subida',
    upload: 'Subir',
    stripePaymentLink: 'Enlace de Pago Stripe',
    stripeLinkDescription: 'Agrega tu enlace de pago Stripe para aceptar pagos en línea de clientes.',
    setupLater: 'Configurar Más Tarde',
    paymentSetupLater: 'Siempre puedes agregar el procesamiento de pagos más tarde desde la configuración de tu negocio.',
    setupBusinessProfile: 'Configura tu Perfil de Negocio',
    businessSetupDescription: 'Completa tu perfil de negocio para comenzar a aceptar citas y hacer crecer tu negocio.',
    step: 'Paso',
    of: 'de',
    previous: 'Anterior',
    next: 'Siguiente',
    completing: 'Completando...',
    completeSetup: 'Completar Configuración',
    setupComplete: '¡Configuración Completa!',
    businessProfileCreated: 'Tu perfil de negocio ha sido creado exitosamente.',
    setupFailed: 'Error en la Configuración',
    errorCreatingBusiness: 'Error al crear el perfil de negocio. Por favor, inténtalo de nuevo.',
    uploadSuccess: 'Subida Exitosa',
    fileUploadedSuccessfully: 'Archivo subido exitosamente',
    uploadFailed: 'Error en la Subida',
    uploadErrorTryAgain: 'Error al subir el archivo. Por favor, inténtalo de nuevo.',
    pleaseLogin: 'Por favor, inicia sesión para continuar',

    // Activity History
    activityHistory: 'Historial de Actividades',
    appointmentReports: 'Reportes de Citas',
    moneySpent: 'Dinero Gastado',
    frequentedBusinesses: 'Negocios Frecuentados',
    totalAppointments: 'Total de Citas',
    completedAppointments: 'Completadas',
    cancelledAppointments: 'Canceladas',
    totalSpent: 'Total Gastado',
    thisMonth: 'Este Mes',
    lastMonth: 'Mes Pasado',
    thisYear: 'Este Año',
    averagePerAppointment: 'Promedio por Cita',
    mostFrequented: 'Más Frecuentado',
    totalVisits: 'Total de Visitas',
    lastVisit: 'Última Visita',
    favoriteCategory: 'Categoría Favorita',
    spendingTrend: 'Tendencia de Gastos',
    appointmentTrend: 'Tendencia de Citas',
    topBusinesses: 'Mejores Negocios',
    recentActivity: 'Actividad Reciente',
    noActivityYet: 'Aún no hay actividad',
    startBookingAppointments: 'Comienza a reservar citas para ver tu historial de actividad',
  },
  
  ht: {
    // Navigation
    dashboard: 'Tablèt',
    appointments: 'Randezvou',
    clients: 'Kliyan',
    messages: 'Mesaj',
    notifications: 'Notifikasyon',
    settings: 'Paramèt',
    profile: 'Pwofil',
    logout: 'Dekonekte',
    backToDashboard: 'Tounen nan tablèt',
    
    // Common actions
    save: 'Sove',
    cancel: 'Anile',
    edit: 'Modifye',
    delete: 'Efase',
    view: 'Gade',
    search: 'Chèche',
    filter: 'Filtre',
    clear: 'Netwaye',
    loading: 'Chaje...',
    saving: 'Sove...',
    
    // Auth specific
    login: 'Konekte',
    signUp: 'Enskri',
    signIn: 'Konekte',
    signingIn: 'Ap konekte...',
    createAccount: 'Kreye kont',
    creatingAccount: 'Ap kreye kont...',
    enterEmail: 'Antre email ou',
    enterPassword: 'Antre modpas ou',
    enterFullName: 'Antre non konplè ou',
    selectAccountType: 'Chwazi kalite kont',
    clientAccount: 'Kliyan - Browse ak rezève sèvis',
    businessAccount: 'Biznis - Jere sèvis ak kliyan',
    createPassword: 'Kreye modpas (min 6 karaktè)',
    loginFailed: 'Koneksyon echwe. Tanpri eseye ankò.',
    welcomeBack: 'Byenveni tounen',
    signInToAccount: 'Konekte nan kont ou',
    joinBizli: 'Antre nan Bizli Solution',
    chooseAccountType: 'Chwazi kalite kont ou pou kòmanse',
    createAccountType: 'Kreye kont ou',
    verifyAccount: 'Verifye kont ou',
    imAClient: 'Mwen se yon Kliyan',
    findAndBookServices: 'Jwenn ak rezève sèvis nan biznis',
    imABusiness: 'Mwen se yon Biznis',
    offerServicesAndManage: 'Ofri sèvis ak jere biznis mwen',
    businessProfile: 'Pwofil Biznis',
    manageBusinessInfo: 'Jere enfòmasyon biznis ou ak paramèt kote',
    saveChanges: 'Sove Chanjman',
    adminDashboard: 'Tablo Admin',
    managePlatform: 'Jere tout platfòm nan',
    back: 'Tounen',
    
    // Settings
    profileInformation: 'Enfòmasyon pwofil',
    businessInformation: 'Enfòmasyon biznis',
    fullName: 'Non konplè',
    email: 'Email',
    phone: 'Nimewo telefòn',
    address: 'Adrès',
    description: 'Deskripsyon',
    preferredLanguage: 'Lang prefere',
    notificationsSection: 'Notifikasyon',
    privacy: 'Vie prive',
    emailNotifications: 'Notifikasyon email',
    smsNotifications: 'Notifikasyon SMS',
    pushNotifications: 'Notifikasyon push',
    appointmentReminders: 'Rapèl randezvou',
    paymentNotifications: 'Notifikasyon peman',
    profileVisibility: 'Vizibilite pwofil',
    showEmail: 'Montre email',
    showPhone: 'Montre telefòn',
    showAddress: 'Montre adrès',
    public: 'Piblik',
    private: 'Prive',
    friendsOnly: 'Zanmi sèlman',
    verifiedOnly: 'Verifye sèlman',
    
    // Messages
    settingsSaved: 'Paramèt sove avèk siksè',
    settingsSaveError: 'Echwe pou sove paramèt. Tanpri eseye ankò.',
    emailCannotBeChanged: 'Email pa ka chanje',
    receiveNotificationsViaEmail: 'Resevwa notifikasyon pa email',
    receiveNotificationsViaSMS: 'Resevwa notifikasyon pa SMS',
    receivePushNotificationsInBrowser: 'Resevwa notifikasyon push nan navigatè',
    sendRemindersToClients: 'Voye rapèl bay kliyan',
    notifyAboutPaymentsReceived: 'Notifye sou peman resevwa',
    displayEmailOnProfile: 'Montre email sou pwofil',
    displayPhoneOnProfile: 'Montre telefòn sou pwofil',
    displayAddressOnProfile: 'Montre adrès sou pwofil',
    
    // Business specific
    businessName: 'Non biznis',
    businessEmail: 'Email biznis',
    businessPhone: 'Telefòn biznis',
    businessAddress: 'Adrès biznis',
    businessDescription: 'Deskripsyon biznis',
    describeYourBusinessServices: 'Dekri sèvis biznis ou yo...',
    
    // Services
    services: 'Sèvis',
    addService: 'Ajoute Sèvis',
    addNewService: 'Ajoute Nouvo Sèvis',
    serviceName: 'Non Sèvis',
    serviceNamePlaceholder: 'egz. Koupe cheve',
    serviceDescriptionPlaceholder: 'Dekri sèvis ou a...',
    price: 'Pri',
    duration: 'Dire',
    noServicesYet: 'Pa gen sèvis ankò',
    addFirstService: 'Ajoute premye sèvis ou a pou kòmanse',
    adding: 'Ap ajoute...',
    quickStats: 'Estatistik rapid',
    
    // Client specific
    clientName: 'Non kliyan',
    clientEmail: 'Email kliyan',
    clientPhone: 'Telefòn kliyan',
    
    // Departments specific
    departments: 'Depatman',
    myActiveDepartments: 'Depatman Aktif Mwen Yo',
    availableDepartments: 'Depatman Disponib',
    selectCountry: 'Chwazi Peyi',
    searchDepartments: 'Chèche depatman...',
    loadingDepartments: 'Chaje depatman...',
    noDepartmentsYet: 'Pa gen depatman ankò',
    browseDepartmentsBelow: 'Pase nan depatman yo anba a pou dekouvri biznis lokal yo.',
    browseDepartments: 'Pase nan Depatman',
    viewBusinesses: 'Gade Biznis',
    joining: 'Antre...',
    join: 'Antre',
    noResultsFound: 'Pa jwenn rezilta',
    noDepartmentsAvailable: 'Pa gen depatman disponib',
    tryDifferentSearch: 'Eseye yon lòt mo rechèch oswa efase rechèch la pou wè tout depatman yo.',
    selectDifferentCountry: 'Chwazi yon lòt peyi pou wè depatman disponib yo.',
    clearSearch: 'Efase Rechèch',
    businessesInMyDepartments: 'Biznis nan Depatman Mwen Yo',
    bookAppointment: 'Rezève Randevou',
    detectingLocation: 'Detekte kote w ye...',
    noSubdivisionsAvailable: 'Pa gen soudivizyon disponib pou peyi sa a ankò.',
    subdivisionsComingSoon: 'Nou ap travay pou ajoute soudivizyon pou peyi sa a. Tanpri tounen pita oswa chwazi yon lòt peyi.',
    
    // Messages specific
    loadingMessages: 'Chaje mesaj...',
    searchMessages: 'Chèche mesaj...',
    allMessages: 'Tout',
    messageAppointments: 'Randevou',
    messagePromotions: 'Pwomosyon',
    messageSystem: 'Sistèm',
    messageBusinessReplies: 'Repons Biznis',
    messageGeneral: 'Jeneral',
    noMessagesFound: 'Pa jwenn mesaj',
    tryDifferentSearchMessages: 'Eseye yon lòt mo rechèch',
    noMessagesYet: 'Ou pa gen mesaj ankò',
    selectAMessage: 'Chwazi yon mesaj',
      selectMessageToView: 'Chwazi yon mesaj nan lis la pou kòmanse yon konvèsasyon',
      typeYourMessage: 'Tape mesaj ou...',
    
    // Business onboarding specific
    businessInfo: 'Enfòmasyon Biznis',
    contactAndMedia: 'Kontak ak Medya',
    paymentSetup: 'Konfigirasyon Peman',
    onboardingBusinessName: 'Non Biznis',
    onboardingBusinessType: 'Kalite Biznis',
    onboardingBusinessDescription: 'Deskripsyon Biznis',
    enterBusinessName: 'Antre non biznis ou',
    selectBusinessType: 'Chwazi kalite biznis ou',
    describeYourBusiness: 'Dekri biznis ou, sèvis yo, ak sa ki fè ou diferan',
    enterFullAddress: 'Antre adrès konplè ou',
    businessMedia: 'Medya Biznis',
    businessLogo: 'Logo Biznis',
    coverPhoto: 'Foto Kouvèti',
    uploadLogo: 'Telechaje logo biznis ou',
    uploadCoverPhoto: 'Telechaje yon foto kouvèti',
    logoUploaded: 'Logo telechaje',
    coverUploaded: 'Foto kouvèti telechaje',
    upload: 'Telechaje',
    stripePaymentLink: 'Lyen Peman Stripe',
    stripeLinkDescription: 'Ajoute lyen peman Stripe ou pou aksepte peman sou entènèt nan men kliyan yo.',
    setupLater: 'Konfigire Pita',
    paymentSetupLater: 'Ou ka toujou ajoute tretman peman pita nan paramèt biznis ou.',
    setupBusinessProfile: 'Konfigire Pwofil Biznis Ou',
    businessSetupDescription: 'Konplete pwofil biznis ou pou kòmanse aksepte randevou epi fè biznis ou grandi.',
    step: 'Etap',
    of: 'nan',
    previous: 'Anvan',
    next: 'Apre',
    completing: 'Finalize...',
    completeSetup: 'Konplete Konfigirasyon',
    setupComplete: 'Konfigirasyon Konplete!',
    businessProfileCreated: 'Pwofil biznis ou te kreye avèk siksè.',
    setupFailed: 'Konfigirasyon Echwe',
    errorCreatingBusiness: 'Erè nan kreye pwofil biznis. Tanpri eseye ankò.',
    uploadSuccess: 'Telechajman Reyisi',
    fileUploadedSuccessfully: 'Fichye telechaje avèk siksè',
    uploadFailed: 'Telechajman Echwe',
    uploadErrorTryAgain: 'Echwe nan telechaje fichye a. Tanpri eseye ankò.',
    pleaseLogin: 'Tanpri konekte pou kontinye',

    // Activity History
    activityHistory: 'Istorik Aktivite',
    appointmentReports: 'Rapò Randevou',
    moneySpent: 'Lajan Depanse',
    frequentedBusinesses: 'Biznis Fwokante',
    totalAppointments: 'Total Randevou',
    completedAppointments: 'Konplete',
    cancelledAppointments: 'Anile',
    totalSpent: 'Total Depanse',
    thisMonth: 'Mwa Sa a',
    lastMonth: 'Mwa Pase',
    thisYear: 'Ane Sa a',
    averagePerAppointment: 'Mwayèn pou Chak Randevou',
    mostFrequented: 'Pi Fwokante',
    totalVisits: 'Total Vizit',
    lastVisit: 'Dènye Vizit',
    favoriteCategory: 'Kategori Favori',
    spendingTrend: 'Tandans Depans',
    appointmentTrend: 'Tandans Randevou',
    topBusinesses: 'Pi Bon Biznis',
    recentActivity: 'Aktivite Resan',
    noActivityYet: 'Pa gen aktivite ankò',
    startBookingAppointments: 'Kòmanse rezève randevou pou wè istorik aktivite ou',
  }
};

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language] || translations.en;
};