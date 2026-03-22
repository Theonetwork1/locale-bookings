import React, { useState } from 'react';
import { Screen, Transaction } from '../types';
import BottomNav from '../components/BottomNav';

export const HistoryScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  const [filter, setFilter] = useState<'all' | 'transfer' | 'recharge'>('all');

  const userTransactions: Transaction[] = [
    {
      id: 'TRX-101',
      type: 'transfer',
      senderName: 'Jean Avril',
      senderEmail: 'jean.avril@email.com',
      senderPhone: '37440000',
      receiverName: 'Marie Louise',
      receiverPhone: '31221122',
      amount: 150,
      fee: 10,
      total: 160,
      currency: 'USD',
      company: 'MonCash',
      status: 'Received',
      date: '20 Mars 2026',
      time: '10:15'
    },
    {
      id: 'REC-202',
      type: 'recharge',
      senderName: 'Jean Avril',
      senderEmail: 'jean.avril@email.com',
      senderPhone: '37440000',
      receiverName: 'Lui-même',
      receiverPhone: '37440000',
      amount: 500,
      fee: 0,
      total: 500,
      currency: 'HTG',
      company: 'Digicel',
      status: 'In Progress',
      date: '21 Mars 2026',
      time: '09:00'
    }
  ];

  const filteredData = filter === 'all'
    ? userTransactions
    : userTransactions.filter(t => t.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-slate-800">Mon Activité</h1>
        <div className="flex gap-2 mt-4">
          {(['all', 'transfer', 'recharge'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {f === 'all' ? 'Tout' : f === 'transfer' ? 'Transferts' : 'Recharges'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredData.map((tx) => (
          <div
            key={tx.id}
            className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-transparent hover:border-orange-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                tx.type === 'transfer' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'
              }`}>
                {tx.type === 'transfer' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                )}
              </div>
              <div>
                <p className="font-bold text-slate-800">{tx.receiverName}</p>
                <p className="text-xs text-gray-400">{tx.date} • {tx.company}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${tx.status === 'In Progress' ? 'text-orange-500' : 'text-slate-800'}`}>
                {tx.amount} {tx.currency}
              </p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                tx.status === 'Received' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav activeTab="history" navigate={navigate} />
    </div>
  );
};
