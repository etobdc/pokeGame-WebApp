import templateUrl from './home.component.html';
import './home.component.scss';

export const HomeComponent = {
  templateUrl,
  controller: class HomeController{
    constructor($scope, $http, urlBase, $timeout, Image){
      'ngInject';
      this.$scope = $scope;
      this.$http = $http;
      this.urlBase = urlBase;
      this.$timeout = $timeout;
      this.Image = Image;
    }
    $onInit(){
      this.pokeMap();
      this.player = {
        name: 'Player 1',
        position:{
          x:0,
          y:0
        }
      }
      this.inMovement = false;
      this.arrows();
    }

    pokeMap(){
      this.$http.get('http://localhost:8000/map/1')
      .then((result) => {
        if(result.data){
          this.mapa = result.data;
          this.mapa.map = JSON.parse(this.mapa.map);
            console.log(this.mapa);
        }
      })
    }

    arrows(){
      window.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }

        switch (event.key) {
          case "ArrowDown":
            this.playerMove('down');
            break;
          case "ArrowUp":
            this.playerMove('up');
            break;
          case "ArrowLeft":
            this.playerMove('left');
            break;
          case "ArrowRight":
            this.playerMove('right');
            break;
          case "Enter":
          console.log("enter")
            break;
          case "Escape":
          console.log("esc")
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }

        // console.log(this.player.position);
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      }, true);
    }

    playerMove(direction){
      if (!this.inMovement) {
        this.inMovement = true;
        this.$timeout(() => {
          switch (direction) {
            case 'down':
            this._playerDown();
            break;
            case 'up':
            this._playerUp();
            break;
            case 'left':
            this._playerLeft();
            break;
            case 'right':
            this._playerRight();
            break;
            default:
            console.log('No move');
            break;
          }
          this.inMovement = false;
        }, 100);
        this.$scope.$apply();
      }
    }

    _playerDown(){
      if(this.player.position.y < (this.mapa.map.length - 1)){
        this.player.position.y = this.player.position.y+1;
      }
    }
    _playerUp(){
      if((this.player.position.y - 1) >= 0){
        this.player.position.y = this.player.position.y-1;
      }
    }
    _playerLeft(){
      if((this.player.position.x - 1) >= 0){
        this.player.position.x = this.player.position.x-1;
      }
    }
    _playerRight(){
      if(this.player.position.x < (this.mapa.map.length - 1)){
        this.player.position.x = this.player.position.x+1;
      }
    }
  }
};
