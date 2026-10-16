# AI Brain System — Vision du projet

> Document de vision fondateur. Toute décision d'architecture doit être cohérente avec ce document.

---

## 1. Contexte

Ce projet vise à construire un **cerveau IA central** sous forme de plateforme SaaS professionnelle. Ce n'est pas une simple application qui appelle une API d'IA : c'est un système d'orchestration multi-agents conçu pour analyser, planifier, distribuer et améliorer continuellement ses résultats.

Le cerveau fonctionne selon un cycle permanent :

```
Analyser → Décider → Distribuer → Vérifier → Améliorer
```

---

## 2. Vision globale

Le système doit être capable de :

- Comprendre les **intentions** de l'utilisateur
- Analyser des **problèmes complexes**
- Planifier les **actions nécessaires**
- Sélectionner et coordonner les **bons agents spécialisés**
- Conserver une **mémoire** des projets et préférences
- **Apprendre** grâce aux nouvelles instructions
- **S'améliorer** continuellement

Le Master Brain est un chef d'orchestre : il ne réalise pas toutes les tâches lui-même, il décide qui les fait et vérifie la qualité.

---

## 3. Architecture du cerveau IA

### Niveau 1 — Master Brain (cerveau principal)

Centre de décision du système.

| Responsabilité | Description |
|---|---|
| Compréhension | Analyser la demande et identifier l'objectif final |
| Décomposition | Découper les problèmes complexes en sous-tâches |
| Sélection | Choisir le(s) agent(s) approprié(s) |
| Contrôle qualité | Vérifier et valider les résultats |
| Mémoire | Gérer le contexte, l'historique et les préférences |

---

### Niveau 2 — Agents spécialisés

Le système s'appuie sur des agents indépendants et interchangeables :

| Agent | Responsabilités |
|---|---|
| **Agent Créatif** | Idéation, écriture, storytelling, concepts créatifs |
| **Agent Image** | Prompts visuels, direction artistique, cohérence graphique, styles |
| **Agent Vidéo** | Scénarios, découpage en scènes, mouvements caméra, descriptions cinématographiques |
| **Agent Analyse** | Recherche, comparaison, optimisation, recommandations stratégiques |

> L'architecture doit permettre d'ajouter de nouveaux agents sans modifier le Master Brain.

---

## 4. Stack technique

### Frontend

| Technologie | Rôle |
|---|---|
| React + TypeScript | Base de l'interface utilisateur |
| (Next.js recommandé) | SSR, routing, performance |

**Fonctionnalités frontend :**
- Interface conversationnelle avec le cerveau IA
- Tableau de bord utilisateur
- Gestion des projets
- Affichage des résultats et fichiers générés
- Paramètres utilisateur et agents

> Le frontend ne contient **aucune** clé API ni logique sensible. Il communique uniquement avec le backend Node.js.

---

### Backend

| Technologie | Rôle |
|---|---|
| Node.js + TypeScript | Orchestration principale, logique métier |
| API REST / WebSocket | Communication avec le frontend |

**Responsabilités backend :**
- Orchestration du Master Brain et des agents
- Gestion des appels aux APIs d'IA
- Sécurité (authentification, autorisation)
- Communication avec Firebase

---

### Intelligence artificielle

Le système doit être **multi-fournisseurs** — aucune dépendance exclusive.

| Fournisseur | Usage |
|---|---|
| OpenAI API | Modèles GPT (raisonnement, texte) |
| Google Gemini API | Modèles Gemini (multimodal, analyse) |
| Autres modèles | Ajout possible selon les besoins |

> L'architecture doit permettre de remplacer ou d'ajouter un modèle sans refactoring majeur (pattern Adapter / Strategy).

---

### Base de données et mémoire — Firebase

| Service Firebase | Usage |
|---|---|
| **Authentication** | Comptes utilisateurs, connexion, permissions |
| **Firestore** | Mémoire du cerveau IA, historique des conversations, projets, préférences, configuration des agents |
| **Storage** | Images, vidéos, documents, fichiers générés |

---

### Python (optionnel — v2+)

Python n'est pas requis pour la v1. Il pourra être ajouté pour :
- Traitement d'image avancé
- Analyse vidéo
- Machine learning personnalisé
- Calculs complexes

Architecture cible : **Node.js = orchestration principale / Python = microservices IA spécialisés**

---

## 5. Structure du projet

```
/
├── frontend/          # React + TypeScript (interface utilisateur)
│   └── src/
│       ├── components/    # Composants réutilisables
│       ├── pages/         # Interfaces / routes
│       ├── services/      # Communication API
│       ├── hooks/         # Logique React personnalisée
│       ├── context/       # État global
│       ├── utils/         # Fonctions utilitaires
│       └── assets/        # Ressources visuelles
│
├── backend/           # Node.js + TypeScript (cerveau technique)
│   ├── api/               # Routes et contrôleurs
│   ├── brain/             # Logique Master Brain
│   └── services/          # Services externes (Firebase, IA)
│
├── agents/            # Agents spécialisés
│
├── firebase/          # Configuration et règles de sécurité Firebase
│
├── prompts/           # Instructions système du cerveau IA
│
└── docs/              # Documentation technique
```

---

## 6. Règles absolues de développement

1. **Analyser avant de coder** — toujours comprendre l'impact sur l'architecture existante
2. **Zéro code inutile** — chaque fichier a un rôle précis
3. **Sécurité par design** — toutes les clés API restent côté serveur, jamais exposées au client
4. **Architecture propre et scalable** — séparation stricte frontend / backend / agents IA
5. **Indépendance des fournisseurs IA** — pattern Adapter pour chaque modèle
6. **Mobile First** — le design est pensé smartphone avant ordinateur
7. **Vérifier les impacts** avant toute modification d'une partie partagée

---

## 7. Standards d'interface utilisateur

### Responsive Design (obligatoire)

- **Mobile First** — conçu pour smartphone, adapté aux grands écrans
- Aucun défilement horizontal involontaire
- Textes, boutons et formulaires adaptés à tous les formats
- Compatible tablette, ordinateur portable et desktop

### Compatibilité navigateurs

| Navigateur | Support |
|---|---|
| Google Chrome | ✅ |
| Safari (desktop + iOS) | ✅ |
| Microsoft Edge | ✅ |
| Firefox | ✅ |
| Navigateurs mobiles Android | ✅ |

### Accessibilité

- Navigation clavier
- Compatibilité lecteurs d'écran
- Contraste des couleurs suffisant (WCAG AA minimum)
- Attributs ARIA appropriés
- Formulaires et boutons correctement étiquetés

### Checklist avant de valider une fonctionnalité

- [ ] Responsive sur mobile, tablette et desktop
- [ ] Compatible tous navigateurs cibles
- [ ] Accessible (clavier, lecteur d'écran, contraste)
- [ ] Performant (chargement, taille des ressources)

---

## 8. Phases de développement

| Phase | Contenu |
|---|---|
| **Phase 1 — Architecture** | Schéma technique, structure des données, organisation des fichiers |
| **Phase 2 — Fondations** | Authentification Firebase, structure backend, communication frontend/backend |
| **Phase 3 — Master Brain** | Logique centrale d'orchestration et de mémoire |
| **Phase 4 — Agents** | Intégration progressive des agents spécialisés |
| **Phase 5 — Qualité** | Sécurité, performances, expérience utilisateur |

---

## 9. Objectif final

Construire une **plateforme IA professionnelle** pouvant devenir :

- Un **produit SaaS** commercialisable
- Une **plateforme multi-agents** extensible
- Un **assistant intelligent** à valeur ajoutée élevée
- Un **système évolutif** capable d'intégrer de nouvelles compétences

> La priorité n'est pas de livrer vite une application fonctionnelle.  
> La priorité est de bâtir une **architecture solide** capable de supporter un produit professionnel à grande échelle.
