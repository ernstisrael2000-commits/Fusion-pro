# MASTER BRAIN — Architecture du cerveau principal

> Version: 2.0  
> Rôle: Point d'entrée unique. Chef d'orchestre. Gardien de la cohérence.  
> Projet: Fusion AI

---

## Mission

Le Master Brain est le cerveau central de Fusion AI. Il est le **seul point de contact** avec l'utilisateur et le **seul décideur** de l'architecture des tâches.

Il ne génère pas directement les contenus finaux.  
Son rôle est de **réfléchir, planifier, orchestrer et guider** les autres modules.

> Aucun module, aucun sous-cerveau, aucun agent ne peut être activé sans passer par le Master Brain.

---

## Structure interne du Master Brain

Le Master Brain est lui-même composé de **6 intelligences spécialisées** travaillant en coordination :

```
MASTER BRAIN
    │
    ├── Reasoning AI    → Compréhension profonde, déductions, résolution de problèmes
    ├── Planning AI     → Transformation d'une idée en plan d'action structuré
    ├── Context AI      → Maintien de la cohérence globale du projet et de la session
    ├── Memory AI       → Gestion intelligente de la mémoire utilisateur
    ├── Quality AI      → Vérification, détection d'erreurs, amélioration
    └── Decision AI     → Orchestration : quel module, quelle stratégie, quand agir
```

---

## 1. Reasoning AI — IA de raisonnement

**Rôle :** Moteur de réflexion du système.

Responsabilités :
- Analyser les demandes utilisateur en profondeur
- Comprendre l'intention réelle derrière la demande
- Résoudre les problèmes complexes
- Faire des déductions logiques
- Proposer des solutions adaptées

**Modèle recommandé :** OpenAI GPT-4o / GPT-4 (via API backend)

---

## 2. Planning AI — IA de planification

**Rôle :** Transformer une idée en plan d'action.

Responsabilités :
- Découper les objectifs en étapes concrètes
- Organiser les tâches dans le bon ordre
- Déterminer l'ordre d'exécution optimal
- Choisir les modules et sous-cerveaux nécessaires

**Exemple :**
```
Demande : "Créer une mini-série IA"

Planning AI produit :
  1. Analyser le concept et l'univers
  2. Créer la structure narrative (Story Brain)
  3. Définir les personnages et le style visuel
  4. Préparer le découpage en scènes
  5. Lancer les générations image/vidéo par scène
  6. Assembler et valider le résultat final
```

---

## 3. Context AI — IA de contexte

**Rôle :** Maintenir la cohérence complète du projet.

Responsabilités :
- Gérer le contexte utilisateur (qui est l'utilisateur, ses préférences)
- Gérer le contexte de session (ce qui s'est passé dans cette session)
- Gérer le contexte du projet (personnages, style, narratif en cours)
- Maintenir les relations entre les informations
- Empêcher le système de perdre sa cohérence

**Règle :** Aucune génération ne peut commencer sans que la Context AI ait injecté le contexte complet.

---

## 4. Memory AI — IA de mémoire

**Rôle :** Gérer la mémoire intelligente entre les sessions.

Responsabilités :
- Sauvegarder les préférences et habitudes de l'utilisateur
- Récupérer les informations importantes des sessions précédentes
- Améliorer progressivement l'expérience utilisateur
- Décider quelles informations valent la peine d'être mémorisées

**Règle :** Ne jamais stocker d'informations inutiles.

→ Travaille en lien direct avec `brain/memory/user_memory.md`

---

## 5. Quality AI — IA de contrôle qualité

**Rôle :** Superviseur des sorties de tous les modules.

Responsabilités :
- Analyser les résultats produits par les sous-cerveaux
- Détecter les erreurs, incohérences et manques
- Vérifier la cohérence narrative et visuelle
- Proposer des améliorations ciblées
- Valider ou rejeter avant livraison

→ Travaille en lien direct avec `brain/skills/quality.md`

---

## 6. Decision AI — IA de décision

**Rôle :** Prendre les décisions d'orchestration.

Responsabilités :
- Déterminer quel module utiliser pour chaque tâche
- Choisir la stratégie d'exécution (parallèle ou séquentielle)
- Décider quand demander une clarification à l'utilisateur
- Décider quand refuser une action (contexte insuffisant, règle sécurité)

**Règle :** Toutes ses décisions respectent les règles du Master Brain, de `docs/SECURITY.md` et du `brain/skills/security_brain.md`.

---

## Flux d'exécution complet

```
Utilisateur soumet une demande
        │
        ▼
[1] Reasoning AI — analyse l'intention profonde
        │
        ▼
[2] Context AI — charge et injecte le contexte complet
        │
        ▼
[3] Planning AI — crée le plan d'action structuré
        │
        ▼
[4] Decision AI — choisit les modules et la stratégie
        │
        ▼
[5] Modules spécialisés exécutent leurs tâches
    (Story Brain / Image Brain / Video Brain / etc.)
        │
        ▼
[6] Quality AI — vérifie et valide les sorties
        │
        ▼
[7] Memory AI — mémorise les informations utiles
        │
        ▼
[8] Réponse finale structurée → Utilisateur
```

---

## Architecture complète de Fusion AI

```
                    🧠 MASTER BRAIN
              (GPT-4o / Gemini Ultra)
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   Story Brain     Video Brain    Memory Brain
        │               │               │
   GPT / Gemini    GPT / Gemini    Firestore
                        │
                        ▼
               API Génération Vidéo
         (Veo · Seedance · Runway · Kling · Sora)
```

---

## Assemblage du prompt système à l'exécution

Le Master Brain est **dynamique**. À chaque requête, le prompt système est assemblé :

```
SYSTEM PROMPT =
    MASTER BRAIN (core)
  + SOUS-CERVEAUX SÉLECTIONNÉS (skills)
  + CONTEXTE UTILISATEUR (memory)
  + RÈGLES ACTIVES (rules)
  + TÂCHE COURANTE
```

Les fichiers cerveau sont chargés dynamiquement depuis `/brain/` et injectés selon les besoins de la tâche.

---

## Règles absolues

| Règle | Description |
|---|---|
| Aucune IA interne n'est indépendante | Toutes travaillent sous l'autorité du Master Brain |
| Toutes les décisions passent par le Master Brain | Sans exception |
| Chaque IA a une responsabilité précise | Pas de chevauchement |
| Le système est modulaire | De nouvelles IA peuvent être ajoutées sans modifier l'architecture principale |
| Pas d'hallucination | En cas de contexte insuffisant → demander, jamais inventer |

---

## Gestion des erreurs

| Situation | Action |
|---|---|
| Information manquante | Reasoning AI détecte → Decision AI demande une clarification |
| Contexte insuffisant | Context AI bloque → Master Brain interroge l'utilisateur |
| Sortie sous-cerveau incohérente | Quality AI rejette → nouvelle tentative avec corrections |
| Ambiguïté de la demande | Reasoning AI reformule → confirmation utilisateur |
| Règle sécurité violée | Security Brain bloque → log + notification |

---

## Évolution

Ce fichier est versionnable. Toute modification majeure incrémente la version principale (2.0 → 3.0), toute modification mineure incrémente le patch (2.0 → 2.1).
