import React from 'react';
import { Screen } from '../types';

const PageLayout: React.FC<{ title: string; children: React.ReactNode; onBack: () => void }> = ({ title, children, onBack }) => (
  <div className="min-h-screen bg-white">
    <div className="p-6 flex items-center gap-4 border-b border-gray-100">
      <button onClick={onBack} className="p-2 bg-gray-50 rounded-full">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

export const ContactScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <PageLayout title="Contact" onBack={() => navigate(Screen.PROFILE)}>
    <div className="space-y-6">
      <p className="text-gray-500">Une question ? Notre équipe vous répond en moins de 24h.</p>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-bold text-slate-800">Support WhatsApp</p>
        <p className="text-orange-500 font-medium">+509 3744-0000</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-bold text-slate-800">Email</p>
        <p className="text-orange-500 font-medium">support@goudela.com</p>
      </div>
    </div>
  </PageLayout>
);

export const AboutScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <PageLayout title="À propos" onBack={() => navigate(Screen.PROFILE)}>
    <h2 className="text-2xl font-bold text-slate-800 mb-4">Goudela Transfer</h2>
    <p className="text-gray-500 mb-4">Goudela Transfer est la solution leader pour les transferts d'argent et recharges mobiles en Haïti.</p>
    <p className="text-gray-500">Notre mission est de simplifier l'accès aux services financiers pour tous les Haïtiens, où qu'ils soient dans le monde.</p>
  </PageLayout>
);

export const TermsScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <PageLayout title="Conditions d'utilisation" onBack={() => navigate(Screen.PROFILE)}>
    <p className="text-gray-500">Les conditions d'utilisation de Goudela Transfer seront disponibles prochainement.</p>
  </PageLayout>
);

export const PrivacyScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <PageLayout title="Politique de confidentialité" onBack={() => navigate(Screen.PROFILE)}>
    <p className="text-gray-500">La politique de confidentialité de Goudela Transfer sera disponible prochainement.</p>
  </PageLayout>
);
