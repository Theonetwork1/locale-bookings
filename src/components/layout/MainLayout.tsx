import { ReactNode, useState, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface MainLayoutProps {
  children: ReactNode;
}

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within MainLayout');
  }
  return context;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Hide layout on landing, auth, onboarding, and legal pages
  const hideLayoutPaths = ['/', '/login', '/register', '/business-subscription-setup', '/business-onboarding', '/test', '/legal', '/terms-of-service', '/privacy-policy'];
  if (hideLayoutPaths.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleSidebar }}>
      <div className="flex min-h-screen bg-muted">
        <Sidebar />
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isCollapsed ? 'ml-0' : ''}`}>
          <Topbar />
          <main className="flex-1 overflow-auto container mx-auto px-3 sm:px-6 py-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default MainLayout;
