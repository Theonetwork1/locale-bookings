// Route configuration for role-based access control
export const ROUTES = {
  // Public routes (no authentication required)
  PUBLIC: {
    HOME: '/',
    AUTH: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    LEGAL: '/legal'
  },
  
  // Client routes (client role required)
  CLIENT: {
    DASHBOARD: '/client-dashboard',
    APPOINTMENTS: '/client/appointments',
    MESSAGES: '/client/messages',
    PROFILE: '/client/profile',
    SETTINGS: '/client/settings'
  },
  
  // Business routes (business role required)
  BUSINESS: {
    DASHBOARD: '/business-dashboard',
    APPOINTMENTS: '/business/appointments',
    CLIENTS: '/business/clients',
    SERVICES: '/business/services',
    ANALYTICS: '/business/analytics',
    MESSAGES: '/business/messages',
    PROFILE: '/business/profile',
    SETTINGS: '/business/settings',
    ONBOARDING: '/business/onboarding'
  },
  
  // Admin routes (admin role required)
  ADMIN: {
    DASHBOARD: '/admin-dashboard',
    BUSINESSES: '/admin/businesses',
    USERS: '/admin/users',
    TEAM: '/admin/team-management',
    MESSAGES: '/admin/messages',
    NOTIFICATIONS: '/admin/notifications',
    SETTINGS: '/admin/settings',
    ANALYTICS: '/admin/analytics'
  }
} as const;

// Role-based route mapping
export const ROLE_ROUTES = {
  client: ROUTES.CLIENT.DASHBOARD,
  business: ROUTES.BUSINESS.DASHBOARD,
  admin: ROUTES.ADMIN.DASHBOARD
} as const;

// Routes that require specific roles
export const PROTECTED_ROUTES = {
  [ROUTES.CLIENT.DASHBOARD]: ['client'],
  [ROUTES.CLIENT.APPOINTMENTS]: ['client'],
  [ROUTES.CLIENT.MESSAGES]: ['client'],
  [ROUTES.CLIENT.PROFILE]: ['client'],
  [ROUTES.CLIENT.SETTINGS]: ['client'],
  
  [ROUTES.BUSINESS.DASHBOARD]: ['business'],
  [ROUTES.BUSINESS.APPOINTMENTS]: ['business'],
  [ROUTES.BUSINESS.CLIENTS]: ['business'],
  [ROUTES.BUSINESS.SERVICES]: ['business'],
  [ROUTES.BUSINESS.ANALYTICS]: ['business'],
  [ROUTES.BUSINESS.MESSAGES]: ['business'],
  [ROUTES.BUSINESS.PROFILE]: ['business'],
  [ROUTES.BUSINESS.SETTINGS]: ['business'],
  [ROUTES.BUSINESS.ONBOARDING]: ['business'],
  
  [ROUTES.ADMIN.DASHBOARD]: ['admin'],
  [ROUTES.ADMIN.BUSINESSES]: ['admin'],
  [ROUTES.ADMIN.USERS]: ['admin'],
  [ROUTES.ADMIN.TEAM]: ['admin'],
  [ROUTES.ADMIN.MESSAGES]: ['admin'],
  [ROUTES.ADMIN.NOTIFICATIONS]: ['admin'],
  [ROUTES.ADMIN.SETTINGS]: ['admin'],
  [ROUTES.ADMIN.ANALYTICS]: ['admin']
} as const;

// Helper function to check if a route requires authentication
export const isProtectedRoute = (path: string): boolean => {
  return Object.keys(PROTECTED_ROUTES).some(route => path.startsWith(route));
};

// Helper function to get required roles for a route
export const getRequiredRoles = (path: string): string[] => {
  for (const [route, roles] of Object.entries(PROTECTED_ROUTES)) {
    if (path.startsWith(route)) {
      return roles;
    }
  }
  return [];
};

// Helper function to check if user has access to a route
export const hasRouteAccess = (userRole: string, path: string): boolean => {
  const requiredRoles = getRequiredRoles(path);
  return requiredRoles.includes(userRole);
};
