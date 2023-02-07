/* eslint-disable no-console */
import templateUrl from './pokegame.component.html';
import './pokegame.component.scss';

export const PokegameComponent = {
  templateUrl,
  controller: class PokegameController{
    constructor($scope, $http, urlBase, $timeout, Image, Sounds, $interval){
      'ngInject';
      this.$scope = $scope;
      this.$http = $http;
      this.urlBase = urlBase;
      this.$timeout = $timeout;
      this.Image = Image;
      this.Sounds = Sounds;
      this.$interval = $interval;
      this.position = 3;
    }

    $onInit(){
      this.victory = null;
      this.disabled = false;
      this.Sounds.startSound(1);
      this.pokeMap();
      this.arrowKey = '';
      this.movePlayer;
      this.player = {
        name: 'Player 1',
        image: this.urlBase+'player/male/front.png',
        position:{
          x:this.position,
          y:this.position
        }
      };
      this.inMovement = false;
      this.arrows();
      this.pokemon = [
        {
          name: 'Bulbasaur',
          life: 100,
          image: this.urlBase+'pokemon'+'/1.gif',
          imageBack: this.urlBase+'pokemon'+'/1_b.png',
          type: 'grass',
          attacks: [
            {
              name: 'Tackle',
              power: 10,
              type_1: 'normal',
              type_2: null
            },
            {
              name: 'Vine Whip',
              power: 20,
              type_1: 'grass',
              type_2: null
            },
            {
              name: 'Take Down',
              power: 20,
              type_1: 'normal',
              type_2: null
            },
            {
              name: 'Razor Leaf',
              power: 15,
              type_1: 'grass',
              type_2: null
            }
          ]
        },
        {
          name: 'Charmander',
          life: 100,
          image: this.urlBase+'pokemon'+'/4.gif',
          imageBack: this.urlBase+'pokemon'+'/4_b.png',
          type: 'fire',
          attacks: [
            {
              name: 'Scratch',
              power: 10,
              type_1: 'normal',
              type_2: null
            },
            {
              name: 'Ember',
              power: 20,
              type_1: 'fire',
              type_2: null
            },
            {
              name: 'Fire Fang',
              power: 20,
              type_1: 'fire',
              type_2: null
            },
            {
              name: 'Flame Burst',
              power: 15,
              type_1: 'fire',
              type_2: null
            }
          ]
        },
        {
          name: 'Squirtle',
          life: 100,
          image: this.urlBase+'pokemon'+'/7.gif',
          imageBack: this.urlBase+'pokemon'+'/7_b.png',
          type: 'watter',
          attacks: [
            {
              name: 'Tackle',
              power: 10,
              type_1: 'normal',
              type_2: null
            },
            {
              name: 'Water Gun',
              power: 20,
              type_1: 'watter',
              type_2: null
            },
            {
              name: 'Bubble',
              power: 20,
              type_1: 'watter',
              type_2: null
            },
            {
              name: 'Aqua Tail',
              power: 15,
              type_1: 'watter',
              type_2: null
            }
          ]
        }
      ];
      this.oponent = {};
    }

    pokeMap(){
      this.$http.get('http://localhost:3000/map/1')
        .then((result) => {
          if(result.data){
            this.mapa = result.data;
            this.mapa.map = JSON.parse(this.mapa.map);
          }
        });
    }

    arrows(){
      window.addEventListener('keyup', (event) => {
        this._cancelMove();
        switch (event.key) {
        case 'ArrowDown':
          this.player.image = this.urlBase+'player/male/front.png';
          break;
        case 'ArrowUp':
          this.player.image = this.urlBase+'player/male/back.png';
          break;
        case 'ArrowLeft':
          this.player.image = this.urlBase+'player/male/left.png';
          break;
        case 'ArrowRight':
          this.player.image = this.urlBase+'player/male/right.png';
          break;
        default:
          return; // Quit when this doesn't handle the key event.
        }
        this.$scope.$apply();
      }, true);
      window.addEventListener('keydown', (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        if(this.arrowKey != event.key && this.arrowKey == ''){
          this.arrowKey = event.key;
          switch (event.key) {
          case 'ArrowDown':
            this.player.image = this.urlBase+'player/male/front.gif';
            this.movePlayer = this.$interval(() => {
              this.playerMove('down');
            }, 75);
            break;
          case 'ArrowUp':
            this.player.image = this.urlBase+'player/male/back.gif';
            this.movePlayer = this.$interval(() => {
              this.playerMove('up');
            }, 75);
            break;
          case 'ArrowLeft':
            this.player.image = this.urlBase+'player/male/left.gif';
            this.movePlayer = this.$interval(() => {
              this.playerMove('left');
            }, 75);
            break;
          case 'ArrowRight':
            this.player.image = this.urlBase+'player/male/right.gif';
            this.movePlayer = this.$interval(() => {
              this.playerMove('right');
            }, 75);
            break;
          case 'Enter':
            console.log('enter');
            break;
          case 'Escape':
            console.log('esc');
            break;
          default:
            return; // Quit when this doesn't handle the key event.
          }
          // console.log(this.player.position);
          // Cancel the default action to avoid it being handled twice
        }
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
        }, 100)
          .then(() => {
            this._hasPokemon();
          });
      }
    }

    _playerDown(){
      if(this.player.position.y < (this.mapa.map.length - 1)){
        if(this._canImoveMe(this.player.position.x,(this.player.position.y+1))){
          return this.player.position.y = this.player.position.y+1;
        }
      }
      return false;
    }

    _playerUp(){
      if((this.player.position.y - 1) >= 0){
        if(this._canImoveMe(this.player.position.x,(this.player.position.y-1))){
          return this.player.position.y = this.player.position.y-1;
        }
      }
      return false;
    }

    _playerLeft(){
      if((this.player.position.x - 1) >= 0){
        if(this._canImoveMe((this.player.position.x-1),this.player.position.y)){
          return this.player.position.x = this.player.position.x-1;
        }
      }
      return false;
    }

    _playerRight(){
      if(this.player.position.x < (this.mapa.map.length - 1)){
        if(this._canImoveMe((this.player.position.x+1),this.player.position.y)){
          return this.player.position.x = this.player.position.x+1;
        }
      }
      return false;
    }

    _canImoveMe(x,y){
      return (this.Image.imageType[this.mapa.map[y].colunas[x].type].canPass && !(this.mapa.map[y].colunas[x].object != ''));
    }

    _cancelMove(){
      this.$interval.cancel(this.movePlayer);
      this.movePlayer = undefined;
      this.arrowKey = '';
    }

    _hasPokemon(){
      if(!this.Image.imageType[this.mapa.map[this.player.position.y].colunas[this.player.position.x].type].canHavePokemon){
        return false;
      }
      let randChance = Math.floor((Math.random() * 11) + 0);
      if(randChance <= (this.Image.imageType[this.mapa.map[this.player.position.y].colunas[this.player.position.x].type].canHavePokemon * 10)){
        this._startBattle();
      }
    }

    _startBattle(){
      this.Sounds.startSound(14);
      this._cancelMove();
      this.inMovement = true;
      this.$timeout(() => {
        let randPokemonOponent = Math.floor((Math.random() * 4) + 0);
        let randPokemonPlayer = Math.floor((Math.random() * 4) + 0);
        this.player.pokemon = angular.copy(this.pokemon[randPokemonPlayer]);
        this.oponent.pokemon = angular.copy(this.pokemon[randPokemonOponent]);
      }).then(() => {
        $('#battleModal').modal('show');
      });
    }
    backToGame(){
      $('#battleModal').modal('hide');

      this.Sounds.startSound(1);
      this.inMovement = false;
      this.disabled = false;
      this.victory = null;
    }

    attack(index){
      this.disabled = true;
      this.$timeout(() => {
        if(this.player.pokemon.life > 0){
          let dano = this.player.pokemon.attacks[index].power;
          this.oponent.pokemon.life = this.oponent.pokemon.life - dano;
          if(this.oponent.pokemon.life > 0){
            this.$timeout(() => {
              let randAttack = Math.floor((Math.random() * 4) + 0);
              let danoOp = this.oponent.pokemon.attacks[randAttack].power;
              this.player.pokemon.life = this.player.pokemon.life - danoOp;
              this.disabled = false;
            },500)
              .then(() => {
                this._whoWin();
              });
          }
        }
        return true;
      })
        .then(() => {
          this._whoWin();
        });
    }

    _whoWin(){
      if(this.player.pokemon.life <= 0){
        this.victory = 'op';
      }else if(this.oponent.pokemon.life <= 0){
        this.victory = 'player';
      }
    }
  }
};
