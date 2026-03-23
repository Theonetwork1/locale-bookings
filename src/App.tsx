import React, { useState } from 'react';
import { Screen, Role } from './types';
import { WelcomeScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen, OTPScreen, RoleSelectionScreen } from './screens/Auth';
import { Dashboard } from './screens/Dashboards';
import { RechargeScreen, TransferScreen, ReceiptScreen } from './screens/Services';
import { ContactScreen, AboutScreen, TermsScreen, PrivacyScreen } from './screens/InfoPages';
import { HistoryScreen } from './screens/History';
import { ProfileScreen } from './screens/Profile';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [userRole, setUserRole] = useState<Role>('client');

  const navigate = (screen: Screen, role?: Role) => {
    if (role) setUserRole(role);
    window.scrollTo(0, 0);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.WELCOME: return <WelcomeScreen navigate={navigate} />;
      case Screen.ROLE_SELECTION: return <RoleSelectionScreen navigate={navigate} />;
      case Screen.LOGIN: return <LoginScreen navigate={navigate} />;
      case Screen.REGISTER: return <RegisterScreen navigate={navigate} />;
      case Screen.FORGOT_PASSWORD: return <ForgotPasswordScreen navigate={navigate} />;
      case Screen.OTP: return <OTPScreen navigate={navigate} />;
      case Screen.DASHBOARD: return <Dashboard navigate={navigate} role={userRole} />;
      case Screen.RECHARGE: return <RechargeScreen navigate={navigate} />;
      case Screen.TRANSFER: return <TransferScreen navigate={navigate} />;
      case Screen.RECEIPT: return <ReceiptScreen navigate={navigate} />;
      case Screen.PROFILE: return <ProfileScreen navigate={navigate} />;
      case Screen.HISTORY: return <HistoryScreen navigate={navigate} />;
      case Screen.CONTACT: return <ContactScreen navigate={navigate} />;
      case Screen.ABOUT: return <AboutScreen navigate={navigate} />;
      case Screen.TERMS: return <TermsScreen navigate={navigate} />;
      case Screen.PRIVACY: return <PrivacyScreen navigate={navigate} />;
      default: return <WelcomeScreen navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
    </div>
  );
};

export default App;
