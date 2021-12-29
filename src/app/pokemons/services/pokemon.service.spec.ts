import {TestBed} from '@angular/core/testing';

import {PokemonService} from './pokemon.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PokemonTypes} from "../pokemonStucture/pokemon-types";
import {PokemonModel} from "../pokemonStucture/PokemonModel";

describe('PokemonService', () => {
  let service: PokemonService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createPokemon', () => {

    it('should create a default pokemon', () => {
      // given

      // when
      const defaultPokemon = service.createPokemon(new Date());
      // then
      expect(defaultPokemon).toBeTruthy();
    });

    it('should have correct default values', () => {
      // given
      const id = 0;
      const hp = 45;
      const cp = 25;
      const name = "Random Name";
      const picture = "https://cdn.pixabay.com/photo/2016/08/15/00/50/pokeball-1594373_960_720.png";
      const types: Array<PokemonTypes> = [PokemonTypes.normal];
      const created = new Date();

      // when
      const defaultPokemon = service.createPokemon(created);
      // then
      expect(defaultPokemon).toEqual({id, hp, cp, name, picture, types, created});
    });

  });

  describe('searchPokemons', () => {
    it('should return a selection of pokemon', () => {
      // given
      const searchTerm = 'pika';
      const fakeArrayResponse = [{name: 'pikachu'}];
      let pokemonListResult: PokemonModel[] = [];

      // when
      service.searchPokemons(searchTerm).subscribe(
        result => (pokemonListResult = result)
      );

      http
        .expectOne(`api/pokemons/?name=${searchTerm}`)
        .flush(fakeArrayResponse);

      // then
      expect(pokemonListResult.length).toBe(1);

    });

    it('should return empty array if no search term', () => {
      // given
      const searchTerm = '';
      let pokemonListResult: PokemonModel[] = [];

      // when
      service.searchPokemons(searchTerm).subscribe(
        result => (pokemonListResult = result)
      );

      http
        .expectNone(`api/pokemons/?name=${searchTerm}`)

      // then
      expect(pokemonListResult.length).toBe(0);
    });
  });

  describe('getPokemonList', () => {
    it('should return an Array', () => {
      // given
      let pokemonList: PokemonModel[] = [];
      const fakeArrayResponse = [{name: 'pikachu'}, {name: 'pikachu2'}, {name: 'pikachu3'}];

      // when
      service.getPokemonList().subscribe(
        result => (pokemonList = result)
      );

      http
        .expectOne(`api/pokemons`)
        .flush(fakeArrayResponse);

      // then
      expect(pokemonList.length).toBeGreaterThan(0);
    });
  });


  describe('getPokemon', () => {
    it('should return 1 specific pokemon', () => {
      // given
      const id = 3;
      const fakePokemon3 = {id: 3, name: 'fakePokemon'};
      let pokemonResult = {};
      // when
      service.getPokemon(3).subscribe(
        result => (pokemonResult = result)
      );
      // then
      http
        .expectOne(`api/pokemons/${id}`)
        .flush(fakePokemon3);

      // then
      expect(pokemonResult).toBe(fakePokemon3);
    });
  });


  describe('getPokemonTypes', () => {
    it('should an Array of string', () => {
      // given

      // when
      const types = service.getPokemonTypes();
      // then
      expect(typeof (types[1])).toEqual(jasmine.any(String));
    });

    it('should contain enum values', () => {
      // given

      // when
      const types = service.getPokemonTypes();
      // then
      expect(types).toContain(PokemonTypes.normal.toLowerCase());
    });

  });


  describe('deletePokemon', () => {
    it('should delete 1 specific pokemon', () => {
      // given
      const fakePokemon3 = {id: 3, hp: 45, cp: 33, name: 'fakePokemon', picture: 'seas', type: PokemonTypes.normal};
      let pokemonResult = {};
      // when
      service.deletePokemon(fakePokemon3.id).subscribe(
        result => (pokemonResult = result)
      );
      // then
      http
        .expectOne(`api/pokemons/${fakePokemon3.id}`)
        .flush(fakePokemon3);

      // then
      expect(pokemonResult).toBe(fakePokemon3);
    });
  });

  describe('addPokemon', () => {
    it('should create 1 pokemon from form values', () => {
      // given
      const id = 3;
      // when
      const pokemon3 = service.getPokemon(3);
      // then

      // expect(pokemon3.id).toBe(3);
    });
  });

  describe('updatePokemon', () => {
    it('should update data of 1 pokemon', () => {
      // given
      const id = 3;
      // when
      const pokemon3 = service.getPokemon(3);
      // then

      // expect(pokemon3.id).toBe(3);
    });
  });

  describe('idGenerator', () => {
    it('should an id above 13', () => {
      // given
      const id = 3;
      // when
      const pokemon3 = service.getPokemon(3);
      // then

      // expect(pokemon3.id).toBe(3);
    });
  });

  describe('pokemonUrlGenerator', () => {
    it('should insert a random number above 13 as a string in a url', () => {
      // given
      const id = 3;
      // when
      const pokemon3 = service.getPokemon(3);
      // then

      // expect(pokemon3.id).toBe(3);
    });
  });

});
