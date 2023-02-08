import templateUrl from './home.component.html';
import './home.component.scss';

export const HomeComponent = {
  templateUrl,
  controller: class HomeController{
    constructor($scope, Sounds, urlBase){
      'ngInject';
      this.$scope = $scope;
      this.Sounds = Sounds;
      this.urlBase = urlBase;
    }
    $onInit(){
      this.Sounds.stopSound();
    }
    pokeAleatorio(){
      let number = Math.floor(Math.random() * (150 - 1 + 1)) + 1;

      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
    }
  }
};
