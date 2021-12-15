import { Pipe, PipeTransform } from '@angular/core';
import {PokemonTypes} from "../pokemonStucture/pokemon-types";

@Pipe({
  name: 'pokemonTypeColor'
})
export class PokemonTypeColorPipe implements PipeTransform {

  transform(type: PokemonTypes): string {
    let color: string;

    switch (type) {
      case 'Fire':
        color = 'danger';
        break;
      case 'Water':
        color = 'primary';
        break;
      case 'Grass':
        color = 'success';
        break;
      case 'Bug':
        color = 'indigo';
        break;
      case 'Normal':
        color = 'secondary';
        break;
      case 'Flying':
        color = 'info';
        break;
      case 'Poison':
        color = 'purple';
        break;
      case 'Fairy':
        color = 'pink';
        break;
      case 'Psy':
        color = 'teal';
        break;
      case 'Electric':
        color = 'warning';
        break;
      case 'Fighting':
        color = 'orange';
        break;
      default:
        color = 'gray';
        break;
    }

    return 'bg-' + color;

  }

}
