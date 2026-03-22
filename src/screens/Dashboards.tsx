import React, { useState } from 'react';
import { Screen, Role } from '../types';
import BottomNav from '../components/BottomNav';

export const Dashboard: React.FC<{ navigate: (s: Screen) => void; role: Role }> = ({ navigate, role }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-6 bg-white rounded-b-[35px] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400 text-sm">Solde actuel</p>
            <h2 className="text-3xl font-black text-slate-800">$1,250.50 <span className="text-sm font-medium text-gray-400">USD</span></h2>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate(Screen.TRANSFER)} className="bg-orange-500 p-4 rounded-3xl text-white flex flex-col items-center gap-2 shadow-lg shadow-orange-100">
            <div className="p-2 bg-white/20 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <span className="font-bold">Transférer</span>
          </button>
          <button onClick={() => navigate(Screen.RECHARGE)} className="bg-slate-800 p-4 rounded-3xl text-white flex flex-col items-center gap-2 shadow-lg shadow-slate-200">
            <div className="p-2 bg-white/20 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <span className="font-bold">Recharger</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Activités récentes</h3>
          <button onClick={() => navigate(Screen.HISTORY)} className="text-orange-500 text-sm font-bold">Voir tout</button>
        </div>
        <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-50">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </div>
            <div>
              <p className="font-bold text-sm">Transfert MonCash</p>
              <p className="text-xs text-gray-400">À Marie Louise</p>
            </div>
          </div>
          <p className="font-bold text-red-500">-$150.00</p>
        </div>
      </div>
      <BottomNav activeTab="home" navigate={navigate} />
    </div>
  );
};
