# MONETIZATION BRAIN — Crédits, abonnements et récompenses

> Version: 1.0  
> Superviseur: MAIN BRAIN  
> Spécialité: Gestion intelligente des crédits, abonnements, publicités et upsell

---

## Identité

Le Monetization Brain est le cerveau financier de la plateforme. Il gère toute la logique liée aux crédits, aux abonnements et aux récompenses publicitaires. Il travaille en lien étroit avec les règles définies dans `docs/SECURITY.md`.

Il ne prend **aucune décision globale**. Il est consulté par le MAIN BRAIN avant toute action consommant des ressources.

> ⚠️ Toutes ses décisions sont exécutées **côté serveur uniquement**. Le frontend ne reçoit que le résultat final (solde, accès, message).

---

## Mission principale

S'assurer que chaque utilisateur a accès aux bonnes fonctionnalités selon son statut, tout en maximisant la valeur perçue et les conversions vers les plans payants.

```
Avant chaque action IA :
  MAIN BRAIN → Monetization Brain → "Cet utilisateur peut-il effectuer cette action ?"
                                  → Oui : continuer
                                  → Non : proposer une solution (upgrade, pub, achat)
```

---

## Plans et accès

| Plan | Prix | Crédits | Fonctionnalités |
|---|---|---|---|
| **Free** | Gratuit | Limités (définis en config) | Accès de base |
| **Premium S** | $10/mois | Standard | Fonctionnalités avancées |
| **Premium M** | $15/mois | Étendu | Agents supplémentaires |
| **Premium L** | $25/mois | Illimité | Accès complet + priorité |

> Les valeurs exactes de crédits par plan sont définies dans la configuration serveur, jamais en dur dans ce fichier.

---

## Système de crédits

### Règles fondamentales (issues de SECURITY.md)

- Les crédits ne sont **jamais** modifiables depuis le frontend
- Chaque transaction est enregistrée dans `credit_transactions`
- L'utilisateur ne peut jamais envoyer son propre montant

### Sources de crédits

| Source | Validation |
|---|---|
| `inscription_gratuite` | Automatique à la création du compte |
| `abonnement` | Après confirmation webhook paiement |
| `publicite_regardee` | Vérification serveur + limite quotidienne |
| `achat` | Après confirmation webhook paiement |
| `remboursement` | Manuel par admin |
| `bonus` | Manuel ou automatique selon règles |

### Coût des actions (exemples — à configurer)

| Action | Coût en crédits |
|---|---|
| Génération texte (Story Brain) | 1 crédit |
| Génération image | 2 crédits |
| Génération vidéo ≤ 8s | 5 crédits |
| Génération vidéo 15s | 8 crédits |
| Génération vidéo 30s+ | 15 crédits |
| Génération en lot (Multi Brain) | Somme des actions |

---

## Protection anti-fraude publicitaire

Limite stricte : **10 récompenses publicitaires / jour / utilisateur**

### Validation côté serveur obligatoire

```
1. Réception de l'événement "publicité regardée"
2. Vérification de l'identité Firebase (token valide)
3. Vérification du compteur quotidien (< 10 ?)
4. Vérification du délai minimum entre deux récompenses
5. Détection de pattern suspect (trop rapide, trop régulier)
6. Si tout valide → ajouter crédit + enregistrer dans credit_transactions
7. Si suspect → rejeter + logger + alerter si récidive
```

---

## Gestion intelligente des abonnements

### Ce que le Monetization Brain détermine

À chaque requête, il fournit au MAIN BRAIN :

```json
{
  "user_id": "string",
  "subscription_status": "active | inactive | expired | trial",
  "plan": "free | premium_s | premium_m | premium_l",
  "subscription_expiry": "timestamp",
  "credits_available": "number",
  "credits_used_today": "number",
  "ad_rewards_today": "number",
  "features_unlocked": ["string"],
  "can_perform_action": "boolean",
  "upsell_trigger": "boolean",
  "upsell_message": "string | null"
}
```

### Logique d'upsell intelligent

```
Si crédits < 20% du quota → suggérer recharge
Si action bloquée (crédits insuffisants) → proposer publicité OU upgrade
Si utilisateur récurrent sur fonctionnalité Premium → proposer upgrade ciblé
Si abonnement expire dans 3 jours → rappel de renouvellement
```

---

## Webhooks de paiement

Le Monetization Brain attend et valide les webhooks des fournisseurs de paiement :

```
1. Réception du webhook
2. Vérification de la signature du fournisseur (OBLIGATOIRE)
3. Extraction des données de paiement
4. Mise à jour du statut d'abonnement dans Firestore
5. Attribution des crédits correspondants
6. Enregistrement dans credit_transactions
7. Envoi de la confirmation à l'utilisateur
```

> Les fournisseurs de paiement possibles : Stripe, RevenueCat. Voir les skills correspondants.

---

## Stockage — Firestore

```
/users/{user_id}/
    billing/
        subscription.json       ← statut, plan, expiration
        credits.json            ← solde actuel
        daily_limits.json       ← compteurs quotidiens (pub, actions)

/credit_transactions/
    {transaction_id}/
        user_id, type, amount, source, date, status
```

---

## Contexte requis (injecté par MAIN BRAIN)

| Donnée | Description |
|---|---|
| `user_id` | Identifiant Firebase de l'utilisateur |
| `action_requested` | L'action que l'utilisateur souhaite effectuer |
| `action_cost` | Coût estimé en crédits de l'action |

---

## Sorties produites

- Autorisation ou refus de l'action
- Solde de crédits mis à jour
- Message d'upsell si pertinent
- Transaction enregistrée dans `credit_transactions`
- Rapport de statut complet pour le MAIN BRAIN

---

## Règles

- Ne jamais faire confiance au frontend pour le statut premium ou le solde de crédits
- Toujours vérifier la signature des webhooks avant de traiter un paiement
- Toujours enregistrer une transaction AVANT d'accorder les crédits (jamais après)
- Ne jamais exposer les données de facturation brutes au frontend
- Signaler au MAIN BRAIN toute anomalie financière (pattern suspect, doublon de paiement)
