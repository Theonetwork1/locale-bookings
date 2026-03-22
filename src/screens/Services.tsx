import React, { useState } from "react";
import { Layout, Header } from "../components/Layout";
import { Screen } from "../types";

interface ServiceProps {
  navigate: (screen: Screen) => void;
}

export const RechargeScreen: React.FC<ServiceProps> = ({ navigate }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10);
  const [isSubscription, setIsSubscription] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fee = selectedAmount ? selectedAmount * 0.05 : 0;
  const total = selectedAmount ? selectedAmount + fee : 0;

  const handleImportContact = async () => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        const props = ["tel"];
        const opts = { multiple: false };
        // @ts-ignore
        const contacts = await navigator.contacts.select(props, opts);
        if (contacts.length > 0) {
          if (contacts[0].tel && contacts[0].tel.length > 0) {
            // Clean up phone number
            const cleaned = contacts[0].tel[0].replace(/\D/g, "");
            setPhoneNumber(cleaned);
          }
        }
      } catch (ex) {
        console.error("Error importing contact:", ex);
        alert("Impossible d'importer le contact.");
      }
    } else {
      alert("L'importation de contacts n'est pas supportée sur ce navigateur.");
    }
  };

  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <Header title="Recharge téléphonique" onBack={() => navigate(Screen.DASHBOARD)} />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-32">
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Numéro du bénéficiaire</label>
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">+509</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-14 pl-16 pr-4 bg-surface dark:bg-card-dark border-transparent focus:border-primary rounded-xl font-bold text-lg outline-none ring-1 ring-gray-200 dark:ring-gray-700"
                placeholder="3XXX-XXXX"
              />
            </div>
            <button
              onClick={handleImportContact}
              className="h-14 px-4 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
              title="Importer un contact"
            >
              <span className="material-symbols-outlined">contact_phone</span>
            </button>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-xs font-bold text-danger flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">signal_cellular_alt</span> Digicel / Natcom
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <h3 className="font-bold">Montant (USD)</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[5, 10, 20, 50].map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={`p-4 rounded-xl border-2 text-left relative transition-all ${selectedAmount === amt ? "border-primary bg-primary/5" : "border-transparent bg-surface dark:bg-card-dark"}`}
              >
                <div className="text-2xl font-bold">${amt}</div>
                {selectedAmount === amt && (
                  <span className="material-symbols-outlined absolute bottom-3 right-3 text-primary text-xl">
                    check_circle
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-surface dark:bg-card-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="font-bold text-sm text-slate-800 dark:text-white">Planifier un abonnement</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isSubscription}
                onChange={() => setIsSubscription(!isSubscription)}
              />
              <div
                className={`block w-10 h-6 rounded-full transition-colors ${isSubscription ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isSubscription ? "transform translate-x-4" : ""}`}
              ></div>
            </div>
          </label>

          {isSubscription && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4 animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Fréquence</label>
                <select className="w-full h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm">
                  <option>Chaque semaine</option>
                  <option>Chaque mois</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Date de début</label>
                <input
                  type="date"
                  className="w-full h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">
                La transaction se fera automatiquement à la date choisie. Vous recevrez une notification de succès ou
                d'échec.
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Informations de paiement (Carte)</label>
          <div className="bg-surface dark:bg-card-dark rounded-xl p-4 ring-1 ring-gray-200 dark:ring-gray-700">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nom sur la carte"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm font-medium"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Numéro de carte"
                className="w-full h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm font-mono"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/AA"
                className="w-1/2 h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm font-mono"
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-1/2 h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm font-mono"
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <span className="material-symbols-outlined text-sm">lock</span>
              Paiement sécurisé par Stripe
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark absolute bottom-0 w-full z-10">
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          Payer et envoyer
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-card-dark w-full max-w-md rounded-3xl p-6 shadow-xl relative animate-in slide-in-from-bottom-10">
            <h2 className="text-xl font-display font-bold mb-6">Confirmer la recharge</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Bénéficiaire</span>
                <span className="font-bold text-slate-800 dark:text-white">{phoneNumber || "Non renseigné"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Montant</span>
                <span className="font-bold text-slate-800 dark:text-white">${selectedAmount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Frais de transaction (5%)</span>
                <span className="font-bold text-slate-800 dark:text-white">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="font-bold text-lg">Total à payer</span>
                <span className="font-bold text-primary text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-slate-800 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={() => navigate(Screen.RECEIPT)}
                className="flex-1 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const TransferScreen: React.FC<ServiceProps> = ({ navigate }) => {
  const [isSubscription, setIsSubscription] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [cardName, setCardName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const parsedAmount = parseFloat(amount) || 0;
  const fee = parsedAmount * 0.05;
  const total = parsedAmount + fee;

  const handleImportContact = async () => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        const props = ["name", "tel"];
        const opts = { multiple: false };
        // @ts-ignore
        const contacts = await navigator.contacts.select(props, opts);
        if (contacts.length > 0) {
          if (contacts[0].name && contacts[0].name.length > 0) {
            const parts = contacts[0].name[0].split(" ");
            setFirstName(parts[0] || "");
            setLastName(parts.slice(1).join(" ") || "");
          }
          if (contacts[0].tel && contacts[0].tel.length > 0) {
            // Clean up phone number
            const cleaned = contacts[0].tel[0].replace(/\D/g, "");
            setPhoneNumber(cleaned);
          }
        }
      } catch (ex) {
        console.error("Error importing contact:", ex);
        alert("Impossible d'importer le contact.");
      }
    } else {
      alert("L'importation de contacts n'est pas supportée sur ce navigateur.");
    }
  };

  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <Header title="Transfert d'argent" onBack={() => navigate(Screen.DASHBOARD)} />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-32">
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-bold mb-2">Prénom *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-14 px-4 bg-surface dark:bg-card-dark border-transparent focus:border-primary rounded-xl font-bold text-lg outline-none ring-1 ring-gray-200 dark:ring-gray-700"
              placeholder="Ex: Jean"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-2">Nom *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-14 px-4 bg-surface dark:bg-card-dark border-transparent focus:border-primary rounded-xl font-bold text-lg outline-none ring-1 ring-gray-200 dark:ring-gray-700"
              placeholder="Ex: Pierre"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Numéro MonCash / NatCash *</label>
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">+509</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-14 pl-16 pr-4 bg-surface dark:bg-card-dark border-transparent focus:border-primary rounded-xl font-bold text-lg outline-none ring-1 ring-gray-200 dark:ring-gray-700"
                placeholder="3XXX-XXXX"
              />
            </div>
            <button
              onClick={handleImportContact}
              className="h-14 px-4 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
              title="Importer un contact"
            >
              <span className="material-symbols-outlined">contact_phone</span>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Adresse (Optionnel)</label>
          <input
            type="text"
            className="w-full h-14 px-4 bg-surface dark:bg-card-dark border-transparent focus:border-primary rounded-xl font-bold text-lg outline-none ring-1 ring-gray-200 dark:ring-gray-700"
            placeholder="Ex: Port-au-Prince, Haïti"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Montant à transférer (USD) *</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-14 px-4 bg-surface dark:bg-card-dark border-transparent focus:border-primary rounded-xl font-bold text-lg outline-none ring-1 ring-gray-200 dark:ring-gray-700"
            placeholder="0.00 USD"
          />
        </div>

        <div className="mb-6 bg-surface dark:bg-card-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="font-bold text-sm text-slate-800 dark:text-white">Planifier un abonnement</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isSubscription}
                onChange={() => setIsSubscription(!isSubscription)}
              />
              <div
                className={`block w-10 h-6 rounded-full transition-colors ${isSubscription ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isSubscription ? "transform translate-x-4" : ""}`}
              ></div>
            </div>
          </label>

          {isSubscription && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4 animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Fréquence</label>
                <select className="w-full h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm">
                  <option>Chaque semaine</option>
                  <option>Chaque mois</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Date de début</label>
                <input
                  type="date"
                  className="w-full h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">
                La transaction se fera automatiquement à la date choisie. Vous recevrez une notification de succès ou
                d'échec.
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Informations de paiement (Carte)</label>
          <div className="bg-surface dark:bg-card-dark rounded-xl p-4 ring-1 ring-gray-200 dark:ring-gray-700">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nom sur la carte"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm font-medium"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Numéro de carte"
                className="w-full h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm font-mono"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/AA"
                className="w-1/2 h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm font-mono"
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-1/2 h-12 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-primary text-sm font-mono"
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <span className="material-symbols-outlined text-sm">lock</span>
              Paiement sécurisé par Stripe
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3">
          <span className="material-symbols-outlined text-primary">info</span>
          <p className="text-xs text-blue-900 dark:text-blue-100">
            Les transferts sont instantanés vers les comptes MonCash et NatCash.
          </p>
        </div>
      </div>

      <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark absolute bottom-0 w-full z-10">
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          Confirmer le transfert
          <span className="material-symbols-outlined">payments</span>
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-card-dark w-full max-w-md rounded-3xl p-6 shadow-xl relative animate-in slide-in-from-bottom-10">
            <h2 className="text-xl font-display font-bold mb-6">Confirmer le transfert</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Bénéficiaire</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {firstName} {lastName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Numéro</span>
                <span className="font-bold text-slate-800 dark:text-white">{phoneNumber || "Non renseigné"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Montant</span>
                <span className="font-bold text-slate-800 dark:text-white">${parsedAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Frais de transaction (5%)</span>
                <span className="font-bold text-slate-800 dark:text-white">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="font-bold text-lg">Total à payer</span>
                <span className="font-bold text-primary text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-slate-800 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={() => navigate(Screen.RECEIPT)}
                className="flex-1 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const ReceiptScreen: React.FC<ServiceProps> = ({ navigate }) => {
  return (
    <Layout className="bg-surface dark:bg-surface-dark">
      <div className="flex-1 flex flex-col items-center pt-12 px-6">
        <div className="size-20 bg-secondary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(13,242,51,0.4)] mb-6 animate-bounce">
          <span className="material-symbols-outlined text-4xl text-black">check</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Succès !</h1>
        <p className="text-gray-500 mb-8 text-center">Votre transaction a été traitée avec succès.</p>

        <div className="w-full bg-white dark:bg-card-dark rounded-2xl p-6 shadow-sm relative">
          <div className="text-center mb-6 border-b border-dashed border-gray-200 dark:border-gray-700 pb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Montant Total</p>
            <div className="text-4xl font-black text-slate-900 dark:text-white">500 HTG</div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Service</span>
              <span className="font-bold text-sm">Transaction Digitale</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Numéro</span>
              <span className="font-mono font-bold text-sm">+509 37 12 3456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Date</span>
              <span className="font-bold text-sm">Aujourd'hui</span>
            </div>
          </div>

          <div className="mt-6 bg-surface dark:bg-black/20 p-3 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold">ID Transaction</p>
              <p className="font-mono font-bold text-sm">#TXN-882910</p>
            </div>
            <button className="text-primary">
              <span className="material-symbols-outlined text-lg">content_copy</span>
            </button>
          </div>
        </div>

        <div className="w-full mt-8 gap-3 flex flex-col">
          <button
            onClick={() => navigate(Screen.DASHBOARD)}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </Layout>
  );
};
