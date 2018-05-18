import templateUrl from './home.component.html';
import './home.component.scss';

export const HomeComponent = {
  templateUrl,
  controller: class HomeController{
    constructor($scope, $http, urlBase){
      'ngInject';
      this.$scope = $scope;
      this.$http = $http;
      this.urlBase = urlBase;
    }
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
      this.imageType = [
        {
          type: 0,
          name: 'Grass 1',
          image: this.urlBase+'grass_1.png',
          canPass: true,
          canHavePokemon:0,
          canHaveObject:true,
          isObject:false,
          imagePath: '',
        },
        {
          type: 1,
          name: 'Grass 2',
          image: this.urlBase+'grass_2.png',
          canPass: true,
          canHavePokemon:0,
          canHaveObject:true,
          isObject:false,
          imagePath: '',
        },
        {
          type: 2,
          name: 'Grass 3',
          image: this.urlBase+'grass_3.png',
          canPass: true,
          canHavePokemon:0,
          canHaveObject:true,
          isObject:false,
          imagePath: '',
        },
        {
          type: 3,
          name: 'Grass Flowers 1',
          image: this.urlBase+'grass_flowers_1.png',
          canPass: true,
          canHavePokemon:0,
          canHaveObject:true,
          isObject:false,
          imagePath: '',
        },
        {
          type: 4,
          name: 'Ground 1',
          image: this.urlBase+'ground_1.png',
          canPass: true,
          canHavePokemon:0,
          canHaveObject:true,
          isObject:false,
          imagePath: '',
        },
        {
          type: 5,
          name: 'Road 1',
          image: this.urlBase+'road_1.png',
          canPass: true,
          canHavePokemon:0,
          canHaveObject:true,
          isObject:false,
          imagePath: '',
        },
        {
          type: 6,
          name: 'Road 2',
          image: this.urlBase+'road_2.png',
          canPass: true,
          canHavePokemon:0,
          canHaveObject:true,
          isObject:false,
          imagePath: '',
        },
        {
          type: 7,
          name: 'Tall Grass 1',
          image: this.urlBase+'tall_grass_1.png',
          canPass: true,
          canHavePokemon:0.4,
          canHaveObject:false,
          isObject:false,
          imagePath: '',
        },
        {
          type: 8,
          name: 'Tall Grass 2',
          image: this.urlBase+'tall_grass_2.png',
          canPass: true,
          canHavePokemon:0.4,
          canHaveObject:false,
          isObject:false,
          imagePath: '',
        },
        {
          type: 9,
          name: 'Water 1',
          image: this.urlBase+'water_1.png',
          canPass: false,
          canHavePokemon:0.4,
          canHaveObject:false,
          isObject:false,
          imagePath: this.urlBase+'water_1/',
        },
        {
          type: 10,
          name: 'Water 2',
          image: this.urlBase+'water_2.png',
          canPass: false,
          canHavePokemon:0.4,
          canHaveObject:false,
          isObject:false,
          imagePath: '',
        },
        {
          type: 11,
          name: 'Wood Fance',
          image: this.urlBase+'wood_face_1.png',
          canPass: false,
          canHavePokemon:0,
          canHaveObject:false,
          isObject:true,
          imagePath: '',
        },
        {
          type: 12,
          name: 'Flowers 1',
          image: this.urlBase+'flower_1.png',
          canPass: true,
          canHavePokemon:0,
          canHaveObject:false,
          isObject:false,
          imagePath: '',
        },
        {
          type: 13,
          name: 'Tree 1',
          image: this.urlBase+'arvore_1.png',
          canPass: false,
          canHavePokemon:0,
          canHaveObject:false,
          isObject:true,
          imagePath: '',
        },
        {
          type: 14,
          name: 'Rock 1',
          image: this.urlBase+'rock_1.png',
          canPass: false,
          canHavePokemon:0,
          canHaveObject:false,
          isObject:true,
          imagePath: '',
        },
      ]
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
        console.log(this.player.position);
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
      if(this.player.position.y < this.mapa.map.length){
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
      if(this.player.position.x < this.mapa.map.length){
        this.player.position.x = this.player.position.x+1;
      }
    }
  }
};
