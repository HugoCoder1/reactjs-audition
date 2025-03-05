export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  email: string;
  login: {
    uuid: string;
  };
  picture: {
    medium: string;
  };
}

export interface Country {
  capital: string[] | undefined;
  cca2: string; // Code pays en 2 lettres (ex: "US", "FR")
  cca3: string; // Code pays en 3 lettres (ex: "USA", "FRA")
  ccn3: string; // Code pays numérique (ex: "840", "250")
  name: {
    common: string; // Nom du pays (ex: "United States", "France")
    official: string; // Nom officiel du pays (ex: "United States of America", "French Republic")
  };
  flags: {
    png: string; // URL de l'image du drapeau au format PNG
    svg: string; // URL de l'image du drapeau au format SVG
  };
  region: string; // Région (ex: "Americas", "Europe")
  subregion: string; // Sous-région (ex: "Northern America", "Western Europe")
  population: number; // Population du pays
  area: number; // Superficie du pays en km²
  currencies: {
    [key: string]: {
      name: string; // Nom de la devise (ex: "Dollar", "Euro")
      symbol: string; // Symbole de la devise (ex: "$", "€")
    };
  };
  languages: {
    [key: string]: string; // Clé langue (ex: "eng" pour l'anglais), valeur langue (ex: "English")
  };
  independent: boolean; // Indicateur si le pays est indépendant
}
