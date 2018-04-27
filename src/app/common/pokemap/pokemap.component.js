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
          name: 'Grass 1',
          image: '../../../../media/grass_1.png'
        },
        {
          type: 2,
          name: 'Grass 2',
          image: '../../../../media/grass_2.png'
        },
        {
          type: 3,
          name: 'Grass 3',
          image: '../../../../media/grass_3.png'
        },
        {
          type: 4,
          name: 'Grass Flowers 1',
          image: '../../../../media/grass_flowers_1.png'
        },
        {
          type: 5,
          name: 'Ground 1',
          image: '../../../../media/ground_1.png'
        },
        {
          type: 6,
          name: 'Road 1',
          image: '../../../../media/road_1.png'
        },
        {
          type: 7,
          name: 'Road 2',
          image: '../../../../media/road_2.png'
        },{
          type: 8,
          name: 'Ground 1',
          image: '../../../../media/rock_1.png'
        },
        {
          type: 9,
          name: 'Tall Grass 1',
          image: '../../../../media/tall_grass_1.png'
        },
        {
          type: 10,
          name: 'Tall Grass 2',
          image: '../../../../media/tall_grass_2.png'
        },
        {
          type: 11,
          name: 'Water 1',
          image: '../../../../media/water_1.png'
        },
        {
          type: 12,
          name: 'Water 2',
          image: '../../../../media/water_2.png'
        },
        {
          type: 13,
          name: 'Wood Fance',
          image: '../../../../media/wood_face_1.png'
        },
        {
          type: 14,
          name: 'Flowers 1',
          image: '../../../../media/flower_1.png'
        },
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
