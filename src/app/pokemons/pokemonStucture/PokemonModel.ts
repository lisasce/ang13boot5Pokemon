import {PokemonTypes} from "./pokemon-types";

export interface PokemonModel {
  id: number;
  hp: number; // pt vie
  cp: number; // pt degats
  name: string;
  picture: string;
  types: Array<PokemonTypes>;
  created: Date;
}
