import { UserRole } from '@/contexts/AuthContext';

// Server-side role validation middleware
export interface RoleValidationResult {
  isValid: boolean;
  error?: string;
  userRole?: UserRole;
}

// Validate user role for specific routes
export const validateUserRole = async (
  userEmail: string,
  requiredRole: UserRole | 'admin',
  userToken?: string
): Promise<RoleValidationResult> => {
  try {
    // In a real implementation, this would:
    // 1. Verify the JWT token with Supabase
    // 2. Check user role in database
    // 3. Validate admin access for admin routes
    
    // For now, we'll implement basic validation
    if (!userEmail) {
      return { isValid: false, error: 'User email is required' };
    }

    // Check admin access
    if (requiredRole === 'admin') {
      const adminEmails = ['admin@bizli.com', 'administrator@bizli.com'];
      if (!adminEmails.includes(userEmail.toLowerCase())) {
        return { 
          isValid: false, 
          error: 'Access denied. Admin privileges not granted for this account.' 
        };
      }
      return { isValid: true, userRole: 'admin' as UserRole };
    }

    // For client/business roles, validate against database
    // This would typically involve a database query
    return { isValid: true, userRole: requiredRole as UserRole };
    
  } catch (error) {
    console.error('Role validation error:', error);
    return { 
      isValid: false, 
      error: 'Role validation failed' 
    };
  }
};

// Route protection middleware
export const protectRoute = (requiredRole: UserRole | 'admin') => {
  return async (req: any, res: any, next: any) => {
    try {
      const userEmail = req.user?.email;
      const userToken = req.headers.authorization?.replace('Bearer ', '');

      if (!userEmail) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const validation = await validateUserRole(userEmail, requiredRole, userToken);
      
      if (!validation.isValid) {
        return res.status(403).json({ error: validation.error });
      }

      req.userRole = validation.userRole;
      next();
    } catch (error) {
      console.error('Route protection error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};
