import React, { useState } from 'react';
import { Screen, User } from '../types';
import BottomNav from '../components/BottomNav';

export const ProfileScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>({
    id: '1',
    firstName: 'Jean',
    lastName: 'Avril',
    email: 'jean.avril@email.com',
    phone: '37440000',
    countryCode: '+509',
    role: 'client',
    status: 'active',
    joinedDate: '2024-01-15',
    balance: 1250.50
  });

  const [profileImage, setProfileImage] = useState("https://ui-avatars.com/api/?name=Jean+Avril&background=f97316&color=fff");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-orange-500 h-40 pt-10 px-6 rounded-b-[40px] shadow-lg">
        <h1 className="text-white text-2xl font-bold text-center">Mon Profil</h1>
      </div>
      <div className="px-6 -mt-16">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-50 text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img src={profileImage} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" alt="Profile" />
            {isEditing && (
              <label className="absolute bottom-1 right-1 bg-orange-500 p-2 rounded-full text-white cursor-pointer shadow-md border-2 border-white">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </label>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Prénom</label>
              <input
                disabled={!isEditing}
                className="w-full p-3 bg-gray-50 rounded-xl mt-1 border border-gray-100"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nom</label>
              <input
                disabled={!isEditing}
                className="w-full p-3 bg-gray-50 rounded-xl mt-1 border border-gray-100"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Téléphone</label>
              <div className="flex gap-2 mt-1">
                <select
                  disabled={!isEditing}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm"
                  value={user.countryCode}
                  onChange={(e) => setUser({ ...user, countryCode: e.target.value })}
                >
                  <option value="+509">🇭🇹 +509</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+33">🇫🇷 +33</option>
                </select>
                <input
                  disabled={!isEditing}
                  className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-100"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`w-full mt-8 py-4 rounded-2xl font-bold transition-all ${isEditing ? 'bg-green-500 text-white' : 'bg-orange-500 text-white shadow-orange-200 shadow-lg'}`}
          >
            {isEditing ? 'Enregistrer les modifications' : 'Modifier le profil'}
          </button>
        </div>
      </div>
      <BottomNav activeTab="profile" navigate={navigate} />
    </div>
  );
};
