import React from 'react';
import { Screen, Role } from '../types';
import BottomNav from '../components/BottomNav';

export const Dashboard: React.FC<{ navigate: (s: Screen) => void; role: Role }> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 animate-fade-in">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://ui-avatars.com/api/?name=Theo+A&background=888&color=fff&size=48" className="w-12 h-12 rounded-full object-cover" alt="avatar" />
            <h2 className="text-lg font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>Bonjour, Theo 👋</h2>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(36, 96%, 53%)' }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pt-6">
        <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(215, 35%, 15%)' }}>Envoyer ou recharger</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate(Screen.RECHARGE)}
            className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col items-start gap-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'hsl(215, 35%, 15%)' }}>Recharger</p>
              <p className="text-[11px] text-gray-400">Digicel & Natcom</p>
            </div>
          </button>
          <button
            onClick={() => navigate(Screen.TRANSFER)}
            className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col items-start gap-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'hsl(152, 60%, 45%)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'hsl(215, 35%, 15%)' }}>Envoyer de l'argent</p>
              <p className="text-[11px] text-gray-400">MonCash & NatCash</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>Activité récente</h3>
          <button onClick={() => navigate(Screen.HISTORY)} className="text-sm font-medium text-gray-400">Voir tout →</button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FFF0E6' }}>
              <svg className="w-5 h-5" style={{ color: 'hsl(36, 96%, 53%)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'hsl(215, 35%, 15%)' }}>Marie Michel</p>
              <p className="text-[11px] text-gray-400">MonCash • Hier</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm" style={{ color: 'hsl(215, 35%, 15%)' }}>$50.00 USD</p>
            <p className="text-[11px] font-medium" style={{ color: 'hsl(152, 60%, 45%)' }}>Complété</p>
          </div>
        </div>
      </div>

      <BottomNav activeTab="home" navigate={navigate} />
    </div>
  );
};
