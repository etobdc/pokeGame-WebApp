import angular from 'angular';
import 'jquery';

import { CommonModule } from './common/common.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { ImageService } from './configs/image.service';

import './app.component.scss';
import 'bootstrap';

export const AppModule = angular
  .module('app', [
    CommonModule,
    ComponentsModule,
  ])
  .constant('urlBase','http://localhost:8080/media/')
  .component('app', AppComponent)
  .config(($locationProvider, $urlRouterProvider) => {
    'ngInject';
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
  })
  .service('Image',ImageService)
  .name;
