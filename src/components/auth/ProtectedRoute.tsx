'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectTo = '/dashboard' 
}: ProtectedRouteProps) {
  // const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (requireAuth && !isAuthenticated) {
  //       // User is not authenticated but trying to access protected route
  //       router.push('/login');
  //     } else if (!requireAuth && isAuthenticated) {
  //       // User is authenticated but trying to access public route (like login)
  //       router.push(redirectTo);
  //     }
  //   }
  // }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // // Show loading spinner while checking authentication
  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  // // If user is authenticated and trying to access login page, don't render anything
  // if (!requireAuth && isAuthenticated) {
  //   return null;
  // }

  // // If user is not authenticated and trying to access protected route, don't render anything
  // if (requireAuth && !isAuthenticated) {
  //   return null;
  // }

  // Render the protected content
  return <>{children}</>;
}
