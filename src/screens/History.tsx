import React from 'react';
import { Screen } from '../types';
import BottomNav from '../components/BottomNav';

const transactions = [
  { id: '1', name: 'Marie Michel', service: 'MonCash', date: 'Hier', amount: '$50.00 USD', status: 'Complété' },
  { id: '2', name: 'Digicel', service: 'Recharge', date: '12 Mar', amount: '$10.00 USD', status: 'Complété' },
  { id: '3', name: 'Jean Pierre', service: 'NatCash', date: '10 Mar', amount: '$25.00 USD', status: 'Complété' },
];

export const HistoryScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-gray-50 pb-24 animate-fade-in">
    <div className="px-6 pt-8 pb-2 bg-white">
      <h1 className="text-2xl font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>Historiques</h1>
      <p className="text-sm text-gray-400 mt-1">Vos transactions récentes</p>
    </div>
    <div className="px-6 pt-6 space-y-3">
      {transactions.map((tx) => (
        <div key={tx.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FFF0E6' }}>
              <svg className="w-5 h-5" style={{ color: 'hsl(36, 96%, 53%)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'hsl(215, 35%, 15%)' }}>{tx.name}</p>
              <p className="text-[11px] text-gray-400">{tx.service} • {tx.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm" style={{ color: 'hsl(215, 35%, 15%)' }}>{tx.amount}</p>
            <p className="text-[11px] font-medium" style={{ color: 'hsl(152, 60%, 45%)' }}>{tx.status}</p>
          </div>
        </div>
      ))}
    </div>
    <BottomNav activeTab="history" navigate={navigate} />
  </div>
);
