# RÈGLE — Adaptation selon le modèle IA cible

> Version: 1.0  
> Appliquée par: MAIN BRAIN (avant activation des sous-cerveaux)  
> Priorité: OBLIGATOIRE

---

## Principe

Chaque modèle d'IA a ses propres contraintes, syntaxes et points forts. Le MAIN BRAIN doit adapter les instructions transmises aux sous-cerveaux selon le modèle cible utilisé.

Un prompt optimisé pour Midjourney ne fonctionnera pas de la même façon sur DALL-E ou Stable Diffusion. Une structure vidéo pour Runway ne convient pas à Kling.

---

## Modèles d'image

### Midjourney
```
Syntaxe : description naturelle + paramètres --style --ar --v
Points forts : qualité artistique, cohérence stylistique
Contraintes : pas de texte dans les images, longueur limitée
Format prompt : [description] --ar 16:9 --v 6 --style raw
```

### DALL-E (OpenAI)
```
Syntaxe : description naturelle, phrases complètes
Points forts : respect des instructions textuelles précises
Contraintes : éviter les prompts trop techniques
Format prompt : phrase descriptive complète et naturelle
```

### Stable Diffusion
```
Syntaxe : mots-clés séparés par virgules + poids possibles
Points forts : contrôle fin, customisation
Contraintes : nécessite prompt négatif explicite
Format prompt : keyword1, keyword2, (emphasis:1.3), [negative: bad quality]
```

---

## Modèles vidéo

### Runway Gen-3
```
Points forts : cohérence temporelle, mouvements naturels
Contraintes : max 10 secondes par clip, 1 action principale
Syntaxe recommandée : [sujet] [action] [environnement] [style cinématographique]
```

### Kling AI
```
Points forts : durées plus longues, scènes complexes
Contraintes : descriptions très détaillées requises
Syntaxe recommandée : description scène complète + mouvement caméra explicite
```

### Sora (OpenAI)
```
Points forts : compréhension sémantique, cohérence physique
Contraintes : accès limité, latence élevée
Syntaxe recommandée : description narrative naturelle et détaillée
```

---

## Modèles de langage (IA de raisonnement)

### GPT-4 / GPT-4o (OpenAI)
```
Points forts : raisonnement complexe, instructions longues
Usage recommandé : MAIN BRAIN, Story Brain, tâches d'analyse
```

### Gemini Pro / Ultra (Google)
```
Points forts : contexte long, multimodal
Usage recommandé : analyse de documents, tâches multimodales
```

### Claude (Anthropic)
```
Points forts : instructions précises, cohérence longue durée
Usage recommandé : génération de contenu long, révision
```

---

## Processus de sélection MAIN BRAIN

Pour chaque tâche, le MAIN BRAIN détermine :

1. **Quel type de génération** est nécessaire (texte / image / vidéo) ?
2. **Quel modèle** est disponible et configuré dans le projet ?
3. **Quelle syntaxe** doit être utilisée pour ce modèle ?
4. **Quelles contraintes** doivent être communiquées au sous-cerveau ?

---

## Règle d'indépendance des fournisseurs

Le système est conçu pour fonctionner avec **plusieurs fournisseurs**.

Aucune dépendance exclusive à un seul modèle n'est autorisée.

```
Architecture obligatoire :
MAIN BRAIN → Adapter (couche d'abstraction) → Modèle IA
```

L'Adapter traduit les instructions du MAIN BRAIN dans la syntaxe du modèle cible, permettant de changer de modèle sans modifier la logique du cerveau.
