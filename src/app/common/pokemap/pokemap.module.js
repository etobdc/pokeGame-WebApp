import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import { PokemapComponent } from './pokemap.component';

export const PokemapModule = angular
  .module('pokemap', [
    uiRouter
  ])
  .component('pokemap', PokemapComponent)
  .config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('pokemap', {
        url: '/pokemap',
        component: 'pokemap',
      });
  })
  .name;
