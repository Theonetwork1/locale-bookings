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

  const [profileImage, setProfileImage] = useState<string>("https://ui-avatars.com/api/?name=Jean+Avril&background=f97316&color=fff");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-orange-500 h-32 w-full pt-8 px-6">
        <h1 className="text-white text-2xl font-bold">Mon Profil</h1>
      </div>

      <div className="px-6 -mt-12">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img src={profileImage} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" alt="Profile" />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer shadow-lg">
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </label>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Prénom</label>
                <input disabled={!isEditing} className={`w-full p-2 border-b ${isEditing ? 'border-orange-500' : 'border-gray-100'}`} value={user.firstName} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Nom</label>
                <input disabled={!isEditing} className={`w-full p-2 border-b ${isEditing ? 'border-orange-500' : 'border-gray-100'}`} value={user.lastName} />
              </div>
            </div>
            
            <div className="flex gap-2">
               <div className="w-24">
                  <label className="text-xs text-gray-400 uppercase font-bold">Pays</label>
                  <select disabled={!isEditing} className="w-full p-2 border-b border-gray-100 bg-transparent">
                    <option>+509 (HT)</option>
                    <option>+1 (US)</option>
                  </select>
               </div>
               <div className="flex-1">
                  <label className="text-xs text-gray-400 uppercase font-bold">Téléphone</label>
                  <input disabled={!isEditing} className="w-full p-2 border-b border-gray-100" value={user.phone} />
               </div>
            </div>
          </div>

          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="w-full mt-8 py-3 bg-orange-500 text-white rounded-xl font-bold"
          >
            {isEditing ? "Enregistrer" : "Modifier le profil"}
          </button>
        </div>
      </div>
      <BottomNav activeTab="profile" navigate={navigate} />
    </div>
  );
};