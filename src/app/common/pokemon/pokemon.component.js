import templateUrl from './pokemon.component.html';
import './pokemon.component.scss';

export const PokemonComponent = {
  templateUrl,
  controller: class PokemonController{
    constructor($scope){
      'ngInject';
      this.$scope = $scope;
    }
    $onInit(){

    }

  }
};
