import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Screen, Transaction } from "../types";
import { BottomNav } from "../components/BottomNav";

interface Props {
  navigate: (screen: Screen) => void;
  currentScreen: Screen;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "MonCash",
    amount: 50.0,
    currency: "USD",
    recipient: "Marie Michel",
    date: "Hier",
    status: "success",
    icon: "account_balance_wallet",
    color: "bg-red-500",
  },
  {
    id: "2",
    type: "Recharge",
    amount: 10.0,
    currency: "USD",
    recipient: "Digicel",
    date: "12 Mar",
    status: "success",
    icon: "phone_iphone",
    color: "bg-red-500",
  },
  {
    id: "3",
    type: "NatCash",
    amount: 25.0,
    currency: "USD",
    recipient: "Jean Pierre",
    date: "10 Mar",
    status: "success",
    icon: "account_balance_wallet",
    color: "bg-orange-500",
  },
];

export const HistoryScreen: React.FC<Props> = ({ navigate, currentScreen }) => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  return (
    <Layout className="bg-surface dark:bg-surface-dark pb-20 relative">
      <div className="px-6 pt-12 pb-6 bg-white dark:bg-card-dark rounded-b-3xl shadow-sm">
        <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white">Historiques</h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Vos transactions récentes</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {mockTransactions.map((tx) => (
          <div
            key={tx.id}
            onClick={() => setSelectedTx(tx)}
            className="bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full ${tx.color} flex items-center justify-center text-white shadow-sm`}
              >
                <span className="material-symbols-outlined">{tx.icon}</span>
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm">{tx.recipient}</p>
                <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                  {tx.type} • {tx.date}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 dark:text-white tracking-tight">
                ${tx.amount.toFixed(2)} {tx.currency}
              </p>
              <p className={`text-xs font-medium ${tx.status === "success" ? "text-emerald-500" : "text-slate-500"}`}>
                {tx.status === "success" ? "Complété" : "En attente"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
          <div className="bg-white dark:bg-card-dark w-full max-w-md rounded-3xl p-6 shadow-xl relative animate-in slide-in-from-bottom-10">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-4 right-4 size-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <div className="flex flex-col items-center mt-2 mb-6">
              <div
                className={`w-16 h-16 rounded-full ${selectedTx.color} flex items-center justify-center text-white shadow-sm mb-4`}
              >
                <span className="material-symbols-outlined text-3xl">{selectedTx.icon}</span>
              </div>
              <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white">{selectedTx.type}</h2>
              <p className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white mt-2">
                ${selectedTx.amount.toFixed(2)} {selectedTx.currency}
              </p>
              <div
                className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${selectedTx.status === "success" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"}`}
              >
                {selectedTx.status === "success" ? "Complété" : "En attente"}
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Bénéficiaire</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">{selectedTx.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Date</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">{selectedTx.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">ID de transaction</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  #TRX-{Math.floor(Math.random() * 1000000)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full mt-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-slate-800 dark:text-white font-medium h-12 rounded-xl transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <BottomNav navigate={navigate} currentScreen={currentScreen} />
    </Layout>
  );
};
