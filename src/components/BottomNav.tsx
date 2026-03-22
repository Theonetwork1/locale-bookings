import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  activeTab: string;
  navigate: (s: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, navigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      <button onClick={() => navigate(Screen.DASHBOARD)} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-400'}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span className="text-[10px] mt-1 font-medium">Accueil</span>
      </button>
      <button onClick={() => navigate(Screen.HISTORY)} className={`flex flex-col items-center ${activeTab === 'history' ? 'text-orange-500' : 'text-gray-400'}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        <span className="text-[10px] mt-1 font-medium">Activité</span>
      </button>
      <button onClick={() => navigate(Screen.PROFILE)} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-orange-500' : 'text-gray-400'}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        <span className="text-[10px] mt-1 font-medium">Profil</span>
      </button>
    </div>
  );
};

export default BottomNav;
