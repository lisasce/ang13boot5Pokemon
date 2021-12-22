import {Component, Input, OnInit} from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../../services/pokemon.service";
import {Router} from "@angular/router";
import {PokemonTypes} from "../../pokemonStucture/pokemon-types";


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  @Input() pokemon?: PokemonModel;
  public PokemonTypes = PokemonTypes;

  nameCtrl: FormControl;
  hpCtrl: FormControl;
  cpCtrl: FormControl;
  //typesCtrl: FormControl;
  public pokemonForm: FormGroup;


  constructor(formbuilder: FormBuilder, private pokemonsService: PokemonService, private router: Router) {
    // build form in constructor

    this.nameCtrl = formbuilder.control('', [Validators.required, Validators.minLength(3),Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9àéèç]{1,25}$')]);
    this.hpCtrl = formbuilder.control('', [Validators.required, Validators.max(999),Validators.pattern('^[0-9]{1,3}$')]);
    this.cpCtrl = formbuilder.control('', [Validators.required, Validators.max(99),Validators.pattern('^[0-9]{1,2}$')]);


    this.pokemonForm = formbuilder.group({
      name: this.nameCtrl,
      hp: this.hpCtrl,
      cp: this.cpCtrl,
      types: formbuilder.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  public isDefaultPokemonLoaded(): boolean{
    const defaultPokemon = this.pokemonsService.newPokemon(new Date());
    return this.pokemon?.picture === defaultPokemon.picture;
  }

  onSubmit(): void {
    console.log(this.pokemonForm.value);
    // this.pokemonService.submitPokemon(this.pokemon.subscribe(()=> this.goBack());
  }

  goBack(): void {
    if (this.pokemon?.id) {
      const link = ['/pokemons', this.pokemon.id];
      this.router.navigate(link);
    }
  }

  reset(): void {
    this.nameCtrl.setValue('');
    this.hpCtrl.setValue(0);
    this.cpCtrl.setValue(0);
  }

  hasType(type: PokemonTypes): boolean {
    if (this.pokemon) {
      const pokemonHasType = this.pokemon.types.map(typesEnum => typesEnum.valueOf()).includes(type);
      return pokemonHasType;
    }
    return false;
  }

  selectType($event: any, type: PokemonTypes): void {

    if (this.pokemon) {
      const checked = $event.target.checked;
      if (checked) {
        this.pokemon.types.push(type);
        console.log(this.pokemon.types)
      } else {
        const index = this.pokemon.types.indexOf(type);
        if (index > -1) {
          this.pokemon.types.splice(index, 1);
        }
      }
    }
  }

  isTypesValid(type: PokemonTypes): boolean {
    if (this.pokemon){
      if (this.pokemon.types.length === 1 && this.hasType(type)) {
        return false;
      }
      if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
        return false;
      }
    }
    return true;
  }

}
