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
            object:''
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
    showImage(mapId, col){
      if(this.imageType[col.type].imagePath == ''){
        return this.imageType[col.type].image;
      }
      let mapa = {
        x:col.id,
        y:mapId
      }
      let around = this.createAround(mapa);
      return this.verifyPositions(mapa,around);
    }
    verifyPositions(mapa,around){
      let typeSelected = this.mapa[mapa.y].colunas[mapa.x].type;

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

      //all diferent
      if(
        lt === true &&
        t  === true &&
        rt === true &&
        r  === true &&
        rd === true &&
        d  === true &&
        ld === true &&
        l  === true
      ){
        return this.imageType[typeSelected].imagePath+'full.png';
      }
      //all equal
      if(
        lt === false &&
        t  === false &&
        rt === false &&
        r  === false &&
        rd === false &&
        d  === false &&
        ld === false &&
        l  === false
      ){
        return this.imageType[typeSelected].imagePath+'center.png';
      }

    }
    verifyPositionMap(mapa,around, position){
      let typeSelected = this.mapa[mapa.y].colunas[mapa.x].type;
      let diferent = false;

      let teste = around.forEach((item) => {
        if(position == item.position){
          // console.log(typeSelected,'typeS');
          // console.log(this.mapa[item.y].colunas[item.x].type,'type');
          if(this.mapa[item.y].colunas[item.x].type != typeSelected){
            diferent = true;
          }
        }
      })
      return diferent;
    }
  }
};
