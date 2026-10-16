# Configuration Firebase

Le frontend utilise Firebase Authentication et Firestore. Les valeurs `VITE_FIREBASE_*` sont la configuration publique de l'application Web Firebase; elles ne remplacent pas les règles Firestore. Ne placez jamais de clé de compte de service ou de clé privée dans le frontend.

## Préparer Firebase

1. Créez un projet Firebase et ajoutez une application Web.
2. Dans **Authentication → Sign-in method**, activez **Email/Password** et **Google**.
3. Dans les domaines autorisés d'Authentication, ajoutez le domaine Replit de prévisualisation et le domaine public de l'application.
4. Créez la base **Cloud Firestore** en mode production. L'identifiant standard de la base par défaut est `(default)`.
5. Publiez les règles du fichier `firebase/firestore.rules` sur la base réellement utilisée. Les règles Firestore sont propres à chaque base; publier sur une base ne les publie pas sur les autres.
6. Dans les variables d'environnement de Replit, configurez les quatre valeurs nécessaires affichées dans la configuration de l'application Web :
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
7. Si votre base porte un identifiant différent de `(default)`, configurez aussi `VITE_FIREBASE_DATABASE_ID` avec son identifiant exact. Pour le projet Fusion AI actuel, l'API a confirmé une base nommée `default` (sans parenthèses); utilisez `VITE_FIREBASE_DATABASE_ID=default` et publiez les règles sur cette base.
8. `VITE_FIREBASE_STORAGE_BUCKET` et `VITE_FIREBASE_MESSAGING_SENDER_ID` sont facultatives pour les fonctionnalités actuelles.
9. Redémarrez le workflow frontend. Les variables `VITE_` sont intégrées au bundle de développement/production; elles doivent donc rester des identifiants de configuration Web, jamais des secrets administrateur.

## Données utilisateur et crédits

Un document `users/{uid}` est créé à la première connexion si nécessaire. Le compte démarre à zéro crédit. Les règles autorisent chaque client à lire son propre profil, mais interdisent au client de modifier le solde ou d'écrire l'historique `credit_transactions`. Les crédits de publicité, d'achat ou de génération doivent être validés et appliqués par un backend de confiance.

Le navigateur reconnaît l'état hors ligne et le réseau lent. Les opérations Firebase affichent aussi des erreurs compréhensibles et peuvent être relancées quand le réseau revient.
