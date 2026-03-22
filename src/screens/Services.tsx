import React, { useState } from "react";
import { Screen } from "../types";

export const TransferScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  return (
    <div className="p-6 pb-24">
      <header className="flex items-center mb-8">
        <button onClick={() => navigate(Screen.DASHBOARD)} className="p-2 bg-gray-100 rounded-full mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 className="text-xl font-bold">Transfert d'argent</h1>
      </header>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Choisir le service</label>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-orange-500 rounded-xl bg-orange-50 font-bold">MonCash</button>
            <button className="p-4 border-2 border-gray-100 rounded-xl hover:border-orange-500 transition-all">
              NatCash
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Montant à envoyer (HTG)</label>
          <input type="number" placeholder="0.00" className="w-full text-3xl font-bold p-2 focus:outline-none" />
          <p className="text-xs text-gray-400 mt-2">Frais: 25 HTG | Total: 275 HTG</p>
        </div>

        <button
          onClick={() => navigate(Screen.RECEIPT)}
          className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-200"
        >
          Confirmer le transfert
        </button>
      </div>
    </div>
  );
};

export const RechargeScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="p-6">
    <h1 className="text-xl font-bold mb-4">Recharge Mobile</h1>
    {/* Logique similaire au transfert */}
    <button onClick={() => navigate(Screen.DASHBOARD)} className="text-orange-500">
      Retour
    </button>
  </div>
);
