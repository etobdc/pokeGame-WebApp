import templateUrl from './pokemon.component.html';
import './pokemon.component.scss';

export const PokemonComponent = {
  templateUrl,
  controller: class PokemonController{
    constructor($scope, $http){
      'ngInject';
      this.$scope = $scope;
      this.$http = $http;
    }

    $onInit(){
      this.letsGetPokemon();
    }

    letsGetPokemon() {
      this.$http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150')
        .then((response) => {
          if (!!response && !!response.data && !!response.data.results) {
            this.pokemon = response.data.results;
            console.log(this.pokemon);
          }
        });
    }
  }
};
