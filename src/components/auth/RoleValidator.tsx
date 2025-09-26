import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAdminUser } from '@/contexts/AuthContext';
import { ROUTES, hasRouteAccess } from '@/config/routes';

interface RoleValidatorProps {
  children: React.ReactNode;
  requiredRole?: 'client' | 'business' | 'admin';
}

export const RoleValidator: React.FC<RoleValidatorProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateRole = async () => {
      if (loading) return;
      
      if (!user) {
        navigate('/auth');
        return;
      }

      // Validate admin access
      if (requiredRole === 'admin') {
        if (!isAdminUser(user.email)) {
          console.error('Access denied: Admin privileges not granted');
          navigate('/unauthorized');
          return;
        }
      }

      // Check if user has access to the current route
      if (!hasRouteAccess(user.role, location.pathname)) {
        console.error(`Access denied: User role ${user.role} cannot access ${location.pathname}`);
        // Redirect to appropriate dashboard based on user's role
        switch (user.role) {
          case 'admin':
            navigate(ROUTES.ADMIN.DASHBOARD);
            return;
          case 'business':
            navigate(ROUTES.BUSINESS.DASHBOARD);
            return;
          case 'client':
          default:
            navigate(ROUTES.CLIENT.DASHBOARD);
            return;
        }
      }

      // Validate role match
      if (requiredRole && user.role !== requiredRole) {
        console.error(`Access denied: Required role ${requiredRole}, user has ${user.role}`);
        // Redirect to appropriate dashboard based on user's role
        switch (user.role) {
          case 'admin':
            navigate(ROUTES.ADMIN.DASHBOARD);
            return;
          case 'business':
            navigate(ROUTES.BUSINESS.DASHBOARD);
            return;
          case 'client':
          default:
            navigate(ROUTES.CLIENT.DASHBOARD);
            return;
        }
      }

      setIsValidating(false);
    };

    validateRole();
  }, [user, loading, requiredRole, navigate, location]);

  if (loading || isValidating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-muted-foreground">Validating access...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
