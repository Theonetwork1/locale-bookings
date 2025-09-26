// Server-side authentication middleware
// This would typically be implemented as a Supabase Edge Function or Next.js middleware

import { createClient } from '@supabase/supabase-js';
import { ROUTES, hasRouteAccess } from '@/config/routes';

// This is a placeholder for server-side implementation
// In a real application, this would be implemented as:
// 1. Supabase Edge Function
// 2. Next.js middleware
// 3. Express.js middleware
// 4. Or similar server-side solution

export interface AuthMiddlewareRequest {
  headers: {
    authorization?: string;
    cookie?: string;
  };
  url: string;
  method: string;
}

export interface AuthMiddlewareResponse {
  status: number;
  headers?: Record<string, string>;
  body?: any;
}

export interface UserSession {
  user: {
    id: string;
    email: string;
    role: 'client' | 'business' | 'admin';
  };
  access_token: string;
}

// Server-side role validation
export const validateUserRole = async (
  request: AuthMiddlewareRequest
): Promise<UserSession | null> => {
  try {
    // Extract token from Authorization header or cookies
    const token = extractToken(request);
    if (!token) {
      return null;
    }

    // Initialize Supabase client with service role key for server-side operations
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Verify the JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return null;
    }

    // Get user profile from database to verify role
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, email, role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return null;
    }

    // Additional admin validation
    if (profile.role === 'admin') {
      const adminEmails = [
        'admin@bizli.com',
        'administrator@bizli.com'
      ];
      
      if (!adminEmails.includes(profile.email.toLowerCase())) {
        return null;
      }
    }

    return {
      user: {
        id: profile.id,
        email: profile.email,
        role: profile.role as 'client' | 'business' | 'admin'
      },
      access_token: token
    };

  } catch (error) {
    console.error('Auth middleware error:', error);
    return null;
  }
};

// Extract token from request
const extractToken = (request: AuthMiddlewareRequest): string | null => {
  // Try Authorization header first
  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookies as fallback
  const cookies = request.headers.cookie;
  if (cookies) {
    const tokenMatch = cookies.match(/sb-[^=]+-auth-token=([^;]+)/);
    if (tokenMatch) {
      try {
        const tokenData = JSON.parse(decodeURIComponent(tokenMatch[1]));
        return tokenData.access_token;
      } catch (error) {
        console.error('Error parsing auth token from cookie:', error);
      }
    }
  }

  return null;
};

// Main middleware function
export const authMiddleware = async (
  request: AuthMiddlewareRequest
): Promise<AuthMiddlewareResponse> => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Skip middleware for public routes
  const publicRoutes = Object.values(ROUTES.PUBLIC);
  if (publicRoutes.some(route => path === route || path.startsWith(route + '/'))) {
    return { status: 200 };
  }

  // Validate user session
  const session = await validateUserRole(request);
  if (!session) {
    return {
      status: 401,
      headers: {
        'Location': '/auth'
      }
    };
  }

  // Check if user has access to the requested route
  if (!hasRouteAccess(session.user.role, path)) {
    return {
      status: 403,
      headers: {
        'Location': '/unauthorized'
      }
    };
  }

  // Add user info to request headers for downstream handlers
  return {
    status: 200,
    headers: {
      'X-User-ID': session.user.id,
      'X-User-Email': session.user.email,
      'X-User-Role': session.user.role
    }
  };
};

// Example usage in different frameworks:

// Supabase Edge Function
export const supabaseEdgeFunction = async (req: Request) => {
  const request: AuthMiddlewareRequest = {
    headers: {
      authorization: req.headers.get('authorization') || undefined,
      cookie: req.headers.get('cookie') || undefined
    },
    url: req.url,
    method: req.method
  };

  const response = await authMiddleware(request);
  
  if (response.status !== 200) {
    return new Response(null, {
      status: response.status,
      headers: response.headers
    });
  }

  // Continue with the actual request
  return new Response('OK', { status: 200 });
};

// Next.js middleware
export const nextjsMiddleware = async (req: any) => {
  const request: AuthMiddlewareRequest = {
    headers: {
      authorization: req.headers.get('authorization') || undefined,
      cookie: req.headers.get('cookie') || undefined
    },
    url: req.url,
    method: req.method
  };

  const response = await authMiddleware(request);
  
  if (response.status !== 200) {
    return new Response(null, {
      status: response.status,
      headers: response.headers
    });
  }

  return null; // Continue to the page
};
