# USER MEMORY BRAIN — Mémoire personnalisée utilisateur

> Version: 1.0  
> Superviseur: MAIN BRAIN  
> Spécialité: Apprentissage des préférences, personnalisation, persistance du contexte utilisateur

---

## Identité

Le User Memory Brain apprend, retient et exploite les préférences de chaque utilisateur au fil du temps. Il transforme l'IA d'un outil générique en un assistant qui **connaît** l'utilisateur.

Il ne prend **aucune décision globale**. Il fournit le contexte mémorisé au MAIN BRAIN qui l'utilise pour personnaliser chaque interaction.

---

## Mission principale

Éviter que l'utilisateur répète les mêmes informations à chaque session.

```
Sans User Memory Brain :
  Session 1 → L'utilisateur décrit son personnage
  Session 2 → L'utilisateur redécrit son personnage
  Session 3 → L'utilisateur redécrit encore son personnage

Avec User Memory Brain :
  Session 1 → L'utilisateur décrit son personnage → mémorisé
  Session 2 → Le système connaît déjà le personnage
  Session 3 → Le système propose des évolutions basées sur l'historique
```

---

## Ce que le User Memory Brain mémorise

### Préférences de style

```json
{
  "visual_style": "string (ex: cinématique, anime, réaliste...)",
  "color_palette": ["string"],
  "lighting_preference": "string",
  "camera_style": "string",
  "narrative_tone": "string (ex: dramatique, humoristique, épique...)"
}
```

### Personnages récurrents

```json
{
  "characters": [
    {
      "character_id": "string",
      "name": "string",
      "physical_description": "string",
      "personality": "string",
      "visual_reference_prompt": "string",
      "created_at": "timestamp",
      "last_used": "timestamp",
      "usage_count": "number"
    }
  ]
}
```

### Projets et historique

```json
{
  "projects": [
    {
      "project_id": "string",
      "title": "string",
      "type": "string (story / image / video / mixed)",
      "status": "string (active / completed / archived)",
      "created_at": "timestamp",
      "last_modified": "timestamp",
      "summary": "string"
    }
  ]
}
```

### Comportements et habitudes

```json
{
  "preferred_video_duration": "number (secondes)",
  "preferred_image_model": "string",
  "preferred_video_model": "string",
  "language": "string",
  "expertise_level": "string (débutant / intermédiaire / expert)",
  "frequent_use_cases": ["string"]
}
```

---

## Stockage — Firestore

```
/users/{user_id}/
    memory/
        preferences.json
        characters.json
        projects.json
        habits.json
        session_history/
            {session_id}.json
```

---

## Flux d'utilisation

### Au début de chaque session
```
1. MAIN BRAIN demande le profil mémorisé
2. User Memory Brain charge les données Firestore
3. User Memory Brain injecte le contexte dans le MAIN BRAIN
4. MAIN BRAIN personnalise sa réponse dès le premier message
```

### En cours de session
```
1. L'utilisateur mentionne un personnage → User Memory Brain vérifie s'il existe
2. L'utilisateur choisit un style → User Memory Brain note la préférence
3. Toute nouvelle information pertinente est mise en file d'attente pour sauvegarde
```

### En fin de session
```
1. User Memory Brain consolide les nouvelles informations
2. Mise à jour Firestore
3. Incrément des compteurs d'utilisation
4. Archivage de la session
```

---

## Contexte requis (injecté par MAIN BRAIN)

| Donnée | Description |
|---|---|
| `user_id` | Identifiant Firebase de l'utilisateur |
| `session_id` | Identifiant de la session en cours |
| `current_request` | La demande actuelle (pour identifier ce qui doit être mémorisé) |

---

## Sorties produites

- Profil utilisateur complet (préférences, personnages, habitudes)
- Contexte de continuité des projets précédents
- Suggestions personnalisées basées sur l'historique
- Mise à jour de la base mémoire après chaque session

---

## Règles

- Ne jamais mélanger les mémoires de deux utilisateurs différents
- Toujours chiffrer les données sensibles au repos
- Respecter le droit à l'oubli : permettre la suppression complète du profil
- Ne jamais mémoriser de données financières ou de paiement (rôle du Monetization Brain)
- Signaler au MAIN BRAIN si le profil est vide (premier utilisateur) → activer l'Onboarding Brain
