import {PokemonModel} from "./PokemonModel";
import {PokemonTypes} from "./pokemon-types";

export const POKEMONS: PokemonModel[] = [
  {
    id: 1,
    name: "Bulbizarre",
    hp: 25,
    cp: 5,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    types: [PokemonTypes.grass, PokemonTypes.poison],
    created: new Date()
  },
  {
    id: 2,
    name: "Salamèche",
    hp: 28,
    cp: 6,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
    types: [PokemonTypes.fire],
    created: new Date()
  },
  {
    id: 3,
    name: "Carapuce",
    hp: 21,
    cp: 4,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    types: [PokemonTypes.water],
    created: new Date()
  },
  {
    id: 4,
    name: "Aspicot",
    hp: 16,
    cp: 2,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png",
    types: [PokemonTypes.bug, PokemonTypes.poison],
    created: new Date()
  },
  {
    id: 5,
    name: "Roucool",
    hp: 30,
    cp: 7,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
    types: [PokemonTypes.normal, PokemonTypes.flying],
    created: new Date()
  },
  {
    id: 6,
    name: "Rattata",
    hp: 18,
    cp: 6,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png",
    types: [PokemonTypes.normal],
    created: new Date()
  },
  {
    id: 7,
    name: "Piafabec",
    hp: 14,
    cp: 5,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png",
    types: [PokemonTypes.normal, PokemonTypes.flying],
    created: new Date()
  },
  {
    id: 8,
    name: "Abo",
    hp: 16,
    cp: 4,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png",
    types: [PokemonTypes.poison],
    created: new Date()
  },
  {
    id: 9,
    name: "Pikachu",
    hp: 21,
    cp: 7,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
    types: [PokemonTypes.electric],
    created: new Date()
  },
  {
    id: 10,
    name: "Sabelette",
    hp: 19,
    cp: 3,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png",
    types: [PokemonTypes.normal],
    created: new Date()
  },
  {
    id: 11,
    name: "Mélofée",
    hp: 25,
    cp: 5,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
    types: [PokemonTypes.fairy],
    created: new Date()
  },
  {
    id: 12,
    name: "Groupix",
    hp: 17,
    cp: 8,
    picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png",
    types: [PokemonTypes.fire],
    created: new Date()
  }
];
