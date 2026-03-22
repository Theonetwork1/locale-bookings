import React, { useState } from 'react';
import { Screen, Role } from '../types';

export const WelcomeScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-center">
    <div className="w-24 h-24 bg-orange-500 rounded-2xl mb-8 flex items-center justify-center shadow-orange-200 shadow-2xl">
      <span className="text-white text-4xl font-bold">G</span>
    </div>
    <h1 className="text-3xl font-bold text-slate-800 mb-2">Goudela Transfer</h1>
    <p className="text-slate-500 mb-12">Rapide. Sûr. Partout en Haïti.</p>
    <button
      onClick={() => navigate(Screen.ROLE_SELECTION)}
      className="w-full py-4 bg-orange-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-orange-600 transition-colors"
    >
      Commencer
    </button>
  </div>
);

export const RoleSelectionScreen: React.FC<{ navigate: (s: Screen, r?: Role) => void }> = ({ navigate }) => (
  <div className="p-6 flex flex-col justify-center min-h-screen">
    <h2 className="text-2xl font-bold mb-6">Choisissez votre rôle</h2>
    <div className="space-y-4">
      <button onClick={() => navigate(Screen.REGISTER, 'client')} className="w-full p-6 border-2 border-orange-100 rounded-2xl text-left hover:border-orange-500 transition-all">
        <h3 className="font-bold text-lg">Client</h3>
        <p className="text-sm text-gray-500">Je veux envoyer de l'argent ou recharger.</p>
      </button>
      <button onClick={() => navigate(Screen.REGISTER, 'agent')} className="w-full p-6 border-2 border-orange-100 rounded-2xl text-left hover:border-orange-500 transition-all">
        <h3 className="font-bold text-lg">Agent</h3>
        <p className="text-sm text-gray-500">Je gère un point de vente physique.</p>
      </button>
    </div>
  </div>
);

export const LoginScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Bon retour !</h1>
        <p className="text-gray-500">Connectez-vous pour continuer</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone ou Email</label>
          <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 outline-none" placeholder="Ex: +509 3744-0000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input type="password" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 outline-none" placeholder="••••••••" />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(Screen.DASHBOARD)}
            className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg hover:bg-orange-600 transition-all"
          >
            Se connecter
          </button>
          <button
            onClick={() => navigate(Screen.DASHBOARD)}
            className="p-4 bg-slate-100 text-slate-800 rounded-2xl flex items-center justify-center hover:bg-slate-200"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-8 text-center text-gray-500">
        Pas encore de compte ?
        <button onClick={() => navigate(Screen.ROLE_SELECTION)} className="text-orange-500 font-bold ml-1">S'inscrire</button>
      </p>
    </div>
  );
};

export const RegisterScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Créer un compte</h1>
        <p className="text-gray-500">Rejoignez Goudela Transfer</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 outline-none" placeholder="Jean" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 outline-none" placeholder="Avril" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 outline-none" placeholder="jean@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input type="tel" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 outline-none" placeholder="+509 3744-0000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input type="password" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 outline-none" placeholder="••••••••" />
        </div>
        <button
          onClick={() => navigate(Screen.DASHBOARD)}
          className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg hover:bg-orange-600 transition-all"
        >
          S'inscrire
        </button>
      </div>
      <p className="mt-8 text-center text-gray-500">
        Déjà un compte ?
        <button onClick={() => navigate(Screen.LOGIN)} className="text-orange-500 font-bold ml-1">Se connecter</button>
      </p>
    </div>
  );
};

export const ForgotPasswordScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
    <h1 className="text-2xl font-bold text-slate-800 mb-4">Mot de passe oublié</h1>
    <p className="text-gray-500 mb-6">Entrez votre email pour réinitialiser votre mot de passe.</p>
    <input type="email" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 outline-none mb-4" placeholder="Votre email" />
    <button onClick={() => navigate(Screen.OTP)} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold">
      Envoyer le code
    </button>
    <button onClick={() => navigate(Screen.LOGIN)} className="mt-4 text-orange-500 font-bold text-center">
      Retour à la connexion
    </button>
  </div>
);

export const OTPScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
    <h1 className="text-2xl font-bold text-slate-800 mb-4">Vérification</h1>
    <p className="text-gray-500 mb-6">Entrez le code envoyé à votre téléphone.</p>
    <div className="flex gap-3 justify-center mb-8">
      {[1, 2, 3, 4].map((i) => (
        <input key={i} type="text" maxLength={1} className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 outline-none" />
      ))}
    </div>
    <button onClick={() => navigate(Screen.DASHBOARD)} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold">
      Vérifier
    </button>
  </div>
);
