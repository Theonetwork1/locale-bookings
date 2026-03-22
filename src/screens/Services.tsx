import React, { useState } from 'react';
import { Screen } from '../types';

export const TransferScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  const [operator, setOperator] = useState<'MonCash' | 'NatCash'>('MonCash');

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(Screen.DASHBOARD)} className="p-2 bg-gray-50 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-bold">Transfert d'argent</h1>
      </div>
      <div className="p-6 space-y-8">
        <div className="flex gap-4">
          <button
            onClick={() => setOperator('MonCash')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all ${operator === 'MonCash' ? 'border-orange-500 bg-orange-50' : 'border-gray-100'}`}
          >
            <div className="h-8 bg-red-600 rounded mb-2 flex items-center justify-center text-[10px] text-white font-black italic">MonCash</div>
            <p className="text-sm font-bold">Digicel</p>
          </button>
          <button
            onClick={() => setOperator('NatCash')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all ${operator === 'NatCash' ? 'border-orange-500 bg-orange-50' : 'border-gray-100'}`}
          >
            <div className="h-8 bg-blue-600 rounded mb-2 flex items-center justify-center text-[10px] text-white font-black italic">NatCash</div>
            <p className="text-sm font-bold">Natcom</p>
          </button>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Destinataire</label>
          <input type="tel" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-500" placeholder="Numéro de téléphone" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Montant (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">$</span>
            <input type="number" className="w-full p-6 pl-10 bg-slate-900 text-white rounded-3xl text-3xl font-bold outline-none" placeholder="0.00" />
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className="text-gray-400">Frais de service (5%)</span>
            <span className="font-bold text-slate-800">$0.00</span>
          </div>
        </div>
        <button onClick={() => navigate(Screen.RECEIPT)} className="w-full py-5 bg-orange-500 text-white rounded-3xl font-black text-lg shadow-xl shadow-orange-100">
          CONFIRMER LE TRANSFERT
        </button>
      </div>
    </div>
  );
};

export const RechargeScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-white p-6">
    <div className="flex items-center gap-4 mb-8">
      <button onClick={() => navigate(Screen.DASHBOARD)} className="p-2 bg-gray-50 rounded-full">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <h1 className="text-xl font-bold">Recharge Mobile</h1>
    </div>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Opérateur</label>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 border-2 border-orange-500 rounded-2xl bg-orange-50 font-bold">Digicel</button>
          <button className="p-4 border-2 border-gray-100 rounded-2xl hover:border-orange-500 transition-all font-bold">Natcom</button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Numéro</label>
        <input type="tel" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-500" placeholder="Numéro de téléphone" />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Montant (HTG)</label>
        <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-500 text-2xl font-bold" placeholder="0" />
      </div>
      <button onClick={() => navigate(Screen.RECEIPT)} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg">
        Recharger maintenant
      </button>
    </div>
  </div>
);

export const ReceiptScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-orange-500 flex flex-col items-center justify-center p-6">
    <div className="bg-white w-full rounded-3xl p-8 shadow-2xl relative">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="text-center mt-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Transfert réussi !</h2>
        <p className="text-gray-400 text-sm">ID: #GT-8829310</p>
      </div>
      <div className="border-t border-dashed border-gray-200 py-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Destinataire</span>
          <span className="font-bold text-slate-800">Marie Louise</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Service</span>
          <span className="font-bold text-slate-800">MonCash</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Montant</span>
          <span className="font-bold text-slate-800">150.00 USD</span>
        </div>
        <div className="flex justify-between text-lg border-t pt-4">
          <span className="font-bold text-slate-800">Total payé</span>
          <span className="font-bold text-orange-500">160.00 USD</span>
        </div>
      </div>
      <button
        onClick={() => navigate(Screen.DASHBOARD)}
        className="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl font-bold"
      >
        Retour à l'accueil
      </button>
    </div>
    <button className="mt-8 text-white font-medium opacity-80 hover:opacity-100 flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
      Télécharger le reçu (PDF)
    </button>
  </div>
);
