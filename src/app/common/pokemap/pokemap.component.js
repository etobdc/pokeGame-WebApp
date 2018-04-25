import templateUrl from './pokemap.component.html';
import './pokemap.component.scss';

export const PokemapComponent = {
  templateUrl,
  controller: class PokemapController{
    constructor($scope){
      'ngInject';
      this.$scope = $scope;
    }
    $onInit(){
      this.totalMapa = 0;
      this.type = 0;
      this.press = false;
      this.imageType = [
        {
          type: 1,
          name: 'Grow Grass',
          image: '../../../../media/growGrass.png'
        },
        {
          type: 2,
          name: 'Grass',
          image: '../../../../media/grass.png'
        },
        {
          type: 3,
          name: 'Road 1',
          image: '../../../../media/road1.png'
        },
        {
          type: 4,
          name: 'Road 2',
          image: '../../../../media/road2.png'
        }
      ]
    }

    refresh(){
      window.location.reload();
    }

    setaTamanhoMapa(form){
      this.totalMapa = form.totalMapa;
      this.pokeMap();
    }

    pokeMap(){
      this.mapa = [];
      for (var i = 0; i < this.totalMapa; i++) {
        let linhas = [];
        for (var a = 0; a < this.totalMapa; a++) {
          linhas.push({id:a, id_map:i, type: this.type, hasPoekemon: false});
        }
        this.mapa.push({id:i, colunas:linhas});
      }
    }
    alteraTipo(map,col){
      this.mapa[map].colunas[col].type = this.type;
    }
    handleMouseover(map,col){
      if(this.press){
        this.alteraTipo(map,col);
      }
    }
    handleMouseDown(){
      this.press = true;
    }
    handleMouseUp(){
      this.press = false;
    }
    saveMap(){
      console.log(this.mapa);
    }
  }
};
