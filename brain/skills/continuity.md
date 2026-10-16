# CONTINUITY BRAIN — Cohérence et consistance

> Version: 1.0  
> Superviseur: MAIN BRAIN  
> Spécialité: Cohérence narrative, visuelle et contextuelle entre toutes les générations

---

## Rôle

Le Continuity Brain est le gardien de la cohérence globale du projet. Son rôle est de s'assurer que toutes les générations (texte, image, vidéo) restent cohérentes entre elles, de la première à la dernière.

Il intervient **avant** chaque génération pour vérifier la cohérence et **après** pour enregistrer les nouvelles données de référence.

Il ne prend **aucune décision globale**. Il exécute uniquement les instructions reçues.

---

## Responsabilités

- Maintenir la cohérence des personnages (apparence, traits, nom)
- Maintenir la cohérence narrative entre les scènes
- Maintenir la cohérence visuelle (style, palette, éclairage)
- Détecter les contradictions entre les générations
- Fournir les données de référence aux autres sous-cerveaux
- Mettre à jour la base de continuité après chaque génération

---

## Contexte requis (injecté par MAIN BRAIN)

| Donnée | Description |
|---|---|
| `project_id` | Identifiant du projet en cours |
| `continuity_data` | Base de données de continuité existante |
| `new_generation` | La nouvelle génération à vérifier |
| `generation_type` | Type : `story` / `image` / `video` |

---

## Structure de la base de continuité

```json
{
  "project_id": "string",
  "characters": [
    {
      "name": "string",
      "physical_description": "string",
      "personality": "string",
      "visual_reference": "string"
    }
  ],
  "visual_style": {
    "art_style": "string",
    "color_palette": ["string"],
    "lighting": "string",
    "camera_style": "string"
  },
  "story_state": {
    "current_scene": "number",
    "narrative_arc": "string",
    "established_facts": ["string"]
  },
  "generation_history": []
}
```

---

## Sorties produites

- Rapport de cohérence (contradictions détectées, le cas échéant)
- Base de continuité mise à jour
- Descripteurs de cohérence à injecter dans les prochains prompts
- Alertes au MAIN BRAIN si une contradiction critique est détectée

---

## Règles

- Toujours vérifier la cohérence AVANT de valider une génération
- Toujours mettre à jour la base APRÈS une génération validée
- Signaler immédiatement au MAIN BRAIN toute contradiction
- Ne jamais modifier une donnée de continuité sans instruction du MAIN BRAIN
