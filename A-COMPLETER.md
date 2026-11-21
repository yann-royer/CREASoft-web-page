# Site CREASoft : ce qui reste à faire

Le site comprend `index.html` et `mentions-legales.html` (français), `en/` (anglais : `index.html`, `legal-notice.html`), `de/` (allemand : `index.html`, `impressum.html`), `style.css`, `site.js` et le dossier `img/`, commun aux trois langues.
Il n'y a rien à compiler : ouvrir `index.html` dans un navigateur suffit.

## Déjà rempli

- Téléphone et e-mail (section « Voir CREASoft en marche », bouton e-mail avec le sujet « Démonstration CREASoft »).
- Tarif : par abonnement, tarif annoncé bientôt.
- « Qui suis-je ? » avec le lien vers https://yann.royer.contact.
- Mentions légales provisoires (`mentions-legales.html`), pour un particulier sans entreprise.

## À faire plus tard

- **Prix de l'abonnement** : remplacer « Le tarif sera bientôt annoncé. » dans `index.html`.
- **Mentions légales, le jour où l'entreprise existe** (par exemple une micro-entreprise) :
  - ajouter le nom commercial, le numéro SIRET et l'adresse ;
  - ajouter des conditions générales de vente et une licence d'utilisation du logiciel avant de vendre le premier abonnement.
- **Marque Crea'bloc** : les mentions disent qu'elle appartient « à leur titulaire ». On peut ajouter son nom.
- **Hébergeur** : si le site ne passe pas par GitHub Pages, changer la partie « Hébergement ».

## À vérifier

- **Trois langues** : toute modification du texte se fait dans les trois pages d'accueil, et dans les trois pages de mentions légales. Les pages anglaise et allemande précisent que le logiciel est en français.
- **Impressum allemand** : en Allemagne, un Impressum contient en principe une adresse postale. Il n'y en a pas ici, comme sur la page française.

- Le lien du portfolio, https://yann.royer.contact, s'ouvre bien.
- **Windows 10 et 11** : la page l'annonce, car Qt 6 ne tourne pas sur les versions plus anciennes.
- **Version 1.10.22** dans la fiche technique : à mettre à jour à chaque nouvelle version.

## D'où viennent les images

- `img/vue-*.webp` : photos 3D faites avec CREASoft (Bureau, `docs_CREASoft`, projet « test 2 »).
- `img/pdf-*.webp` : pages des dossiers PDF « test 2 » et « long mur ». La page de garde n'y est pas.
- `img/plan-contraintes.webp` : capture de la maison de test (`--capture-constraints`).
- `img/ecran-*.webp`, `img/bloc-special.webp` : captures du guide intégré (`assets/guide`).
- `img/schema-bloc.webp`, `img/icones/`, `img/logo-creasoft.png` : ressources du logiciel (`assets`).

## Publication

Dépôt : `yann-royer/CREASoft-web-page`. Avec GitHub Pages (Settings > Pages > branche `main`, dossier racine), le site sera en ligne à l'adresse `https://creasoft.royer.contact/`.
La police (Archivo) vient de Google Fonts. Sans connexion, la page s'affiche en Segoe UI.
