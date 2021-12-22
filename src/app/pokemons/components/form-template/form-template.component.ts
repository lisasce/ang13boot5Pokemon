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
  isTypesFormInitialised = false;

  nameCtrl: FormControl;
  hpCtrl: FormControl;
  cpCtrl: FormControl;
  types: FormArray;
  public pokemonForm: FormGroup;


  constructor(formbuilder: FormBuilder, private pokemonsService: PokemonService, private router: Router) {



    // build form in constructor

    this.nameCtrl = formbuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9àéèç]{1,25}$')]);
    this.hpCtrl = formbuilder.control('', [Validators.required, Validators.max(999), Validators.pattern('^[0-9]{1,3}$')]);
    this.cpCtrl = formbuilder.control('', [Validators.required, Validators.max(99), Validators.pattern('^[0-9]{1,2}$')]);
    this.types = formbuilder.array([], [Validators.minLength(1),Validators.maxLength(3)]);


    this.pokemonForm = formbuilder.group({
      name: this.nameCtrl,
      hp: this.hpCtrl,
      cp: this.cpCtrl,
      types: this.types
    })

  }

  ngOnInit(): void {

  }



  public isDefaultPokemonLoaded(): boolean {
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

    if (this.pokemon && !this.isTypesFormInitialised && this.types.length == 0) {
      this.pokemon.types.forEach(type => this.types.push(new FormControl(type)));
      this.isTypesFormInitialised = true;
      console.log(this.types.value);
    }

      let typesInFormArray: boolean = false;

      this.types.controls.forEach((item) => {
        if (item.value == type) {
          typesInFormArray = true;
        }
      });

      if (typesInFormArray) {
        return true;
      }
    return false;
  }

  selectType($event: any): void {

    this.types = this.pokemonForm.get('types') as FormArray;

   if (this.pokemon && !this.isTypesFormInitialised && this.types.length == 0) {
      this.pokemon.types.forEach(type => this.types.push(new FormControl(type)));
      this.isTypesFormInitialised = true;
      console.log(this.types);
    }

    if ($event.target.checked && this.types.length < 3) {
      this.types.push(new FormControl($event.target.value));
      console.log(this.types.value);
    } else {
      let i: number = 0;
      this.types.controls.forEach((item) => {
        if (item.value == $event.target.value) {
          this.types.removeAt(i);
          console.log(this.types.value)
          return;
        }
        i++;
      });
    }
  }


// max 3 checked
  isTypesSelectable(type: PokemonTypes): boolean {
     if (this.types.value.length >= 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }


}
