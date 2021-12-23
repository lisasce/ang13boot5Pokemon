import {Injectable} from '@angular/core';
import {PokemonTypes} from "../pokemonStucture/pokemon-types";
import {PokemonModel} from "../pokemonStucture/PokemonModel";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {FormGroup} from "@angular/forms";

// peut recevoir d'autres dependences
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonsUrl = 'api/pokemons';

  constructor(private http: HttpClient) {
  }

  public newPokemon(
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
    if(!term.trim()){
      return of([]);
    }// si c'est vide

    return this.http.get<PokemonModel[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(() => this.log(`you search with "${term}"`)
      ),
      catchError(this.handleError<PokemonModel[]>('searchPokemons', []))
    );
  }

  // CRUD methods:

  public getPokemons(): Observable<PokemonModel[ ]> {
    return this.http.get<PokemonModel[]>(this.pokemonsUrl).pipe(
      tap(pokemons => this.log(`fetched pokemons: ${pokemons}`)),
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
  public deletePokemon(pokemon: PokemonModel): Observable<PokemonModel> {

    const url = `${this.pokemonsUrl}/${pokemon.id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<PokemonModel>(url,httpOptions).pipe(
      tap(() => this.log(`deleted pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>('deletePokemon'))
    );
  }

  public submitPokemon(isDefaultPokemonPicture: boolean, pokemon: FormGroup): Observable<PokemonModel> {

    if (isDefaultPokemonPicture){
      return this.addPokemon(pokemon);
    }
    else {
      return this.addPokemon(pokemon);
    }

  }

  private addPokemon(pokemon: any): Observable<PokemonModel>{
    console.log(pokemon);

    const newPokemon = this.newPokemon(
      new Date(),
      this.idGenerator(),
      pokemon.hp,
      pokemon.cp,
      pokemon.name,
      this.pokemonUrlGenerator(),
      pokemon.types
    );

    console.log(newPokemon);

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    // POSTET NOCH NIX

    return this.http.post<PokemonModel>(this.pokemonsUrl, newPokemon, httpOptions).pipe(
      tap(() => this.log(`added pokemon with id=${newPokemon.id}`)),
      catchError(this.handleError<PokemonModel>('addPokemon'))
    );
  }

  private updatePokemon(pokemon: FormGroup): Observable<PokemonModel> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<PokemonModel>(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap(updatedPokemon => this.log(`updated pokemon: ${updatedPokemon.name} with id=${updatedPokemon.id}`)),
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
    const num = (Math.floor(Math.random() * 893) + 13).toString().padStart(3, '0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num}.png`;
  }

  private idGenerator(): number {
    return Math.floor(Math.random() * 893) + 13;
  }

}
