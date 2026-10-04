# Activer la synchronisation Google Drive

À faire **une seule fois**, par la personne qui met l'application en ligne (pas par chaque utilisateur).
Les intitulés de la console Google changent de temps en temps : suivez l'esprit des étapes.

## 1. Créer l'identifiant Google (gratuit)

1. Ouvrez https://console.cloud.google.com et créez un **nouveau projet** (par exemple « Budget »).
2. Menu **API et services → Bibliothèque** : cherchez **Google Drive API** et cliquez sur **Activer**.
3. Menu **API et services → Écran de consentement OAuth** (ou « Google Auth Platform ») :
   - Type d'utilisateur : **Externe**.
   - Nom de l'application : par exemple « Mon budget » ; ajoutez votre adresse e-mail d'assistance.
   - **Accès aux données / Niveaux d'accès** : ajoutez uniquement
     `https://www.googleapis.com/auth/drive.appdata`
     (accès à un dossier privé réservé à l'application, invisible dans « Mon Drive »).
   - **Publiez l'application** (« En production »). Si vous la laissez en mode « Test », seuls les comptes
     listés manuellement peuvent se connecter et la connexion expire au bout de 7 jours.
4. Menu **Identifiants → Créer des identifiants → ID client OAuth** :
   - Type d'application : **Application Web**.
   - **Origines JavaScript autorisées** : l'adresse exacte de votre site, par exemple
     `https://budget-vierge.pages.dev` (sans slash final).
     Pour tester sur votre ordinateur, ajoutez aussi `http://localhost:8000`.
   - Aucun « URI de redirection » n'est nécessaire.
5. Copiez l'**ID client** (il se termine par `.apps.googleusercontent.com`).
   Ce n'est pas un secret : il est visible dans le code de la page, c'est normal.

## 2. Le renseigner dans l'application

Ouvrez `index.html` et trouvez cette ligne, tout en haut du script :

```js
const GOOGLE_CLIENT_ID="";
```

Collez votre identifiant entre les guillemets, puis remplacez le fichier dans votre dépôt GitHub.
Après le déploiement, **Réglages → Google Drive → Se connecter** apparaît.

## 3. Ce que voient les utilisateurs

- Chacun se connecte avec **son propre** compte Google. Vous n'avez accès à aucune donnée.
- Les données sont dans un dossier caché de **leur** Drive, réservé à l'application.
- Un écran Google peut indiquer que l'application n'est pas « vérifiée ». Avec ce seul accès (dossier privé
  de l'application), la vérification n'est normalement pas exigée, mais à confirmer dans votre console.

## Limites à connaître

- La synchronisation se fait **à l'ouverture** et **quelques secondes après chaque modification**, pas en
  arrière-plan quand l'application est fermée.
- La connexion Google dure environ **une heure**. Au-delà, la pastille **☁ Reconnecter** apparaît en haut :
  un appui suffit (une petite fenêtre Google s'ouvre puis se ferme).
- Sur iPhone, cette fenêtre peut être bloquée dans une application installée sur l'écran d'accueil.
  Si c'est le cas, ouvrez le site dans Safari pour vous connecter, ou utilisez « Enregistrer dans Fichiers ».
- Si deux appareils ont été modifiés chacun de leur côté, l'application demande quelle version garder.
  L'autre est remplacée : exportez avant en cas de doute.
- Se déconnecter ne supprime pas la copie présente dans le Drive.
