import {TestBed, waitForAsync} from '@angular/core/testing';
import {PokemonService} from './pokemon.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PokemonTypes} from "../pokemonStucture/pokemon-types";
import {PokemonModel} from "../pokemonStucture/PokemonModel";


fdescribe('PokemonService', () => {
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
    it('should return a selection of pokemon', waitForAsync(() => {
      // given
      const searchTerm = 'pika';
      const fakeArrayResponse = [{name: 'pikachu'}];

      // when
      service.searchPokemons(searchTerm).subscribe(
        result => (
          // then
          expect(result.length).toBe(1)
        )
      );

      http
        .expectOne(`api/pokemons/?name=${searchTerm}`)
        .flush(fakeArrayResponse);


    }));

    it('should return empty array if no search term', waitForAsync(() => {
      // given
      const searchTerm = '';
      // when
      service.searchPokemons(searchTerm).subscribe(
        result => (
          // then
          expect(result.length).toBe(0)
        )
      );
      http
        .expectNone(`api/pokemons/?name=${searchTerm}`)
    }));
  });

  describe('getPokemonList', () => {
    it('should return an Array', waitForAsync(() => {
      // given
      const fakeArrayResponse = [{name: 'pikachu'}, {name: 'pikachu2'}, {name: 'pikachu3'}];

      // when
      service.getPokemonList().subscribe(
        result => (
          // then
          expect(result.length).toBeGreaterThan(0)
        )
      );

      http
        .expectOne(`api/pokemons`)
        .flush(fakeArrayResponse);
    }));
  });


  describe('getPokemon', () => {
    it('should return 1 specific pokemon', waitForAsync(() => {
      // given
      const id = 3;
      const fakePokemon3 = service.createPokemon(new Date(), 3);

      // when
      service.getPokemon(3).subscribe(
        result => (// then
          expect(result).toBe(fakePokemon3)
        )
      );
      http
        .expectOne(`api/pokemons/${id}`)
        .flush(fakePokemon3);
    }));
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
    it('should delete 1 specific pokemon', waitForAsync(() => {
      // given
      const fakePokemon3 = service.createPokemon(new Date(), 3);

      // when
      service.deletePokemon(fakePokemon3.id).subscribe(
        result => (// then
          expect(result).toBe(fakePokemon3)
        )
      );
      http
        .expectOne(`api/pokemons/${fakePokemon3.id}`)
        .flush(fakePokemon3);
    }));
  });

  describe('addPokemon', () => {
    it('should create a new pokemon from form values', waitForAsync(() => {
      // given
      const pokemonFormValues = {
        id: 40,
        hp: 20,
        cp: 20,
        name: 'fakePokemon',
        types: [PokemonTypes.fairy]
      };
      // when
      service.addPokemon(pokemonFormValues as PokemonModel).subscribe(
        createdPokemon => (
          expect(createdPokemon.picture).toBeDefined()
        )
      );
      http
        .expectOne(`api/pokemons`)
        .flush(service.createPokemon(new Date(), 40))
      ;
    }));


  });

  describe('updatePokemon', () => {
    it('should change pokemon from form values', waitForAsync(() => {
      // given
      const updatedPokemonFormValues = {
        hp: 25,
        cp: 20,
        name: 'newName',
        types: [PokemonTypes.fairy, PokemonTypes.normal]
      };

      const oldPokemonValue = {
        created: new Date(),
        id: 40,
        hp: 5,
        cp: 9,
        name: 'fakePokemon',
        picture: 'urlurlurl',
        types: [PokemonTypes.fairy]
      }

      // when
      service.updatePokemon(oldPokemonValue, updatedPokemonFormValues as PokemonModel).subscribe(
        createdPokemon => (
          expect(createdPokemon.name).toBe('newName')
        )
      );
      http
        .expectOne(`api/pokemons`)
        .flush(service.createPokemon(
          new Date(),
          oldPokemonValue.id,
          updatedPokemonFormValues.hp || oldPokemonValue.hp,
          updatedPokemonFormValues.cp || oldPokemonValue.cp,
          updatedPokemonFormValues.name || oldPokemonValue.name,
          oldPokemonValue.picture,
          updatedPokemonFormValues.types || oldPokemonValue.types
        ));
    }))

  });


});
