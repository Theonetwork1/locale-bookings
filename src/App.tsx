import React, { useState } from "react";
import { Screen } from "./types";
import { WelcomeScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen, OTPScreen } from "./screens/Auth";
import { Dashboard } from "./screens/Dashboards";
import { RechargeScreen, TransferScreen, ReceiptScreen } from "./screens/Services";
import { ContactScreen, AboutScreen, TermsScreen, PrivacyScreen } from "./screens/InfoPages";
import { HistoryScreen } from "./screens/History";
import { ProfileScreen } from "./screens/Profile";

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);

  const navigate = (screen: Screen) => {
    window.scrollTo(0, 0);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.WELCOME:
        return <WelcomeScreen navigate={navigate} />;
      case Screen.LOGIN:
        return <LoginScreen navigate={navigate} />;
      case Screen.REGISTER:
        return <RegisterScreen navigate={navigate} />;
      case Screen.FORGOT_PASSWORD:
        return <ForgotPasswordScreen navigate={navigate} />;
      case Screen.OTP:
        return <OTPScreen navigate={navigate} />;
      case Screen.DASHBOARD:
        return <Dashboard navigate={navigate} currentScreen={currentScreen} />;
      case Screen.RECHARGE:
        return <RechargeScreen navigate={navigate} />;
      case Screen.TRANSFER:
        return <TransferScreen navigate={navigate} />;
      case Screen.RECEIPT:
        return <ReceiptScreen navigate={navigate} />;
      case Screen.CONTACT:
        return <ContactScreen navigate={navigate} />;
      case Screen.ABOUT:
        return <AboutScreen navigate={navigate} />;
      case Screen.TERMS:
        return <TermsScreen navigate={navigate} />;
      case Screen.PRIVACY:
        return <PrivacyScreen navigate={navigate} />;
      case Screen.HISTORY:
        return <HistoryScreen navigate={navigate} currentScreen={currentScreen} />;
      case Screen.PROFILE:
        return <ProfileScreen navigate={navigate} currentScreen={currentScreen} />;
      default:
        return <WelcomeScreen navigate={navigate} />;
    }
  };

  return <>{renderScreen()}</>;
};

export default App;
