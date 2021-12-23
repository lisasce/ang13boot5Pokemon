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
      return { lengthTypesNotOk: {
          valid: false
        }
      };
    }
  }


  constructor(private formbuilder: FormBuilder, private pokemonsService: PokemonService, private router: Router) {


  }

  ngOnInit(): void {
    if (this.pokemon && !this.isTypesFormInitialised && this.typesCtrl.length == 0) {
      this.pokemon.types.forEach(type => this.typesCtrl.push(new FormControl(type)));
      this.isTypesFormInitialised = true;
    }


    this.nameCtrl = this.formbuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9àéèç]{1,25}$')]);
    this.hpCtrl = this.formbuilder.control('', [Validators.required, Validators.max(999), Validators.pattern('^[0-9]{1,3}$')]);
    this.cpCtrl = this.formbuilder.control('', [Validators.required, Validators.max(99), Validators.pattern('^[0-9]{1,2}$')]);
    this.typesCtrl = this.formbuilder.array([], [ FormTemplateComponent.typesLengthCheck()]);


    this.pokemonForm = this.formbuilder.group({
      name: this.nameCtrl,
      hp: this.hpCtrl,
      cp: this.cpCtrl,
      types: this.typesCtrl
    })



  }




  public isDefaultPokemonLoaded(): boolean {
    const defaultPokemon = this.pokemonsService.newPokemon(new Date());
    return this.pokemon?.picture === defaultPokemon.picture;
  }

  public hasType(type: PokemonTypes): boolean {

    if (this.pokemon && !this.isTypesFormInitialised && this.typesCtrl.length == 0) {
      this.pokemon.types.forEach(type => this.typesCtrl.push(new FormControl(type)));
      this.isTypesFormInitialised = true;
    }

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

    if (this.pokemon && !this.isTypesFormInitialised && this.typesCtrl.length == 0) {
      this.pokemon.types.forEach(type => this.typesCtrl.push(new FormControl(type)));
      this.isTypesFormInitialised = true;
    }

    if ($event.target.checked && this.typesCtrl.length < 3) {
      this.typesCtrl.push(new FormControl($event.target.value));
      console.log(this.typesCtrl.value);
    } else {
      let i: number = 0;
      this.typesCtrl.controls.forEach((item) => {
        if (item.value == $event.target.value) {
          this.typesCtrl.removeAt(i);
          console.log(this.typesCtrl.value)
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
    console.log(this.pokemonForm.value);
    // this.pokemonService.submitPokemon(this.pokemon.subscribe(()=> this.goBack());
  }

  public goBack(): void {
    if (this.pokemon?.id) {
      const link = ['/pokemons', this.pokemon.id];
      this.router.navigate(link);
    }
  }

  // nedded???
  public reset(): void {
    this.nameCtrl.setValue('');
    this.hpCtrl.setValue(0);
    this.cpCtrl.setValue(0);
  }


}
