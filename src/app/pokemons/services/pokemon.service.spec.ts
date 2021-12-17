import {TestBed} from '@angular/core/testing';

import {PokemonService} from './pokemon.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PokemonTypes} from "../pokemonStucture/pokemon-types";

fdescribe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('newPokemon', () => {

    it('should create a default pokemon', () => {
      // given

      // when
      const defaultPokemon = service.newPokemon(new Date());
      // then
      expect(defaultPokemon).toBeTruthy();
    });

    it('should have correct default values', () => {
      // given
      const id = null;
      const hp = 45;
      const cp = 25;
      const name = "Random Name";
      const picture = "https://cdn.pixabay.com/photo/2016/08/15/00/50/pokeball-1594373_960_720.png";
      const types: Array<PokemonTypes> = [PokemonTypes.normal];
      const created = new Date();

      // when
      const defaultPokemon = service.newPokemon(created);
      // then
      expect(defaultPokemon).toEqual({id, hp, cp, name, picture, types, created});
    });

  });


  describe('getPokemons', () => {

  });


  describe('getPokemon', () => {

  });


  describe('getPokemonTypes', () => {

  });


});
