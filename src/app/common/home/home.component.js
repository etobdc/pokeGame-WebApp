import templateUrl from './home.component.html';
import './home.component.scss';

export const HomeComponent = {
  templateUrl,
  controller: class HomeController{
    godDamn(){
      alert('God Damn');
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
      this.arrows();
    }

    pokeMap(){
      this.colunas = [];
      for (var i = 0; i < 100; i++) {
        let linhas = [];
        for (var a = 0; a < 100; a++) {
          linhas.push({id:a, id_map:i, type: 1, hasPoekemon: false});
        }
        this.colunas.push({id:i, colunas:linhas});
      }
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
        console.log(123);
        break;
      }
    }
    arrows(){
      window.addEventListener("keydown", function (event) {
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
    _playerDown(){
      this.player.position.y = this.player.position.y+1;
    }
    _playerUp(){
      this.player.position.y = this.player.position.y-1;
    }
    _playerLeft(){
      this.player.position.x = this.player.position.x-1;
    }
    _playerRight(){
      this.player.position.x = this.player.position.x+1;
    }
  }
};
