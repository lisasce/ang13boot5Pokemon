import {Injectable} from '@angular/core';
import {PokemonTypes} from "../pokemonStucture/pokemon-types";
import {PokemonModel} from "../pokemonStucture/PokemonModel";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

// peut recevoir d'autres dependences
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonsUrl = 'api/pokemons';

  constructor(private http: HttpClient) {
  }

  public newPokemon(
    id = null,
    hp = 45,
    cp = 25,
    name = "Random Name",
    picture = "https://cdn.pixabay.com/photo/2016/08/15/00/50/pokeball-1594373_960_720.png",
    types: Array<PokemonTypes> = [PokemonTypes.normal],
    created = new Date()
  ): PokemonModel {
    const pokemon: PokemonModel = {id, hp, cp, name, picture, types, created};
    return pokemon;
  }

  public getPokemons(): Observable<PokemonModel[ ]> {
    return this.http.get<PokemonModel[]>(this.pokemonsUrl).pipe(
      tap(pokemons => this.log(`fetched pokemons: ${pokemons}`)),
      catchError(this.handleError(`getPokemons`, []))
    );
  }

  // tap: Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source, Intercepts each emission on the source and runs a function, but returns an output which is identical to the source as long as errors don't occur. https://rxjs.dev/api/operators/tap

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
    console.log(pokemonTypes);
    return pokemonTypes;
  }

  private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); //make the result observable
    };
  }

  private pokemonUrlGenerator(): string {
    const num = (Math.floor(Math.random() * 893) + 13).toString().padStart(3, '0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num}.png`;
  }

  private idGenerator(): number {
    return Math.floor(Math.random() * 893) + 13;
  }

}
