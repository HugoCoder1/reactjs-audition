# Épreuve Pratique React.js Frontend

## Objectif

Ce projet consiste à développer une application frontend en React.js comprenant trois pages, permettant d'évaluer :

- La capacité à consommer des APIs.
- La capacité à concevoir une interface utilisateur agréable.
- La capacité à afficher des données sous forme de graphiques/statistiques.

## Contexte

L'application utilise trois APIs gratuites accessibles directement :

1. **Random User API** pour afficher une liste d'utilisateurs.
2. **REST Countries API** pour afficher des informations sur les pays.
3. **CoinGecko API** pour afficher les tendances des cryptomonnaies avec des graphiques.

### Structure de l'application

#### Page 1 : Liste des utilisateurs (`User.tsx`)

- **API utilisée** : `https://randomuser.me/api/?results=50`
- Affiche une liste de 50 utilisateurs avec :
  - Nom
  - Email
  - Photo de profil
  - Pays
- Un champ de recherche permet de filtrer les utilisateurs par genre.
- Utilisation de `Tanstack Query` pour la récupération des données.
- Filtrage par genre effectué avec `useMemo` pour optimiser les performances.
- **Composants utilisés** : **Shadcn UI** pour une interface propre et moderne.
- Interface responsive avec **Tailwind CSS**.

#### Page 2 : Informations sur les pays (`Pays.tsx`)

- **API utilisée** : `https://restcountries.com/v3.1/all`
- Affiche une liste de pays avec :
  - Nom
  - Capitale
  - Population
  - Drapeau
- Un sélecteur de continent permet de filtrer les pays.
- Utilisation de `Tanstack Query` pour récupérer les données.
- **Composants utilisés** : **Shadcn UI**.
- Interface fluide et visuellement attrayante avec **Tailwind CSS**.

#### Page 3 : Statistiques et graphiques (`Crypto.tsx`)

- **API utilisée** : `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true`
- Affiche un graphique en courbes montrant l’évolution des prix des cryptomonnaies via **Chart.js** et `react-chartjs-2`.
- Un tableau montre les tendances des cryptomonnaies avec les prix en temps réel.
- Utilisation de `Tanstack Query` pour récupérer les données des cryptomonnaies.

## Fonctionnement des appels API et des composants React utilisés

### Page 1 : Liste des utilisateurs (`User.tsx`)

- Utilisation de `Tanstack Query` pour récupérer les utilisateurs de l'API `randomuser.me`.
- Filtrage des utilisateurs par genre avec `useMemo` pour optimiser le rendu.
- Affichage dynamique de la liste d'utilisateurs avec les détails (nom, email, photo, pays).
  -Rechercher par genre.

### Page 2 : Informations sur les pays (`Pays.tsx`)

- Utilisation de `Tanstack Query` pour récupérer les informations des pays depuis l'API `restcountries.com`.
- Filtrage par continent avec un sélecteur dynamique.
- Affichage des informations des pays dans un tableau avec des composants de **Shadcn UI**.
  -Filtrage par continent.

### Page 3 : Statistiques et graphiques (`Crypto.tsx`)

- Utilisation de `Tanstack Query` pour récupérer les données des cryptomonnaies via l'API CoinGecko.
- Utilisation de **Chart.js** et `react-chartjs-2` pour afficher un graphique des tendances des cryptomonnaies.
- Affichage d'un tableau avec les prix actuels et autres informations.

## Critères d’évaluation

## Installation

1. Clonez le projet :
   ```bash
   git clone https://github.com/HugoCoder1/reactjs-audition.git
   ```
