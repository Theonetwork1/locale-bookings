# 🚀 Système de Paiement Intégré - Guide de Déploiement

## 📋 Vue d'ensemble

Ce système de paiement intégré permet :

### Côté Client :
- ✅ Paiement direct en ligne via Stripe de l'entreprise
- ✅ Option de paiement en présentiel
- ✅ Historique des paiements avec reçus
- ✅ Intégration avec la réservation de rendez-vous

### Côté Entreprise :
- ✅ Configuration de l'URL de paiement Stripe
- ✅ Suivi des revenus avec graphiques
- ✅ Historique des paiements clients
- ✅ Abonnements à la plateforme Bizli Solution

### Côté Admin :
- ✅ Dashboard des revenus de la plateforme
- ✅ Gestion des abonnements entreprises
- ✅ Analytics et métriques de paiement

---

## 🗄️ 1. Configuration de la Base de Données

### Exécuter le schéma SQL mis à jour :

```sql
-- Nouvelles tables ajoutées dans database-schema.sql :

-- Table des paiements clients vers entreprises
CREATE TABLE client_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) CHECK (payment_status IN ('pending','completed','failed','refunded')),
  external_payment_id TEXT,
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des paiements d'abonnement à la plateforme
CREATE TABLE platform_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) CHECK (payment_status IN ('pending','completed','failed','refunded')),
  external_payment_id TEXT,
  receipt_url TEXT,
  billing_period_start DATE,
  billing_period_end DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mise à jour de la table services
ALTER TABLE services ADD COLUMN online_payment_enabled BOOLEAN DEFAULT true;
ALTER TABLE services ADD COLUMN payment_required BOOLEAN DEFAULT false;
```

---

## 🔧 2. Configuration des Variables d'Environnement

### Ajouter dans votre fichier `.env` :

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Stripe Plan URLs (optionnel si vous utilisez les Edge Functions)
VITE_STRIPE_PLAN_PRO=https://checkout.stripe.com/pay/cs_test_...
VITE_STRIPE_PLAN_BUSINESS=https://checkout.stripe.com/pay/cs_test_...
VITE_STRIPE_PLAN_ENTERPRISE=https://checkout.stripe.com/pay/cs_test_...

# Stripe Price IDs pour les Edge Functions
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_BUSINESS=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# Webhook Endpoints
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_PAYMENT_WEBHOOK_SECRET=whsec_...
```

---

## 🚀 3. Déploiement des Edge Functions

### 3.1 Déployer la fonction de webhook Stripe (existante)

```bash
supabase functions deploy stripe-webhook
```

### 3.2 Déployer la nouvelle fonction de webhook des paiements clients

```bash
supabase functions deploy client-payment-webhook
```

### 3.3 Configurer les secrets Supabase

```bash
# Secrets pour les webhooks
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
supabase secrets set CLIENT_PAYMENT_WEBHOOK_SECRET=whsec_your_client_webhook_secret

# Secrets Stripe
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key
supabase secrets set STRIPE_PRICE_PRO=price_your_pro_price_id
supabase secrets set STRIPE_PRICE_BUSINESS=price_your_business_price_id
supabase secrets set STRIPE_PRICE_ENTERPRISE=price_your_enterprise_price_id
```

---

## 🎯 4. Configuration Stripe

### 4.1 Créer les produits et prix dans Stripe

1. **Accéder au Dashboard Stripe**
2. **Créer les produits** :
   - Plan Pro (ex: $29/mois)
   - Plan Business (ex: $79/mois)
   - Plan Enterprise (ex: $199/mois)

3. **Configurer les webhooks** :

**Webhook 1: Abonnements Plateforme**
- URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
- Événements: `checkout.session.completed`, `invoice.payment_failed`

**Webhook 2: Paiements Clients** 
- URL: `https://your-project.supabase.co/functions/v1/client-payment-webhook`
- Événements: `checkout.session.completed`, `payment_intent.payment_failed`, `charge.dispute.created`

---

## 📱 5. Fonctionnalités Implémentées

### 5.1 Composants de Paiement

| Composant | Description | Localisation |
|-----------|-------------|--------------|
| `PaymentModal` | Modal de sélection et traitement des paiements | `src/components/payment/PaymentModal.tsx` |
| `PaymentHistory` | Historique des paiements côté client | `src/components/payment/PaymentHistory.tsx` |
| `BusinessRevenueTracker` | Suivi des revenus entreprise | `src/components/payment/BusinessRevenueTracker.tsx` |
| `AdminPaymentDashboard` | Dashboard admin des paiements | `src/components/payment/AdminPaymentDashboard.tsx` |
| `ReceiptGenerator` | Génération de reçus automatiques | `src/components/payment/ReceiptGenerator.tsx` |

### 5.2 Intégrations dans les Pages

- ✅ **BookAppointment** : Modal de paiement après réservation
- ✅ **ClientDashboard** : Section historique des paiements
- ✅ **BusinessDashboard** : Section revenus et analytics
- ✅ **AdminAppointments** : Dashboard complet des paiements plateforme

### 5.3 Fonctions Base de Données

Nouvelles fonctions dans `src/lib/supabase.ts` :
- `createClientPayment()` - Créer un paiement client
- `updateClientPayment()` - Mettre à jour un paiement
- `getClientPaymentsByBusiness()` - Récupérer paiements par entreprise
- `getClientPaymentsByClient()` - Récupérer paiements par client
- `createPlatformPayment()` - Créer paiement d'abonnement
- `getPlatformPayments()` - Récupérer paiements plateforme
- `getBusinessRevenueSummary()` - Résumé des revenus

---

## 🔄 6. Flux de Paiement

### 6.1 Paiement Client → Entreprise

1. **Client réserve un service** → `BookAppointment.tsx`
2. **Sélection du mode de paiement** → `PaymentModal.tsx`
3. **Si paiement en ligne** :
   - Redirection vers Stripe de l'entreprise
   - Webhook confirme le paiement → `client-payment-webhook`
   - Mise à jour du statut en base
4. **Si paiement en présentiel** :
   - Enregistrement comme "pending"
   - Confirmation manuelle lors du RDV

### 6.2 Abonnement Entreprise → Plateforme

1. **Entreprise choisit un plan** → `BusinessDashboard.tsx`
2. **Redirection Stripe Checkout** → Edge Function `create-checkout-session`
3. **Confirmation de paiement** → Webhook `stripe-webhook`
4. **Mise à jour abonnement** → Table `subscriptions`

---

## 📊 7. Analytics et Reporting

### 7.1 Métriques Entreprise
- Revenus total et mensuel
- Nombre de paiements complétés/en attente
- Graphique de tendance mensuelle
- Transactions détaillées

### 7.2 Métriques Admin
- Revenus total de la plateforme
- MRR (Monthly Recurring Revenue)
- Nombre d'entreprises actives
- Répartition par plans d'abonnement
- Historique des paiements d'abonnement

---

## 🔒 8. Sécurité et Conformité

### 8.1 Sécurité des Paiements
- ✅ Aucune donnée de carte stockée localement
- ✅ Utilisation des systèmes Stripe des entreprises
- ✅ Vérification des webhooks (à implémenter en production)
- ✅ Chiffrement des communications

### 8.2 Conformité
- ✅ PCI DSS compliance via Stripe
- ✅ Reçus automatiques générés
- ✅ Historique complet des transactions
- ✅ Support des remboursements et litiges

---

## 🚀 9. Déploiement Final

### 9.1 Liste de vérification

- [ ] Base de données mise à jour avec nouveaux schémas
- [ ] Variables d'environnement configurées
- [ ] Edge Functions déployées
- [ ] Webhooks Stripe configurés
- [ ] Tests des flux de paiement
- [ ] Configuration des plans d'abonnement

### 9.2 Tests Recommandés

1. **Test Paiement Client** :
   - Réserver un service
   - Tester paiement en ligne et en présentiel
   - Vérifier mise à jour des statuts

2. **Test Abonnement Entreprise** :
   - Souscrire à un plan
   - Vérifier webhook et mise à jour base
   - Tester tableau de bord admin

3. **Test Analytics** :
   - Vérifier calculs de revenus
   - Tester filtres et graphiques
   - Valider génération de reçus

---

## 🎯 10. Prochaines Étapes (Optionnel)

### Améliorations Possibles :
- 🔄 Paiements récurrents automatiques
- 📧 Notifications email automatiques
- 📱 Intégration mobile (Apple Pay, Google Pay)
- 🔔 Alertes de paiement en temps réel
- 📈 Prédictions de revenus avec IA
- 🎫 Système de codes promo et réductions

---

**🎉 Le système de paiement intégré est maintenant prêt à être déployé !**

Pour toute question technique, référez-vous aux fichiers de code ou consultez la documentation Stripe et Supabase.
