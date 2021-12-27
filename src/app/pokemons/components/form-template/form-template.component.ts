import {Component, Input, OnInit} from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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

  nameCtrl = new FormControl();
  hpCtrl = new FormControl();
  cpCtrl = new FormControl();
  typesCtrl = new FormArray([]);
  public pokemonForm = new FormGroup({});


  static typesLengthCheck(): ValidatorFn {
    return (control: AbstractControl) => {
      const controlArray = control as FormArray;
      console.log(controlArray.value.length);
      if (controlArray.value.length < 4 && controlArray.value.length > 0) {
        return null;
      }
      return {
        lengthTypesNotOk: {
          valid: false
        }
      };
    }
  }

  constructor(private formbuilder: FormBuilder, private pokemonsService: PokemonService, private router: Router) {

  }

  ngOnInit(): void {

    const ctrls: FormControl[] = [];

    if (this.pokemon && !this.isTypesFormInitialised) {
      this.pokemon.types.forEach(type => ctrls.push(new FormControl(type)));
      this.isTypesFormInitialised = true;
    }

    this.nameCtrl = this.formbuilder.control(this.pokemon?.name, [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9àéèç ]{1,25}$')]);
    this.hpCtrl = this.formbuilder.control(this.pokemon?.hp, [Validators.required, Validators.max(999), Validators.pattern('^[0-9]{1,3}$')]);
    this.cpCtrl = this.formbuilder.control(this.pokemon?.cp, [Validators.required, Validators.max(99), Validators.pattern('^[0-9]{1,2}$')]);
    this.typesCtrl = this.formbuilder.array(ctrls, [FormTemplateComponent.typesLengthCheck()]);


    this.pokemonForm = this.formbuilder.group({
      name: this.nameCtrl,
      hp: this.hpCtrl,
      cp: this.cpCtrl,
      types: this.typesCtrl
    })

  }


  public isDefaultPokemonLoaded(): boolean {
    const defaultPokemon = this.pokemonsService.createPokemon(new Date());
    return this.pokemon?.picture === defaultPokemon.picture;
  }

  public hasType(type: PokemonTypes): boolean {
    let typesInFormArray: boolean = false;

    this.typesCtrl.controls.forEach((item) => {
      if (item.value == type) {
        typesInFormArray = true;
      }
    });

    if (typesInFormArray) {
      return true;
    }
    return false;
  }

  public selectType($event: any): void {

    if ($event.target.checked && this.typesCtrl.length < 3) {
      this.typesCtrl.push(new FormControl($event.target.value));
    } else {
      let i: number = 0;
      this.typesCtrl.controls.forEach((item) => {
        if (item.value == $event.target.value) {
          this.typesCtrl.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

// max 3 checked
  public isTypesSelectable(type: PokemonTypes): boolean {
    if (this.typesCtrl.value.length >= 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }


  public onSubmit(): void {
    if (this.isDefaultPokemonLoaded()) {
      this.pokemonsService.addPokemon(this.pokemonForm.value).subscribe(
        () => this.goBack()
      )
    } else if (this.pokemon) {
      this.pokemonsService.updatePokemon(this.pokemon, this.pokemonForm.value).subscribe(
        () => this.goBack()
      )
    }
  }

  goBack(): void {
    const link = ['/pokemons/all'];
    this.router.navigate(link);
  }

  public reset(): void {
    this.nameCtrl.setValue('Random Name');
    this.hpCtrl.setValue(45);
    this.cpCtrl.setValue(25);
    this.typesCtrl.setValue(['Normal']);
  }

}
