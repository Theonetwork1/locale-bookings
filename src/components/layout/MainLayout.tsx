import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  // Hide layout on landing, auth, and onboarding pages
  const hideLayoutPaths = ['/', '/login', '/register', '/business-subscription-setup'];
  if (hideLayoutPaths.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto container mx-auto px-3 sm:px-6 py-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
