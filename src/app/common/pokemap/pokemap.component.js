import templateUrl from './pokemap.component.html';
import './pokemap.component.scss';

export const PokemapComponent = {
  templateUrl,
  controller: class PokemapController{
    constructor($scope, urlBase){
      'ngInject';
      this.$scope = $scope;
      this.urlBase = urlBase;
    }
    $onInit(){
      this.totalMapa = 0;
      this.type = 0;
      this.press = false;
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
          linhas.push({
            id:a,
            id_map:i,
            type: this.type,
            object:'',
            beforeOne: '',
            afterOne: '',
            beforeTwo: '',
            afterTwo: '',
          });
        }
        this.mapa.push({id:i, colunas:linhas});
      }
    }
    alteraTipo(map,col){
      if(!this.imageType[this.type].isObject){
        this.mapa[map].colunas[col].type = this.type;
        this.mapa[map].colunas[col].object = '';
      }else{
        if(this.imageType[this.mapa[map].colunas[col].type].canHaveObject){
          this.mapa[map].colunas[col].object = this.type;
        }
      }
    }
    handleMouseover(map,col){
      if(this.press){
        this.alteraCampo(map,col);
      }
    }
    handleMouseDown(mapId,colId){
      this.press = true;
      this.alteraCampo(mapId,colId);
    }
    alteraCampo(mapId,colId){
      this.alteraTipo(mapId,colId);
      this.verifyPositions({x:colId, y:mapId});
    }
    handleMouseUp(){
      this.press = false;
    }
    saveMap(){
      console.log(this.mapa);
    }
    createAround(mapa){
      let around = [
        {
          position: 'lt',
          x: mapa.x - 1,
          y: mapa.y - 1
        },
        {
          position: 't',
          x: mapa.x,
          y: mapa.y - 1
        },
        {
          position: 'rt',
          x: mapa.x + 1,
          y: mapa.y - 1
        },
        {
          position: 'r',
          x: mapa.x + 1,
          y: mapa.y
        },
        {
          position: 'rd',
          x: mapa.x + 1,
          y: mapa.y + 1
        },
        {
          position: 'd',
          x: mapa.x,
          y: mapa.y + 1
        },
        {
          position: 'ld',
          x: mapa.x - 1,
          y: mapa.y + 1
        },
        {
          position: 'l',
          x: mapa.x - 1,
          y: mapa.y
        }
      ]
      return around;
    }
    verifyPositions(mapa){
      let around = this.createAround(mapa);

      let typeSelected = this.mapa[mapa.y].colunas[mapa.x].type;

      this.mapa[mapa.y].colunas[mapa.x].beforeOne = '';
      this.mapa[mapa.y].colunas[mapa.x].afterOne = '';
      this.mapa[mapa.y].colunas[mapa.x].beforeTwo = '';
      this.mapa[mapa.y].colunas[mapa.x].afterTwo = '';

      let lt = this.verifyPositionMap(mapa,around,'lt');
      let t  = this.verifyPositionMap(mapa,around,'t');
      let rt = this.verifyPositionMap(mapa,around,'rt');
      let r  = this.verifyPositionMap(mapa,around,'r');
      let rd = this.verifyPositionMap(mapa,around,'rd');
      let d  = this.verifyPositionMap(mapa,around,'d');
      let ld = this.verifyPositionMap(mapa,around,'ld');
      let l  = this.verifyPositionMap(mapa,around,'l');

      console.log(lt, 'lt');
      console.log(t, 't');
      console.log(rt,'rt');
      console.log(r, 'r');
      console.log(rd,'rd');
      console.log(d, 'd');
      console.log(ld,'ld');
      console.log(l, 'l');
      if(this.imageType[typeSelected].imagePath){
        if(t){
          this.mapa[mapa.y].colunas[mapa.x].beforeOne = this.imageType[typeSelected].imagePath+'top.png';
        }
        if(d){
          this.mapa[mapa.y].colunas[mapa.x].afterOne = this.imageType[typeSelected].imagePath+'down.png';
        }
        if(l){
          this.mapa[mapa.y].colunas[mapa.x].beforeTwo = this.imageType[typeSelected].imagePath+'left.png';
        }
        if(r){
          this.mapa[mapa.y].colunas[mapa.x].afterTwo = this.imageType[typeSelected].imagePath+'right.png';
        }

        if((t && l) && (!d && !r)){
          this.mapa[mapa.y].colunas[mapa.x].beforeOne = this.imageType[typeSelected].imagePath+'left_top.png';
        }
        if((t && r) && (!d && !l)){
          this.mapa[mapa.y].colunas[mapa.x].beforeOne = this.imageType[typeSelected].imagePath+'right_top.png';
        }
        if((d && l) && (!t && !r)){
          this.mapa[mapa.y].colunas[mapa.x].afterOne = this.imageType[typeSelected].imagePath+'left_down.png';
        }
        if((d && r) && (!t && !l)){
          this.mapa[mapa.y].colunas[mapa.x].afterOne = this.imageType[typeSelected].imagePath+'right_down.png';
        }
      }
    }
    verifyPositionMap(mapa,around, position){
      let typeSelected = this.mapa[mapa.y].colunas[mapa.x].type;
      let diferent = false;

      around.forEach((item) => {
        if(position == item.position){
          if(item.y < 0){
            item.y = 0;
          }
          if(item.x < 0){
            item.x = 0;
          }
          if (item.y >= this.totalMapa) {
            item.y = this.totalMapa - 1;
          }
          if (item.x >= this.totalMapa) {
            item.x = this.totalMapa - 1;
          }
          if(this.mapa[item.y].colunas[item.x].type != typeSelected){
            diferent = true;
          }
        }
      })
      return diferent;
    }
    handleBeforeOne(mapId,colId){
    //  console.log(mapId,colId);
      return this.mapa[mapId].colunas[colId].beforeOne;
    }
    handleAfterOne(mapId,colId){
      return this.mapa[mapId].colunas[colId].afterOne
    }
    handleBeforeTwo(mapId,colId){
      return this.mapa[mapId].colunas[colId].beforeTwo
    }
    handleAfterTwo(mapId,colId){
      return this.mapa[mapId].colunas[colId].afterTwo
    }
  }
};
