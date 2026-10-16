# RÈGLE — Adaptation par durée vidéo

> Version: 1.0  
> Appliquée par: MAIN BRAIN (avant activation du Video Brain)  
> Priorité: OBLIGATOIRE

---

## Principe

La durée d'une vidéo générée par IA impose des contraintes strictes sur la complexité du contenu. Le MAIN BRAIN doit appliquer ces règles AVANT de transmettre la tâche au Video Brain.

Ignorer ces règles produit des vidéos incohérentes, avec des coupures artificielles ou des mouvements impossibles.

---

## Règles par durée

### ≤ 8 secondes — Plan simple

```
Structure autorisée :
- 1 action principale unique
- 0 transition complexe
- 0 changement de plan
- Mouvement caméra : statique ou très léger

Exemples valides :
✅ "Un personnage marche vers la caméra"
✅ "Une fleur s'ouvre lentement"
✅ "Zoom lent sur un visage"

Exemples invalides :
❌ "Le personnage court, puis s'arrête et regarde le coucher de soleil"
❌ "Coupe vers une autre scène"
```

---

### 15 secondes — Action principale + évolution légère

```
Structure autorisée :
- 1 action principale
- 1 évolution légère de l'action
- Maximum 1 mouvement caméra
- Pas de changement de lieu

Exemples valides :
✅ "Un personnage marche et ralentit progressivement"
✅ "La caméra recule lentement pendant que la scène s'illumine"

Exemples invalides :
❌ "3 personnages différents dans 3 lieux différents"
❌ "Succession de plans rapides"
```

---

### 30+ secondes — Structure cinématographique multi-phases

```
Structure autorisée :
- Plusieurs phases narratives
- Transitions possibles mais justifiées
- Évolution de l'éclairage ou de l'environnement
- Mouvements caméra complexes

Structure recommandée :
Phase 1 (0-10s)  : Établissement de la scène
Phase 2 (10-20s) : Action principale / développement
Phase 3 (20-30s) : Résolution / conclusion visuelle

Exemples valides :
✅ "Ouverture sur un paysage, zoom sur un personnage qui s'approche, gros plan sur son visage"
```

---

## Processus de validation MAIN BRAIN

Avant d'activer le Video Brain, le MAIN BRAIN vérifie :

1. Quelle est la durée cible ?
2. Le contenu demandé est-il compatible avec cette durée ?
3. Si non → simplifier la scène ou demander clarification
4. Si oui → transmettre au Video Brain avec la durée et la structure validées

---

## Tableau récapitulatif

| Durée | Actions | Transitions | Mouvements caméra | Plans |
|---|---|---|---|---|
| ≤ 8s | 1 | Aucune | Statique / très léger | 1 |
| 15s | 1 + évolution | Aucune | 1 mouvement | 1 |
| 30s+ | Multi-phases | Justifiées | Complexes possibles | Multiples |
