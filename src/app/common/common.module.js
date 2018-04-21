import angular from 'angular';
import { HomeModule } from './home/home.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemapModule } from './pokemap/pokemap.module';

export const CommonModule = angular
  .module('common', [
    HomeModule,
    PokemonModule,
    PokemapModule
  ])
  .name;
