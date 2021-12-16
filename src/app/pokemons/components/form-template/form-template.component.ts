import {Component, Input, OnInit} from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {PokemonService} from "../../services/pokemon.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  @Input() pokemon?: PokemonModel;

  public pokemonForm: FormGroup;
  nameCtrl: FormControl;
  hpCtrl: FormControl;
  cpCtrl: FormControl;
  // typesCtrl: FormControl;

  constructor(formbuilder: FormBuilder, private pokemonsService: PokemonService, private router: Router) {
    // build form in constructor

    this.nameCtrl = formbuilder.control('', [Validators.required, Validators.minLength(3)]);
    this.hpCtrl = formbuilder.control(0, [Validators.required, Validators.max(999)]);
    this.cpCtrl = formbuilder.control(0, [Validators.required, Validators.max(999)]);

    this.pokemonForm = formbuilder.group({
      name: this.nameCtrl,
      hp: this.hpCtrl,
      cp: this.cpCtrl
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.pokemonForm.value);
    // this.pokemonService.submitPokemon(this.pokemon.subscribe(()=> this.goBack());
  }

  goBack(): void{
    if (this.pokemon?.id){
      const link = ['/pokemons', this.pokemon.id];
      this.router.navigate(link);
    }
  }

  reset(): void{
    this.nameCtrl.setValue('');
    this.hpCtrl.setValue(0);
    this.cpCtrl.setValue(0);
  }

}
