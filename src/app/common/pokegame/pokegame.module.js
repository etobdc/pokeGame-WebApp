import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import { PokegameComponent } from './pokegame.component';

export const PokegameModulo = angular
  .module('pokegame', [
    uiRouter
  ])
  .component('pokegame', PokegameComponent)
  .config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('pokegame', {
        url: '/pokegame',
        component: 'pokegame',
      });
  })
  .name;
