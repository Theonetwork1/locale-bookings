import React, { useState } from 'react';
import { Screen } from '../types';
import BottomNav from '../components/BottomNav';

export const ProfileScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop');

  return (
    <div className="min-h-screen bg-gray-50 pb-24 animate-fade-in">
      <div className="px-6 pt-8 pb-2 bg-white">
        <h1 className="text-2xl font-bold" style={{ color: 'hsl(215, 35%, 15%)' }}>Profil</h1>
        <p className="text-sm text-gray-400 mt-1">Gérez vos informations personnelles</p>
      </div>

      <div className="px-6 pt-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-28 h-28">
              <img src={profileImage} className="w-28 h-28 rounded-full object-cover border-4 border-gray-100" alt="Profile" />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white border border-gray-200 p-2 rounded-full cursor-pointer shadow">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setProfileImage(URL.createObjectURL(file));
                  }} />
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </label>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium" style={{ color: 'hsl(215, 35%, 15%)' }}>Prénom</label>
              <input disabled={!isEditing} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border border-gray-100 outline-none focus:border-orange-400" defaultValue="Theo" />
            </div>
            <div>
              <label className="text-xs font-medium" style={{ color: 'hsl(215, 35%, 15%)' }}>Nom</label>
              <input disabled={!isEditing} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border border-gray-100 outline-none focus:border-orange-400" defaultValue="Avril" />
            </div>
            <div>
              <label className="text-xs font-medium" style={{ color: 'hsl(215, 35%, 15%)' }}>Email</label>
              <input disabled={!isEditing} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border border-gray-100 outline-none focus:border-orange-400" defaultValue="theo@example.com" />
            </div>
            <div>
              <label className="text-xs font-medium" style={{ color: 'hsl(215, 35%, 15%)' }}>Téléphone</label>
              <input disabled={!isEditing} className="w-full p-3 bg-gray-50 rounded-xl mt-1 border border-gray-100 outline-none focus:border-orange-400" defaultValue="+1 555-0123" />
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full mt-6 py-3 rounded-xl font-bold border-2 transition-all"
            style={isEditing
              ? { backgroundColor: 'hsl(215, 35%, 15%)', color: 'white', borderColor: 'hsl(215, 35%, 15%)' }
              : { borderColor: 'hsl(215, 35%, 15%)', color: 'hsl(215, 35%, 15%)', backgroundColor: 'white' }
            }
          >
            {isEditing ? 'Enregistrer' : 'Modifier le profil'}
          </button>
          <button
            onClick={() => navigate(Screen.WELCOME)}
            className="w-full mt-3 py-3 rounded-xl font-bold transition-all"
            style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
          >
            Se déconnecter
          </button>
        </div>
      </div>

      <BottomNav activeTab="profile" navigate={navigate} />
    </div>
  );
};
