import React from "react";
import { Screen } from "../types";

const PageLayout: React.FC<{ title: string; children: React.ReactNode; onBack: () => void }> = ({
  title,
  children,
  onBack,
}) => (
  <div className="min-h-screen bg-white">
    <header className="p-6 border-b flex items-center gap-4">
      <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
    <div className="p-6 text-gray-600 leading-relaxed">{children}</div>
  </div>
);

export const ContactScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <PageLayout title="Contactez-nous" onBack={() => navigate(Screen.PROFILE)}>
    <div className="space-y-6">
      <p>Une question ? Notre équipe vous répond en moins de 24h.</p>
      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
        <h3 className="font-bold text-orange-800 mb-2">Support WhatsApp</h3>
        <p className="text-orange-700">+509 3744-0000</p>
      </div>
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-2">Email</h3>
        <p className="text-slate-700">support@goudela.com</p>
      </div>
    </div>
  </PageLayout>
);

export const AboutScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <PageLayout title="À propos" onBack={() => navigate(Screen.PROFILE)}>
    <h2 className="text-2xl font-bold text-orange-500 mb-4">Goudela Transfer</h2>
    <p className="mb-4">
      Goudela Transfer est la solution leader pour les transferts d'argent et recharges mobiles en Haïti.
    </p>
    <p>
      Notre mission est de simplifier l'accès aux services financiers pour tous les Haïtiens, où qu'ils soient dans le
      monde.
    </p>
  </PageLayout>
);
