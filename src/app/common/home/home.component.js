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
      this.poke1 =
      this.poke2 = this.pokeAleatorio();
      this.poke3 = this.pokeAleatorio();
    }
    pokeAleatorio(){
      let number = Math.floor(Math.random() * (150 - 1 + 1)) + 1;
      return number;
    }
    pokeShuffle (poke) {
      let number = this.pokeAleatorio();
      switch (poke) {
      case 1:
        this.poke1 = number;
        break;
      case 2:
        this.poke2 = number;
        break;
      case 3:
        this.poke3 = number;
        break;
      }
    }
  }
};
