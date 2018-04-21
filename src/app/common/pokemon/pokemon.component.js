import templateUrl from './pokemon.component.html';
import './pokemon.component.scss';

export const PokemonComponent = {
  templateUrl,
  controller: class PokemonController{
    constructor($scope){
      'ngInject';
      this.$scope = $scope;
    }
    godDamn(){
      alert('God Damn');
    }
    $onInit(){
      this.maxLines = 100;
      this.pokeMap();
      this.player = {
        name: 'Player 1',
        position:{
          x:0,
          y:0
        }
      }
      this.arrows();
    }

    pokeMap(){
      this.colunas = [];
      for (var i = 0; i < this.maxLines; i++) {
        let linhas = [];
        for (var a = 0; a < this.maxLines; a++) {
          linhas.push({id:a, id_map:i, type: 1, hasPoekemon: false});
        }
        this.colunas.push({id:i, colunas:linhas});
      }
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

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      }, true);
    }

    playerMove(direction){
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
      this.$scope.$apply();
    }

    _playerDown(){
      if(this.player.position.y != (this.maxLines-1)){
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
      if(this.player.position.x != (this.maxLines-1)){
        this.player.position.x = this.player.position.x+1;
      }
    }
  }
};
