import React, { useState, useMemo } from 'react';
import { Screen, Transaction, User, Message, Promotion, Role } from '../types';
import BottomNav from '../components/BottomNav';

// --- MOCK DATA ---
const MOCK_TRANSACTIONS: Transaction[] = [
{
id: 'TRX-9823',
type: 'transfer',
senderName: 'Jean Avril',
senderEmail: 'jean.avril@email.com',
senderPhone: '+509 3744-0000',
receiverName: 'Marie Guerrier',
receiverPhone: '+509 3122-1122',
amount: 250,
fee: 12.5,
total: 262.5,
currency: 'USD',
company: 'MonCash',
status: 'In Progress',
date: '21 Mars 2026',
time: '14:30'
},
// ... autres transactions
];

// --- COMPOSANT PRINCIPAL ---
export const Dashboard: React.FC<{ navigate: (s: Screen) => void, role: Role }> = ({ navigate, role }) => {
const [activeTab, setActiveTab] = useState('dashboard');
const [logo, setLogo] = useState<string | null>(null);

if (role === 'admin') {
return <AdminDashboard navigate={navigate} logo={logo} setLogo={setLogo} activeTab={activeTab} setActiveTab={setActiveTab} />;
}

return (
<div className="pb-20">
<div className="p-6 bg-orange-500 text-white rounded-b-3xl shadow-lg">
<h1 className="text-2xl font-bold">Bonjour, Avril !</h1>
<p className="opacity-90">Prêt pour votre prochain transfert ?</p>
</div>
{/_ Contenu Client standard ici _/}
<BottomNav activeTab="home" navigate={navigate} />
</div>
);
};

// --- SOUS-COMPOSANT ADMIN ---
const AdminDashboard = ({ navigate, logo, setLogo, activeTab, setActiveTab }: any) => {
// Logique des filtres, recherche, et pages admin (Dashboard, Users, Promo, Messages, Settings)
// [Le code complet de l'interface admin s'insère ici...]
return (
<div className="flex min-h-screen bg-gray-100">
{/_ Sidebar, Header avec Date du jour, et Switcher de pages _/}
<aside className="w-64 bg-slate-900 text-white p-6 shadow-xl hidden md:block">
{/_ Logo et Menu latéral _/}
</aside>
<main className="flex-1 p-8">
{/_ Contenu dynamique selon activeTab _/}
</main>
</div>
);
};
