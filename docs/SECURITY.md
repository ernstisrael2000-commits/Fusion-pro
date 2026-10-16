# Security Rules — AI SaaS Platform

> Règles obligatoires appliquées à toutes les fonctionnalités du projet.  
> Aucune fonctionnalité ne peut être développée sans respecter ce document.

---

## Principe fondamental

**Le frontend React est un environnement non sécurisé.**

Un utilisateur peut modifier le code côté client, manipuler les requêtes et tenter de contourner les limites. Par conséquent :

> Toutes les opérations sensibles sont validées **côté serveur**, sans exception.

```
❌ Interdit   : Frontend → "Ajouter 100 crédits"
✅ Correct    : Frontend → "Demande" → Backend vérifie → Backend modifie
```

---

## 1. Protection du système de crédits

Les crédits sont une valeur financière virtuelle — ils sont traités comme une donnée sensible.

**Règles :**
- Les crédits ne sont jamais modifiables depuis le frontend
- Chaque transaction est enregistrée avec un historique complet
- L'utilisateur ne peut jamais envoyer son propre montant de crédit

**Schéma Firestore — collection `credit_transactions` :**

| Champ | Type | Description |
|---|---|---|
| `id` | string | Identifiant unique |
| `user_id` | string | Référence utilisateur |
| `type` | string | `debit` / `credit` |
| `amount` | number | Montant (toujours positif) |
| `source` | string | Voir sources ci-dessous |
| `date` | timestamp | Date de la transaction |
| `status` | string | `pending` / `confirmed` / `rejected` |

**Sources valides :**
`inscription_gratuite` · `abonnement` · `publicite_regardee` · `achat` · `remboursement` · `bonus`

---

## 2. Protection contre la fraude publicitaire

Les récompenses publicitaires sont une cible d'abus prioritaire.

**Risques :** bots, répétition infinie, modification des requêtes, faux événements.

**Règles :**
- Chaque récompense est vérifiée **côté serveur**
- Limite quotidienne stricte : **10 récompenses publicitaires / jour / utilisateur**
- Chaque publicité validée est enregistrée (timestamp, user_id, ad_id)
- Détection des comportements anormaux (délai trop court, répétitions suspectes)

---

## 3. Abonnements Premium

**Plans prévus :** Free · Premium $10 · Premium $15 · Premium $25

**Règles :**
- Le statut premium est **toujours déterminé côté serveur**
- Les paiements sont vérifiés via webhooks avec signature du fournisseur
- Le serveur est la seule source de vérité pour :
  - Abonnement actif / inactif
  - Date d'expiration
  - Crédits disponibles
  - Fonctionnalités accessibles

---

## 4. OWASP Top 10 — Mesures de protection

### A01 — Broken Access Control
- Vérification des permissions sur chaque endpoint serveur
- Chaque utilisateur accède uniquement à ses propres données
- Les rôles sont contrôlés côté serveur (jamais côté client)

```
❌ /users/autre_utilisateur  → INTERDIT
✅ /users/moi-même           → validé par token serveur
```

### A02 — Cryptographic Failures
- Mots de passe gérés exclusivement par Firebase Authentication (jamais stockés en clair)
- HTTPS obligatoire en production
- Données sensibles chiffrées au repos

### A03 — Injection
- Toutes les entrées utilisateur sont validées, typées et nettoyées
- Requêtes Firestore construites avec les SDK officiels (pas de concaténation de chaînes)
- Protection contre NoSQL Injection et Command Injection

### A04 — Insecure Design
Avant chaque nouvelle fonctionnalité, analyser obligatoirement :
1. Quels abus sont possibles ?
2. Quelles données sont sensibles ?
3. Quelle validation serveur est nécessaire ?
4. Quelle règle OWASP s'applique ?

### A05 — Security Misconfiguration
```
❌ Interdit : clés API dans le code React
❌ Interdit : erreurs serveur détaillées exposées au client
❌ Interdit : règles Firebase permissives en production
✅ Obligatoire : variables d'environnement pour tous les secrets
✅ Obligatoire : configuration production séparée
```

### A06 — Vulnerable Components
- Dépendances npm maintenues à jour
- Audit régulier (`npm audit`)
- Bibliothèques inutilisées supprimées

### A07 — Identification and Authentication Failures
- Authentification via Firebase (tokens JWT vérifiés côté serveur)
- Limitation des tentatives de connexion
- Gestion sécurisée des sessions
- Vérification email si nécessaire

### A08 — Software and Data Integrity Failures
- Fichiers envoyés par les utilisateurs vérifiés (type, taille, contenu)
- Contenu utilisateur jamais exécuté directement

### A09 — Security Logging Failures
**Événements à logger obligatoirement :**
- Connexions (succès et échecs)
- Achats et transactions de crédits
- Changements de statut d'abonnement
- Erreurs serveur
- Toute action sensible

**Interdit dans les logs :**
- Mots de passe
- Clés API
- Tokens d'authentification
- Informations personnelles inutiles

### A10 — Server-Side Request Forgery (SSRF)
- Toutes les URLs fournies par les utilisateurs sont validées
- Requêtes vers adresses internes bloquées
- Liste d'autorisation des domaines externes nécessaires

---

## 5. Sécurité des APIs IA

Les clés d'accès aux modèles d'IA ne quittent jamais le serveur.

```
❌ Interdit  : React → OpenAI directement
✅ Correct   : React → Backend Node.js → API IA
```

**Mesures supplémentaires :**
- Rate limiting par utilisateur sur les endpoints IA
- Quotas de consommation surveillés
- Alertes en cas d'utilisation anormale

---

## 6. Validation des données

Toute donnée entrant dans le système est vérifiée sur :

| Critère | Exemples |
|---|---|
| **Longueur** | Limiter les champs texte |
| **Format** | Email, URL, date valides |
| **Type** | String, number, boolean attendus |
| **Permissions** | L'utilisateur a-t-il le droit ? |

> Ne jamais faire confiance aux données envoyées par l'utilisateur.

---

## 7. Sécurité Firebase

- **Firestore Rules** strictes : chaque document est accessible uniquement par son propriétaire authentifié
- **Firebase Storage** : règles de lecture/écriture limitées aux utilisateurs authentifiés, avec vérification du type de fichier
- Séparation stricte des données utilisateurs

---

## 8. Protection contre les abus

| Mesure | Détail |
|---|---|
| Rate limiting | Limite de requêtes par IP et par utilisateur |
| Détection comportement suspect | Patterns anormaux → alerte ou blocage |
| Blocage temporaire | Ban temporaire en cas d'abus détecté |
| Limites par utilisateur | Quotas sur toutes les ressources consommables |

---

## 9. Checklist sécurité — avant chaque fonctionnalité

Avant de commencer à coder une nouvelle fonctionnalité :

- [ ] Quels abus sont possibles sur cette fonctionnalité ?
- [ ] Quelles données sont sensibles ?
- [ ] Quelle validation serveur est nécessaire ?
- [ ] Quelle(s) règle(s) OWASP s'applique(nt) ?
- [ ] Les crédits ou l'abonnement sont-ils impliqués ? → validation serveur obligatoire
- [ ] Des clés API sont-elles concernées ? → jamais côté client
- [ ] Les logs capturent-ils les actions sensibles sans exposer de données privées ?

> La sécurité est prioritaire sur la rapidité de développement.  
> L'objectif est un SaaS professionnel capable de supporter des milliers d'utilisateurs.
