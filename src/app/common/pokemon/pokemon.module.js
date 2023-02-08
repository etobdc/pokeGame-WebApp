import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import { PokemonComponent } from './pokemon.component';

export const PokemonModule = angular
  .module('pokemon', [
    uiRouter
  ])
  .component('pokemon', PokemonComponent)
  .config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('pokemon', {
        url: '/pokedex',
        component: 'pokemon',
      });
  })
  .name;
