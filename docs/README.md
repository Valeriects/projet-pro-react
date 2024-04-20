# Création d'un site pour un cinéma de quartier, les cinéma Fun en React et Nodejs
lien vers le gitHub :  `https://github.com/Valeriects/projet-pro-react.git`
  - Dans le dossier `docs` vous trouverez le fichier README.md


## Pour démarrer les serveurs dans l'IDE
Dans le terminal faire cette commande:
```bash
cd sites/exam-projet-pro/projet-pro-react/back
npm run dev
```
Dans un autre terminal, faire cette commande:
```bash
cd sites/exam-projet-pro/projet-pro-react/client
npm run dev
```
Ensuite, aller sur le lien `http://localhost:9500/`


## Mise en place du projet node:
1- Création du dossier `projet-pro-react`.   
2- Dans ce dossier, créer un dossier: `back`.   
3- A la racine du projet, créer un fichier .gitignore, pour que gitHub ignore les fichiers et dossiers trop sensibles.

### **- Dans le dossier `back`:**

- Installation dans le terminal du vscode
```bash
npm init -y
npm install nodemon -D
npm i dotenv mysql2 express bcrypt cors jsonwebtoken cookie-parser multer

```
- Dans le fichier `package.json`:   
On va ajouter ceci: 
```json
  "main": "src/app.js",
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
```
  - Cela nous permettra de faire la manipulation suivante:
  ```bash
  rs  // pour rafraîchir l'api dans le serveur back du dossier `back`
  et pour initier le serveur back on écrit en ligne de commande `npm run dev`
  ```

- Ensuite on créé l'arborescence du dossier `back`: 
  - Avec l'ajout d'un dossier `public` à la racine du dossier `back`
  - Dans le dossier public on aura le dossier `assets` qui contiendra le dossier `ìmages` qui contiendront les images de la BDD.   
  - A la racine du dossier `back` on créé un fichier `.env`, pour les variables d'environnement et un dossier `src`, c'est dans celui-ci qu'on aura au même niveau les dossiers `config` qui contiendra la connexion à la BDD, `controller` qui contiendra les fichiers controller, `model` qui contiendra la classe Query, `router` qui contiendra les routes de l'api.
  - Enfin, on créé à la racine du dossier `src`, le fichier `app.js`.    
  **Visuellement, cela devrait ressemblait à ceci:**   
![](./back/public/assets/images/arborescence.png)

- Création du fichier `.gitignore`:
  - on y mettra `node_modules .env`
  - afin que git ne les prennent pas en compte lors des pushs
 





## Partie du dossier CLIENT
A la racine du projet `projet-pro-react`, et dans le terminal, on fait quelques lignes de commande:
```bash 
  npm create vite@latest
```
  on nommera le dossier `client` avec `REACT et javascript + swc`
  on entre dans le répertoire `client`
  et on fait:
  ```bash
  npm install
  npm install react-router-dom react-redux @reduxjs/toolkit sass
  ```

  installation de fontawesome:
  ```bash
   npm i --save @fortawesome/fontawesome-svg-core
   npm i --save @fortawesome/react-fontawesome@latest

   npm i --save @fortawesome/free-solid-svg-icons

   npm i --save @fortawesome/free-brands-svg-icons

  ```
 
 installation du module react slick pour le carousel de la page d'accueil:
 (https://react-slick.neostack.com/docs/get-started#include-css)
 ```bash
 npm install react-slick --save

 npm install slick-carousel --save
 ```
 Pour react vite, on démarre le localhost avec `npm run dev` pour rafraichir, on doit l'arrêter `ctrl + c` et le redémarrer `npm run dev`.

## Design et police

  Les couleurs:
  - orange : #EBB95C
  - beige: #FFFFCC
  - beigeClair: #FAEDD3
  - marron : #3F2413
  - black : #000000
  - transparent : #00000000
  - white: #fff

  Les couleurs de la page admin: 
  - gris: rgb(67, 92, 111)
  - grisClair: rgb(100, 130, 154)
  - grisExtraLight: rgb(198, 218, 236)
  
  Les polices sur google fonts:
  - Pour tout le site:   
  monserrat : "Montserrat", sans-serif;
  - Pour les titres:    
  varela:"Varela Round", sans-serif;


  ## Les pages:
  ### 1- Le FRONT: 
  #### a- Côté utilisateur et visiteur:
  * Header:   
    - Menu burger en mobile first à gauche   
    - Menu de compte à droite   
    - Icone de recherche qui ouvre la barre de recherche en mobile first   
    - Logo et nom du site   
    - Lorsque l'un des menu est ouvert ou la barre de recherche, alors les autres menu ou la barre de recherche se referme. 
  * Footer:
    - Contact
    - Les liens vers les informations légales
    - Les liens vers les réseaux sociaux

  * Accueil:
    - carrousel avec slick "https://react-slick.neostack.com/", des affiches des films
    - suivit de la liste des films avec les infos principales, les horaires, et un lien vers la fiche technique du film
  
  * Fiche du film:
    - Fiche détaillée du film, avec plus d'informations et la bande annonce du film
    - les horaires des séances qui amène au clique, sur la séance en question
 
 * Séance du film:
    - On voit les informations de la séance ciblée, on peut aussi voir le tarif de 1 ou plusieurs places
    - On peut aussi cliquer pour réserver
    - cela affiche un composant de réservation
        - il permettra de créer une réservation
  
  * CGU / CGV / A PROPOS / POLITIQUE DE CONFIDENTIALITE:
    - Affichage des règles d'utilisations
    - affichage des informations sur le cinéma
    - affichage des réglementation 
  * Page de compte utilisateur:
    - permet de pouvoir modifier, ses infos personnelles
  * Page de connexion et d'inscription:
    - Permet de s'inscrire puis de se connecter 
    - cela est permi grâce à l'email et au mot de passe (avec le module `bcrypt`)
  
  #### b- Côté administrateur:
  * page de l'administrateur:
    - On y voit quelques statistiques afin de mieux appréhender les données qui pourraient permettre une amélioration.
  * Header:
    - Le logo et nom du cinéma
    - un menu burger pour afficher les liens vers les listes des données
  * Chaque table de la base de données possède pratiquement toutes 3 pages:
    - Une page pour afficher la liste des données
    - une page avec un formulaire pour ajouter une nouvelle donnée
    - une page où l'on pourra modifier les données ou supprimer la donnée.
  
  #### c- La sécurisation des routes url du site:
  * Avec le cookie d'authentification du module jsonwebtoken, via l'API du back, on peut sécuriser les routes URL, si jamais une personne mal intentionnée essaye d'entrer directement "/admin" dans l'url, il se verra dirigé vers une page 404
  * de plus, si par exemple l'administrateur se connecte, il se verra directement dirigé vers sa back office
  * on peut aussi faire une sécurisation de la route compte d'utilisateur


  ### 2- Le BACK:
  * Mise en place du module `Multer` pour le téléchargement des fichiers multimédia, via un middleware que l'on implante dans la route spécifiée
  * Mise en place de toutes les routes de l'api, en réfléchissant aux routes qui doivent être du côté du site ou du côté de l'admin
    - on aura donc une sécurisation des routes de l'api
    - avec jswebtoken
    - si l'admin n'est pas connecté, alors on ne peut pas accéder aux routes de l'api côté admin
- 