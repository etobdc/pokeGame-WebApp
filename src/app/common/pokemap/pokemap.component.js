import templateUrl from './pokemap.component.html';
import './pokemap.component.scss';

export const PokemapComponent = {
  templateUrl,
  controller: class PokemapController{
    constructor($scope, urlBase, $http, Image){
      'ngInject';
      this.$scope = $scope;
      this.urlBase = urlBase;
      this.$http = $http;
      this.Image = Image;
    }
    $onInit(){
      this.totalMapa = 0;
      this.type = 0;
      this.press = false;
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
      if(!this.Image.imageType[this.type].isObject){
        this.mapa[map].colunas[col].type = this.type;
        this.mapa[map].colunas[col].object = '';
      }else{
        if(this.Image.imageType[this.mapa[map].colunas[col].type].canHaveObject){
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
      console.log(JSON.stringify(this.mapa));
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
      if(this.Image.imageType[typeSelected].imagePath){
        if(t){
          this.mapa[mapa.y].colunas[mapa.x].beforeOne = this.Image.imageType[typeSelected].imagePath+'top.png';
        }
        if(d){
          this.mapa[mapa.y].colunas[mapa.x].afterOne = this.Image.imageType[typeSelected].imagePath+'down.png';
        }
        if(l){
          this.mapa[mapa.y].colunas[mapa.x].beforeTwo = this.Image.imageType[typeSelected].imagePath+'left.png';
        }
        if(r){
          this.mapa[mapa.y].colunas[mapa.x].afterTwo = this.Image.imageType[typeSelected].imagePath+'right.png';
        }

        if((t && l) && (!d && !r)){
          this.mapa[mapa.y].colunas[mapa.x].beforeOne = this.Image.imageType[typeSelected].imagePath+'left_top.png';
        }
        if((t && r) && (!d && !l)){
          this.mapa[mapa.y].colunas[mapa.x].beforeOne = this.Image.imageType[typeSelected].imagePath+'right_top.png';
        }
        if((d && l) && (!t && !r)){
          this.mapa[mapa.y].colunas[mapa.x].afterOne = this.Image.imageType[typeSelected].imagePath+'left_down.png';
        }
        if((d && r) && (!t && !l)){
          this.mapa[mapa.y].colunas[mapa.x].afterOne = this.Image.imageType[typeSelected].imagePath+'right_down.png';
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
  }
};
