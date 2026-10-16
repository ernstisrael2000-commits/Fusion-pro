# Fusion AI — Architecture Document
## Version 1.0 — System Blueprint

---

## 1. Vision du projet

**Fusion AI** est une plateforme intelligente de création de contenu vidéo et multimédia assistée par intelligence artificielle.

L'objectif est de créer un studio créatif IA capable d'aider les créateurs à transformer une idée simple en :

- Histoires complètes et scénarios
- Images cohérentes générées par IA
- Vidéos générées par IA
- Séries de contenus
- Contenus adaptés aux réseaux sociaux

> Fusion AI n'est pas seulement un générateur — c'est un **système créatif intelligent** basé sur une architecture multi-agents orchestrée par un cerveau central.

---

## 2. Principe architectural fondamental

```
TOUTES LES ACTIONS DOIVENT PASSER PAR LE MASTER BRAIN.
Aucun module ne fonctionne indépendamment sans contexte.
```

Le Master Brain est responsable de :
- Comprendre l'utilisateur
- Analyser l'objectif
- Organiser les tâches
- Appeler les bons modules
- Contrôler la qualité
- Maintenir la cohérence globale

**Règle absolue — avant toute nouvelle fonctionnalité :**

| Question | Obligatoire |
|---|---|
| Quel est son rôle ? | ✅ |
| Quel cerveau est responsable ? | ✅ |
| Comment communique-t-elle avec le Master Brain ? | ✅ |
| Comment maintient-elle la cohérence du système ? | ✅ |

---

## 3. Architecture générale

```
Utilisateur
    │
    ▼
Interface Fusion AI (React + TypeScript)
    │
    ▼
AI Orchestrator (Node.js + TypeScript)
    │
    ▼
MASTER BRAIN
    │
    ├── Story Brain          → Narration, scénarios, structure
    ├── Image Brain          → Prompts visuels, direction artistique
    ├── Video Brain          → Prompts vidéo, découpage, caméra
    ├── Continuity Brain     → Cohérence globale inter-générations
    ├── Video Continuity Brain → Extension de séquences vidéo
    ├── Quality Brain        → Validation avant livraison
    ├── Memory Brain         → Préférences et historique utilisateur
    ├── Monetization Brain   → Crédits, abonnements, récompenses
    └── Security Brain       → Permissions, validation, anti-abus
```

---

## 4. Structure des fichiers cerveau

```
/brain
    /core
        main_brain.md              ← Master Brain (chef d'orchestre)
    /skills
        story.md                   ← Story Brain
        image.md                   ← Image Brain
        video.md                   ← Video Brain
        continuity.md              ← Continuity Brain
        video_continuity.md        ← Video Continuity Brain
        quality.md                 ← Quality Brain
        monetization.md            ← Monetization Brain
        security_brain.md          ← Security Brain
    /memory
        user_memory.md             ← Memory Brain
    /rules
        duration_adaptation.md     ← Règles de durée vidéo
        model_adaptation.md        ← Règles d'adaptation par modèle IA
```

**Chaque fichier cerveau est :**
- Indépendant
- Documenté
- Modifiable
- Versionnable
- Spécialisé

---

## 5. Pipeline de création — vidéo complète

```
Étape 1 : Analyse utilisateur
    │  L'utilisateur décrit son idée
    ▼
Étape 2 : Master Brain — compréhension de l'objectif
    │  Analyse de l'intention, questions si contexte insuffisant
    ▼
Étape 3 : Story Brain — création du scénario
    │  Structure narrative, personnages, arc dramatique
    ▼
Étape 4 : Master Brain + Story Brain — découpage en scènes
    │  Chaque scène définie avec objectif, durée, personnages
    ▼
Étape 5 : Image Brain — prompts images par scène
    │  Direction artistique, cohérence visuelle, style
    ▼
Étape 6 : Video Brain — prompts vidéo par scène
    │  Adaptation durée, mouvements caméra, modèle cible
    ▼
Étape 7 : Quality Brain — validation
    │  Cohérence, qualité, correction si nécessaire
    ▼
Étape 8 : Livraison utilisateur
       Résultat structuré, options de téléchargement
```

---

## 6. Gestion du contexte global

Aucune scène ne peut être générée sans contexte. Chaque génération conserve :

| Élément | Description |
|---|---|
| Personnages | Apparence, nom, personnalité |
| Vêtements | Description précise par personnage |
| Style artistique | Direction artistique globale |
| Environnement | Décor, époque, ambiance |
| Émotions | État émotionnel de la scène |
| Événements précédents | Ce qui s'est passé avant |

---

## 7. Système de continuité vidéo

Fusion AI supporte l'**extension vidéo** — transformer un clip court en séquence longue.

```
Clip 1 (8s) + Clip 2 (8s) = Vidéo finale (16s)
Clip 1 (8s) + Clip 2 (8s) + Clip 3 (8s) = Vidéo finale (24s)
```

Le système conserve entre chaque clip :
- Dernier frame du clip précédent
- Position des personnages
- Mouvement caméra en cours
- Ambiance et lumière
- Narration en cours

→ Voir `brain/skills/video_continuity.md` pour les règles détaillées.

---

## 8. Adaptation aux modèles IA

Le Master Brain adapte chaque génération aux capacités du modèle cible :

| Contrainte | Adaptation |
|---|---|
| Durée maximale du modèle | Découpage automatique des scènes |
| Syntaxe du modèle | Reformatage du prompt |
| Complexité supportée | Simplification si nécessaire |
| Rythme et nombre d'actions | Ajustement selon les règles de durée |

→ Voir `brain/rules/model_adaptation.md` et `brain/rules/duration_adaptation.md`.

---

## 9. Système de mémoire

### Mémoire session (temporaire)
- Projet actuel
- Scène en cours
- Personnages actifs
- Contexte de la conversation

### Mémoire utilisateur (persistante — Firestore)
- Style préféré
- Personnages récurrents
- Types de contenus favoris
- Habitudes créatives
- Historique des projets

→ Voir `brain/memory/user_memory.md` pour les règles détaillées.

---

## 10. Système d'évolution du cerveau

```
Observation → Analyse → Suggestion d'amélioration → Validation → Nouvelle version
```

- Toutes les modifications de fichiers cerveau sont versionnées
- Chaque fichier indique sa version en en-tête
- Une modification majeure incrémente la version (1.0 → 2.0)
- Une modification mineure incrémente le patch (1.0 → 1.1)

---

## 11. Principes de développement

Avant toute création de code :

1. Comprendre l'architecture définie dans ce document
2. Lire les fichiers cerveau concernés
3. Lire `docs/SECURITY.md` et répondre à la checklist sécurité
4. Respecter les flux définis dans le pipeline
5. Ne jamais contourner le Master Brain

---

## 12. Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React + TypeScript (Mobile First) |
| Backend / Orchestrateur | Node.js + TypeScript |
| Base de données | Firebase Firestore |
| Authentification | Firebase Authentication |
| Stockage fichiers | Firebase Storage |
| IA | OpenAI + Google Gemini (multi-fournisseurs) |

→ Voir `VISION.md` pour les détails complets du stack.  
→ Voir `docs/SECURITY.md` pour les règles de sécurité.
