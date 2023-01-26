import angular from 'angular';
import { HomeModule } from './home/home.module';
import { PokegameModulo } from './pokegame/pokegame.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemapModule } from './pokemap/pokemap.module';

export const CommonModule = angular
  .module('common', [
    HomeModule,
    PokegameModulo,
    PokemonModule,
    PokemapModule
  ])
  .name;
