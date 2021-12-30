import {Injectable} from '@angular/core';
import {PokemonTypes} from "../pokemonStucture/pokemon-types";
import {PokemonModel} from "../pokemonStucture/PokemonModel";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonsUrl = 'api/pokemons';

  constructor(private http: HttpClient) {
  }

  public createPokemon(
    created: Date,
    id = 0,
    hp = 45,
    cp = 25,
    name = "Random Name",
    picture = "https://cdn.pixabay.com/photo/2016/08/15/00/50/pokeball-1594373_960_720.png",
    types: Array<PokemonTypes> = [PokemonTypes.normal]
  ): PokemonModel {
    return {
      id,
      hp,
      cp,
      name,
      picture,
      types,
      created
    };
  }

  public searchPokemons(term: string): Observable<PokemonModel[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<PokemonModel[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(() => this.log(`you search with "${term}"`)
      ),
      catchError(this.handleError<PokemonModel[]>('searchPokemons', []))
    );
  }

  // CRUD methods:

  public getPokemonList(): Observable<PokemonModel[ ]> {
    return this.http.get<PokemonModel[]>(this.pokemonsUrl).pipe(
      tap(() => this.log(`fetched pokemons`)),
      catchError(this.handleError(`getPokemons`, []))
    );
  }

  public getPokemon(id: number): Observable<PokemonModel> {
    const url = `${this.pokemonsUrl}/${id}`;

    return this.http.get<PokemonModel>(url).pipe(
      tap(pokemon => this.log(`fetched pokemon id=${pokemon.id}`)),
      catchError(this.handleError<PokemonModel>(`getPokemon id=${id}`))
    );
  }

  public getPokemonTypes(): Array<string> {

    let pokemonTypes: Array<string> = [];

    for (let value in PokemonTypes) {
      pokemonTypes.push(value);
    }
    return pokemonTypes;
  }

  public deletePokemon(id: number): Observable<PokemonModel> {

    const url = `${this.pokemonsUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<PokemonModel>(url, httpOptions).pipe(
      tap(() => this.log(`deleted pokemon id=${id}`)),
      catchError(this.handleError<any>('deletePokemon'))
    );
  }


  public addPokemon(pokemon: PokemonModel): Observable<PokemonModel> {
    const newPokemon = this.createPokemon(
      new Date(),
      this.idGenerator(),
      pokemon.hp,
      pokemon.cp,
      pokemon.name,
      this.pokemonUrlGenerator(),
      pokemon.types
    );

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<PokemonModel>(this.pokemonsUrl, newPokemon, httpOptions).pipe(
      tap(() => this.log(`added pokemon with id=${newPokemon.id}`)),
      catchError(this.handleError<PokemonModel>('addPokemon'))
    );
  }

  public updatePokemon(pokemon: PokemonModel, updatedPokemonValues: PokemonModel): Observable<PokemonModel> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const updatedPokemon = this.createPokemon(
      new Date(),
      pokemon.id,
      updatedPokemonValues.hp || pokemon.hp,
      updatedPokemonValues.cp || pokemon.cp,
      updatedPokemonValues.name || pokemon.name,
      pokemon.picture,
      updatedPokemonValues.types || pokemon.types
    );

    return this.http.put<PokemonModel>(this.pokemonsUrl, updatedPokemon, httpOptions).pipe(
      tap(updatedPokemon => this.log(`updated pokemon: ${updatedPokemon?.name} with id=${updatedPokemon?.id}`)),
      catchError(this.handleError<any>('updatePokemon'))
    );
  }

  // Handlers and Fallback Generators

  private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); //make the result observable
    };
  }

  private pokemonUrlGenerator(): string {
    const num = this.idGenerator().toString().padStart(3, '0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num}.png`;
  }

  private idGenerator(): number {
    return Math.floor(Math.random() * 893) + 13;
  }

}
