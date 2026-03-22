import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Screen } from "../types";

interface Props {
  navigate: (screen: Screen) => void;
}

export const ContactScreen: React.FC<Props> = ({ navigate }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <div className="flex-1 px-6 pt-8 flex flex-col">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => navigate(Screen.WELCOME)} className="text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-6">Contactez-nous</h1>

        {isSubmitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg text-sm text-center">
            Merci pour votre message. Nous vous contacterons bientôt.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              required
              type="text"
              placeholder="Nom complet"
              className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
            />
            <input
              required
              type="email"
              placeholder="Adresse email"
              className="w-full h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
            />
            <textarea
              required
              placeholder="Votre message"
              rows={5}
              className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium h-12 rounded-lg shadow-md shadow-primary/20 mt-2 active:scale-[0.98] transition-all"
            >
              Envoyer le message
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-bold text-slate-800 dark:text-white"
      >
        <span className="pr-4">{question}</span>
        <span className="material-symbols-outlined text-primary shrink-0">
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>
      {isOpen && (
        <p className="mt-3 text-sm text-slate-600 dark:text-gray-400 leading-relaxed animate-in fade-in slide-in-from-top-2">
          {answer}
        </p>
      )}
    </div>
  );
};

export const AboutScreen: React.FC<Props> = ({ navigate }) => {
  const faqs = [
    {
      question: "1️⃣ Combien de temps prend un transfert vers Haïti ?",
      answer:
        "Les transferts sont généralement instantanés ou traités en quelques minutes.\nDans certains cas, un délai supplémentaire peut être nécessaire pour des vérifications de sécurité.",
    },
    {
      question: "2️⃣ Quels sont les frais pour envoyer de l’argent ?",
      answer:
        "Les frais varient selon le montant envoyé et sont clairement affichés avant validation.\nAucun frais caché — vous voyez exactement ce que vous payez.",
    },
    {
      question: "3️⃣ Comment le destinataire reçoit-il l’argent ?",
      answer:
        "Le bénéficiaire reçoit l’argent directement sur son compte MonCash ou NatCash, prêt à être utilisé ou retiré.",
    },
    {
      question: "4️⃣ Est-ce que mes paiements sont sécurisés ?",
      answer:
        "Oui. Toutes les transactions sont protégées par des systèmes de sécurité avancés, incluant le chiffrement et la vérification des paiements.",
    },
    {
      question: "5️⃣ Puis-je annuler une transaction ?",
      answer:
        "Une fois la transaction confirmée et envoyée, elle ne peut généralement pas être annulée.\nCependant, notre support est disponible pour vous assister en cas de problème.",
    },
    {
      question: "Quels moyens de paiement sont acceptés ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard).",
    },
  ];

  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <div className="flex-1 px-6 pt-8 pb-12 overflow-y-auto flex flex-col">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => navigate(Screen.WELCOME)} className="text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-6">À propos de nous</h1>

        <div className="text-sm text-slate-600 dark:text-gray-300 space-y-4 leading-relaxed mb-10">
          <p>
            Goudela Money Transfer est une plateforme digitale conçue pour simplifier la vie de la diaspora haïtienne.
            Nous permettons d’envoyer de l’argent et de recharger des téléphones en Haïti, rapidement, en toute sécurité
            et en quelques clics.
          </p>
          <p>
            Notre mission est de rapprocher les familles, en offrant des solutions fiables, accessibles et modernes pour
            soutenir ceux qui comptent le plus.
          </p>
          <p>
            Grâce à notre technologie, les transferts et recharges sont traités efficacement, avec une transparence
            totale sur les frais et les délais.
          </p>
          <p className="font-medium text-slate-800 dark:text-white">
            Chez Goudela Money Transfer, nous mettons la sécurité, la rapidité et la confiance au cœur de chaque
            transaction.
          </p>
        </div>

        <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-2">Questions fréquentes</h2>
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const TermsScreen: React.FC<Props> = ({ navigate }) => {
  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <div className="flex-1 px-6 pt-8 pb-12 overflow-y-auto flex flex-col">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => navigate(Screen.WELCOME)} className="text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-6">
          Conditions d'utilisation
        </h1>

        <div className="text-sm text-slate-600 dark:text-gray-300 space-y-6 leading-relaxed">
          <p className="font-medium text-slate-800 dark:text-white">
            En utilisant Goudela Money Transfer, vous acceptez les présentes conditions:
          </p>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">1. Services</h3>
            <p>GMT permet :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>l’envoi d’argent vers Haïti</li>
              <li>la recharge de crédit téléphonique</li>
            </ul>
            <p className="mt-2">
              Les transactions sont soumises à vérification et peuvent être refusées en cas de suspicion de fraude.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">2. Compte utilisateur</h3>
            <p>Vous devez :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>fournir des informations exactes</li>
              <li>sécuriser votre compte</li>
              <li>ne pas utiliser le service à des fins illégales</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">3. Paiements</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Les paiements sont effectués par carte bancaire</li>
              <li>Des frais peuvent s’appliquer</li>
              <li>Les taux de change sont affichés avant confirmation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">4. Délais & disponibilité</h3>
            <p>
              Les transferts sont généralement rapides, mais peuvent être retardés pour des raisons techniques ou de
              conformité.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">5. Responsabilité</h3>
            <p>Monezix ne peut être tenu responsable en cas :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>d’erreur utilisateur</li>
              <li>de problème réseau externe</li>
              <li>de refus par un partenaire</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">6. Suspension</h3>
            <p>Nous pouvons suspendre un compte en cas de :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>fraude</li>
              <li>activité suspecte</li>
              <li>violation des conditions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">7. Modifications</h3>
            <p>Ces conditions peuvent être mises à jour à tout moment.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const PrivacyScreen: React.FC<Props> = ({ navigate }) => {
  return (
    <Layout className="bg-white dark:bg-surface-dark">
      <div className="flex-1 px-6 pt-8 pb-12 overflow-y-auto flex flex-col">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => navigate(Screen.WELCOME)} className="text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-6">
          Politique de confidentialité
        </h1>

        <div className="text-sm text-slate-600 dark:text-gray-300 space-y-6 leading-relaxed">
          <p className="font-medium text-slate-800 dark:text-white">
            Chez Goudela Money Transfer, la protection de vos données est une priorité.
          </p>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">1. Données collectées</h3>
            <p>Nous collectons :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>informations personnelles (nom, email, téléphone)</li>
              <li>informations de paiement</li>
              <li>données de transaction</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">2. Utilisation des données</h3>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>traiter vos transactions</li>
              <li>vérifier votre identité (KYC)</li>
              <li>prévenir la fraude</li>
              <li>améliorer nos services</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">3. Sécurité</h3>
            <p>
              Nous utilisons des mesures de sécurité avancées pour protéger vos informations, y compris le chiffrement
              des données.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">4. Partage des données</h3>
            <p>Vos données peuvent être partagées avec :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>partenaires de paiement</li>
              <li>services de conformité</li>
              <li>autorités légales si requis</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">5. Conservation</h3>
            <p>Vos données sont conservées conformément aux obligations légales.</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">6. Vos droits</h3>
            <p>Vous pouvez :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>accéder à vos données</li>
              <li>demander leur modification</li>
              <li>demander leur suppression (selon la loi)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">7. Contact</h3>
            <p>
              Pour toute question :{" "}
              <a href="mailto:contact@goudela.com" className="text-primary font-medium">
                contact@goudela.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
