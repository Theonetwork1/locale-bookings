import React, { useState } from 'react';
import { Screen } from '../types';

export const TransferScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  const [operator, setOperator] = useState<'MonCash' | 'NatCash'>('MonCash');

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(Screen.DASHBOARD)} className="p-2 bg-gray-50 rounded-full">
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>Transfert d'argent</h1>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex gap-4">
          {(['MonCash', 'NatCash'] as const).map((op) => (
            <button key={op} onClick={() => setOperator(op)}
              className={`flex-1 p-4 rounded-2xl border-2 transition-all ${operator === op ? 'border-orange-400 bg-orange-50' : 'border-gray-100'}`}>
              <div className={`h-8 rounded mb-2 flex items-center justify-center text-[10px] text-white font-black italic ${op === 'MonCash' ? 'bg-red-600' : 'bg-blue-600'}`}>{op}</div>
              <p className="text-sm font-bold">{op === 'MonCash' ? 'Digicel' : 'Natcom'}</p>
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Destinataire</label>
          <input type="tel" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-400" placeholder="Numéro de téléphone" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Montant (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-300">$</span>
            <input type="number" className="w-full p-6 pl-10 rounded-3xl text-3xl font-bold outline-none text-white" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }} placeholder="0.00" />
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-gray-400">Frais de service (5%)</span>
            <span className="font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>$0.00</span>
          </div>
        </div>
        <button onClick={() => navigate(Screen.RECEIPT)} className="w-full py-5 rounded-3xl font-black text-lg text-white shadow-lg" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>
          CONFIRMER LE TRANSFERT
        </button>
      </div>
    </div>
  );
};

export const RechargeScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [showConfirm, setShowConfirm] = useState(false);
  const amounts = [5, 10, 20, 50];
  const fee = selectedAmount * 0.05;
  const total = selectedAmount + fee;

  return (
    <div className="min-h-screen bg-white animate-fade-in relative">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(Screen.DASHBOARD)} className="p-2 bg-gray-50 rounded-full">
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>Recharge téléphonique</h1>
      </div>
      <div className="px-6 space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2" style={{ color: 'hsl(215, 35%, 15%)' }}>Numéro du bénéficiaire</label>
          <div className="flex gap-2">
            <input type="tel" className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-400" placeholder="+509 3XXX-XXXX" />
            <button className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
          </div>
          <p className="text-xs mt-1 font-medium" style={{ color: 'hsl(215, 35%, 15%)' }}>Digicel / Natcom</p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-3" style={{ color: 'hsl(215, 35%, 15%)' }}>Montant (USD)</label>
          <div className="grid grid-cols-2 gap-3">
            {amounts.map((a) => (
              <button key={a} onClick={() => setSelectedAmount(a)}
                className={`p-4 rounded-2xl border-2 text-xl font-bold transition-all flex items-center justify-between ${selectedAmount === a ? 'border-blue-900 bg-blue-50' : 'border-gray-100'}`}
                style={selectedAmount === a ? { color: 'hsl(215, 35%, 15%)' } : {}}
              >
                ${a}
                {selectedAmount === a && (
                  <svg className="w-5 h-5" style={{ color: 'hsl(215, 35%, 15%)' }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <span className="text-sm font-medium text-gray-600">Planifier un abonnement</span>
          <div className="w-12 h-7 bg-gray-200 rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-3" style={{ color: 'hsl(215, 35%, 15%)' }}>Informations de paiement (Carte)</h3>
          <div className="space-y-3">
            <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Nom sur la carte" />
            <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Numéro de carte" />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="MM/AA" />
              <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="CVC" />
            </div>
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Paiement sécurisé par Stripe
            </p>
          </div>
        </div>

        <button onClick={() => setShowConfirm(true)} className="w-full py-5 rounded-3xl font-bold text-lg text-white flex items-center justify-center gap-2" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>
          Payer et envoyer ➤
        </button>
        <div className="h-6" />
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-fade-in">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'hsl(215, 35%, 15%)' }}>Confirmer la recharge</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Bénéficiaire</span><span className="font-bold">Non renseigné</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Montant</span><span className="font-bold">${selectedAmount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Frais de transaction (5%)</span><span className="font-bold">${fee.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg pt-3 border-t">
                <span className="font-bold">Total à payer</span>
                <span className="font-black text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 rounded-xl font-bold border-2 border-gray-200">Modifier</button>
              <button onClick={() => { setShowConfirm(false); navigate(Screen.RECEIPT); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ReceiptScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: 'hsl(36, 96%, 53%)' }}>
    <div className="bg-white w-full rounded-3xl p-8 shadow-2xl relative">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'hsl(152, 60%, 45%)' }}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="text-center mt-6 mb-8">
        <h2 className="text-2xl font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>Transfert réussi !</h2>
        <p className="text-gray-400 text-sm">ID: #GT-8829310</p>
      </div>
      <div className="border-t border-dashed border-gray-200 py-6 space-y-4">
        <div className="flex justify-between"><span className="text-gray-400">Destinataire</span><span className="font-bold">Marie Louise</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Service</span><span className="font-bold">MonCash</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Montant</span><span className="font-bold">150.00 USD</span></div>
        <div className="flex justify-between text-lg border-t pt-4">
          <span className="font-bold">Total payé</span>
          <span className="font-bold" style={{ color: 'hsl(36, 96%, 53%)' }}>160.00 USD</span>
        </div>
      </div>
      <button onClick={() => navigate(Screen.DASHBOARD)} className="w-full mt-8 py-4 rounded-xl font-bold text-white" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>
        Retour à l'accueil
      </button>
    </div>
    <button className="mt-8 text-white font-medium opacity-80 hover:opacity-100 flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
      Télécharger le reçu (PDF)
    </button>
  </div>
);
