import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { BottomNav } from "../components/BottomNav";
import { Screen, Transaction } from "../types";

interface DashboardProps {
  navigate: (screen: Screen) => void;
  currentScreen: Screen;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "MonCash",
    amount: 50.0,
    currency: "USD",
    recipient: "Marie Michel",
    date: "Hier",
    status: "success",
    icon: "account_balance_wallet",
    color: "text-red-500 bg-red-100 dark:bg-red-900/20",
  },
];

export const Dashboard: React.FC<DashboardProps> = ({ navigate, currentScreen }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Layout className="bg-surface dark:bg-surface-dark">
      {/* Header */}
      <div className="bg-white dark:bg-card-dark p-6 pb-6 rounded-b-[2rem] shadow-sm z-10 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full border-2 border-primary overflow-hidden">
              <img src="https://picsum.photos/seed/user1/100/100" alt="User" />
            </div>
            <div>
              <p className="text-xl font-display font-bold text-slate-800 dark:text-white">Bonjour, Theo 👋</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative"
            >
              <span className="material-symbols-outlined text-primary">notifications</span>
              <span className="absolute top-2 right-2 size-2.5 border-2 border-white dark:border-card-dark bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <span className="font-bold">Notifications</span>
                  <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Bienvenue sur Goudela ! 🎉</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Votre compte a été créé avec succès. Commencez à envoyer de l'argent dès maintenant.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2">Il y a 2 min</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Transfert complété ✅</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Votre transfert de 50 USD vers Marie Michel a été reçu avec succès.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2">Hier</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-display font-bold leading-tight mt-6">Envoyer ou recharger</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate(Screen.RECHARGE)}
            className="bg-white dark:bg-card-dark p-5 rounded-2xl shadow-sm flex flex-col items-start gap-3 hover:border-primary border border-transparent transition-all"
          >
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">smartphone</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-lg font-display">Recharger</div>
              <div className="text-xs text-gray-500">Digicel & Natcom</div>
            </div>
          </button>

          <button
            onClick={() => navigate(Screen.TRANSFER)}
            className="bg-white dark:bg-card-dark p-5 rounded-2xl shadow-sm flex flex-col items-start gap-3 hover:border-secondary border border-transparent transition-all"
          >
            <div className="size-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">payments</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-lg font-display leading-tight">Envoyer de l'argent</div>
              <div className="text-xs text-gray-500 mt-1">MonCash & NatCash</div>
            </div>
          </button>
        </div>

        {/* History */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg font-display">Activité récente</h3>
          <button
            onClick={() => navigate(Screen.HISTORY)}
            className="text-primary text-sm font-semibold flex items-center gap-1"
          >
            Voir tout <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-4 bg-white dark:bg-card-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className={`size-12 rounded-full flex items-center justify-center ${tx.color}`}>
                <span className="material-symbols-outlined">{tx.icon}</span>
              </div>
              <div className="flex-1">
                <div className="font-bold">{tx.recipient}</div>
                <div className="text-xs text-gray-500">
                  {tx.type} • {tx.date}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold tracking-tight">
                  ${tx.amount.toFixed(2)} {tx.currency}
                </div>
                <div
                  className={`text-[10px] font-bold ${tx.status === "success" ? "text-secondary" : "text-orange-500"}`}
                >
                  {tx.status === "success" ? "Complété" : "En cours"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav currentScreen={currentScreen} navigate={navigate} />
    </Layout>
  );
};
