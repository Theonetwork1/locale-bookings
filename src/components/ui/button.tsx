import React from "react";
import { Screen } from "../types";

interface BottomNavProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, navigate }) => {
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-6 flex justify-around items-center z-30 pb-4 h-[80px]">
      <NavItem
        icon="home"
        label="Accueil"
        active={currentScreen === Screen.DASHBOARD}
        onClick={() => navigate(Screen.DASHBOARD)}
      />
      <NavItem
        icon="history"
        label="Historiques"
        active={currentScreen === Screen.HISTORY}
        onClick={() => navigate(Screen.HISTORY)}
      />
      <NavItem
        icon="person"
        label="Profil"
        active={currentScreen === Screen.PROFILE}
        onClick={() => navigate(Screen.PROFILE)}
      />
    </nav>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({
  icon,
  label,
  active,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 w-14 transition-colors ${active ? "text-primary" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"}`}
  >
    <span
      className={`material-symbols-outlined ${active ? "filled" : ""}`}
      style={{ fontVariationSettings: `'FILL' ${active ? 1 : 0}` }}
    >
      {icon}
    </span>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
