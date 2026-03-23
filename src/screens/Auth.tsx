import React, { useState } from 'react';
import { Screen, Role } from '../types';

export const WelcomeScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="flex flex-col items-center justify-between min-h-screen px-8 py-12" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>
    <div className="flex-1" />
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-white tracking-tight">
        Goudela <span style={{ color: 'hsl(36, 96%, 53%)' }}>•</span>
      </h1>
      <p className="text-gray-400 mt-3 text-sm">
        Envoyer en un clic. Reçu{'\n'}instantanément en Haïti
      </p>
    </div>
    <div className="w-full space-y-3 mb-8">
      <button
        onClick={() => navigate(Screen.REGISTER)}
        className="w-full py-4 rounded-2xl font-bold text-lg transition-all"
        style={{ backgroundColor: 'hsl(36, 96%, 53%)', color: 'white' }}
      >
        Sign up
      </button>
      <button
        onClick={() => navigate(Screen.LOGIN)}
        className="w-full py-4 rounded-2xl font-bold text-lg border-2 border-white/20 text-white transition-all hover:bg-white/10"
      >
        Sign in
      </button>
    </div>
    <div className="flex gap-6 text-xs text-gray-500 mb-4">
      <button onClick={() => navigate(Screen.ABOUT)}>About Us</button>
      <button onClick={() => navigate(Screen.CONTACT)}>Contact</button>
      <button onClick={() => navigate(Screen.TERMS)}>Terms</button>
      <button onClick={() => navigate(Screen.PRIVACY)}>Privacy</button>
    </div>
    <p className="text-[10px] text-gray-600">© 2026 Goudela Transfer. All rights reserved.</p>
  </div>
);

export const RoleSelectionScreen: React.FC<{ navigate: (s: Screen, r?: Role) => void }> = ({ navigate }) => (
  <div className="p-6 flex flex-col justify-center min-h-screen bg-white">
    <h2 className="text-2xl font-bold mb-6" style={{ color: 'hsl(215, 35%, 15%)' }}>Choisissez votre rôle</h2>
    <div className="space-y-4">
      <button onClick={() => navigate(Screen.REGISTER, 'client')} className="w-full p-6 border-2 border-gray-100 rounded-2xl text-left hover:border-orange-400 transition-all">
        <h3 className="font-bold text-lg">Client</h3>
        <p className="text-sm text-gray-500">Je veux envoyer de l'argent ou recharger.</p>
      </button>
      <button onClick={() => navigate(Screen.REGISTER, 'agent')} className="w-full p-6 border-2 border-gray-100 rounded-2xl text-left hover:border-orange-400 transition-all">
        <h3 className="font-bold text-lg">Agent</h3>
        <p className="text-sm text-gray-500">Je gère un point de vente physique.</p>
      </button>
    </div>
  </div>
);

export const LoginScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  const [usePhone, setUsePhone] = useState(false);

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-6 flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold" style={{ color: 'hsl(215, 35%, 15%)' }}>
          Goudela <span style={{ color: 'hsl(36, 96%, 53%)' }}>•</span>
        </h1>
      </div>
      <h2 className="text-xl font-bold mb-1" style={{ color: 'hsl(215, 35%, 15%)' }}>Login to your Account</h2>
      <button onClick={() => setUsePhone(!usePhone)} className="text-sm font-medium mb-6" style={{ color: 'hsl(215, 35%, 15%)' }}>
        {usePhone ? 'Use Email instead' : 'Use Phone Number instead'}
      </button>

      <div className="space-y-4 flex-1">
        {usePhone ? (
          <input type="tel" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Phone Number" />
        ) : (
          <input type="email" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Email Address" />
        )}
        <input type="password" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Password" />
        <div className="text-right">
          <button onClick={() => navigate(Screen.FORGOT_PASSWORD)} className="text-sm font-medium" style={{ color: 'hsl(215, 35%, 15%)' }}>Forgot password?</button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(Screen.DASHBOARD)}
            className="flex-1 py-4 rounded-2xl font-bold text-white"
            style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}
          >
            Sign in
          </button>
          <button className="w-14 h-14 border border-gray-200 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </button>
        </div>

        <div className="text-center text-sm text-gray-400 my-4">- Or sign in with -</div>
        <button className="w-full py-4 border border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-medium text-gray-700">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account? <button onClick={() => navigate(Screen.REGISTER)} className="font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>Sign up</button>
      </p>
    </div>
  );
};

export const RegisterScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-white px-6 pt-8 pb-6 flex flex-col">
    <button onClick={() => navigate(Screen.LOGIN)} className="self-start mb-6">
      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
    </button>
    <div className="text-center mb-6">
      <h1 className="text-2xl font-extrabold" style={{ color: 'hsl(215, 35%, 15%)' }}>
        Goudela <span style={{ color: 'hsl(36, 96%, 53%)' }}>•</span>
      </h1>
    </div>
    <h2 className="text-xl font-bold mb-6" style={{ color: 'hsl(215, 35%, 15%)' }}>Create your Account</h2>

    <div className="space-y-4 flex-1">
      <div className="grid grid-cols-2 gap-3">
        <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Prénom" />
        <input type="text" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Nom" />
      </div>
      <input type="email" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Email" />
      <div className="flex gap-2">
        <select className="p-4 border border-gray-200 rounded-2xl outline-none bg-white text-sm">
          <option>US/CA (+1)</option>
          <option>🇭🇹 +509</option>
          <option>🇫🇷 +33</option>
        </select>
        <input type="tel" className="flex-1 p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Phone Number" />
      </div>
      <input type="password" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Mot de passe" />
      <input type="password" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400" placeholder="Confirmer le mot de passe" />
      <button
        onClick={() => navigate(Screen.DASHBOARD)}
        className="w-full py-4 rounded-2xl font-bold text-white text-lg"
        style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}
      >
        Sign up
      </button>

      <div className="text-center text-sm text-gray-400 my-2">- Or sign up with -</div>
      <button className="w-full py-4 border border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-medium text-gray-700">
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
    </div>
  </div>
);

export const ForgotPasswordScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
    <h1 className="text-2xl font-bold mb-4" style={{ color: 'hsl(215, 35%, 15%)' }}>Mot de passe oublié</h1>
    <p className="text-gray-500 mb-6">Entrez votre email pour réinitialiser votre mot de passe.</p>
    <input type="email" className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-orange-400 mb-4" placeholder="Votre email" />
    <button onClick={() => navigate(Screen.OTP)} className="w-full py-4 rounded-2xl font-bold text-white" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>Envoyer le code</button>
    <button onClick={() => navigate(Screen.LOGIN)} className="mt-4 font-bold text-center" style={{ color: 'hsl(36, 96%, 53%)' }}>Retour à la connexion</button>
  </div>
);

export const OTPScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
    <h1 className="text-2xl font-bold mb-4" style={{ color: 'hsl(215, 35%, 15%)' }}>Vérification</h1>
    <p className="text-gray-500 mb-6">Entrez le code envoyé à votre téléphone.</p>
    <div className="flex gap-3 justify-center mb-8">
      {[1, 2, 3, 4].map((i) => (
        <input key={i} type="text" maxLength={1} className="w-14 h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl outline-none focus:border-orange-400" />
      ))}
    </div>
    <button onClick={() => navigate(Screen.DASHBOARD)} className="w-full py-4 rounded-2xl font-bold text-white" style={{ backgroundColor: 'hsl(215, 35%, 15%)' }}>Vérifier</button>
  </div>
);
