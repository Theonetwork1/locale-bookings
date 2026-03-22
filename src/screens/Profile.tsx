import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Screen } from "../types";
import { BottomNav } from "../components/BottomNav";

interface Props {
  navigate: (screen: Screen) => void;
  currentScreen: Screen;
}

export const ProfileScreen: React.FC<Props> = ({ navigate, currentScreen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Theo",
    lastName: "Avril",
    email: "theo@example.com",
    phone: "555-0123",
    countryCode: "+1",
    photo: "https://picsum.photos/seed/user1/200/200",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile({ ...profile, photo: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <Layout className="bg-surface dark:bg-surface-dark pb-20">
      <div className="px-6 pt-12 pb-6 bg-white dark:bg-card-dark rounded-b-3xl shadow-sm">
        <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white">Profil</h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Gérez vos informations personnelles</p>
      </div>

      <div className="px-6 mt-6">
        {isSaved && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm text-center transition-all">
            Profil mis à jour avec succès !
          </div>
        )}
        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="size-24 rounded-full border-4 border-primary overflow-hidden relative">
              <img src={profile.photo} alt="User" className="w-full h-full object-cover" />
              {isEditing && (
                <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer">
                  <span className="material-symbols-outlined text-white">photo_camera</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary text-sm"
                  />
                ) : (
                  <div className="h-12 flex items-center px-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    {profile.firstName}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary text-sm"
                  />
                ) : (
                  <div className="h-12 flex items-center px-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    {profile.lastName}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary text-sm"
                />
              ) : (
                <div className="h-12 flex items-center px-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                  {profile.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Téléphone</label>
              {isEditing ? (
                <div className="flex gap-2">
                  <select
                    value={profile.countryCode}
                    onChange={(e) => setProfile({ ...profile, countryCode: e.target.value })}
                    className="h-12 w-24 sm:w-28 flex-shrink-0 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 outline-none focus:border-primary text-sm"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+509">🇭🇹 +509</option>
                    <option value="+1">🇨🇦 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="flex-1 min-w-0 h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary text-sm"
                  />
                </div>
              ) : (
                <div className="h-12 flex items-center px-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                  {profile.countryCode} {profile.phone}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium h-12 rounded-lg shadow-md transition-all"
              >
                Enregistrer les modifications
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-white font-medium h-12 rounded-lg shadow-sm hover:bg-gray-50 transition-all"
              >
                Modifier le profil
              </button>
            )}
          </div>

          {!isEditing && (
            <div className="mt-4">
              <button
                onClick={() => navigate(Screen.WELCOME)}
                className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 font-medium h-12 rounded-lg transition-all"
              >
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} navigate={navigate} />
    </Layout>
  );
};
