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
      this.type = 1;
      this.imageType = ['../../../../media/grass.png','../../../../media/growGrass.png']
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
  }
};
