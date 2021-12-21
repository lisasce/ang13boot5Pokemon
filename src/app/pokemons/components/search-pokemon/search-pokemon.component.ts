import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {
  pokemonsLoading = false;
  noPokemon = false;

  private searchTerms$ = new Subject<string>();
  public pokemons$: Observable<PokemonModel[]>;

  @Output() pokemonsList = new EventEmitter<PokemonModel[]>();

  constructor(private router: Router, private pokemonService: PokemonService) {
    this.pokemons$ = this.searchTerms$.pipe(
      // wait 300ms between each request
      debounceTime(300),
      // ignore search if same as before
      distinctUntilChanged(),
      // return result list depending on term string
      switchMap((term: string) => this.pokemonService.searchPokemons(term)),
      tap(() => this.pokemonsLoading= false),
      tap(result => {
          this.noPokemon = !result?.length;
          this.pokemonsList.emit(result);
      })
    );
  }

  ngOnInit(): void {
  }

  public search(searchValue: string): void {
    this.pokemonsLoading = true;
    this.searchTerms$.next(searchValue);
  }

  public goToDetail(pokemon: PokemonModel): void {
    const link = ['/pokemons', pokemon.id];
    this.router.navigate(link);
  }

}
