export class SoundsService {
  constructor(urlBase){
    'ngInject';
    this.urlBaseSounds = urlBase+'sounds/';
    this.sounds = [
      {
        name: '02 Enter Rayquaza',
        path: this.urlBaseSounds+'02.mp3'
      },
      {
        name: '03 Battle Frontier',
        path: this.urlBaseSounds+'03.mp3'
      },
      {
        name: '04 Battle Tower',
        path: this.urlBaseSounds+'04.mp3'
      },
      {
        name: '05 Battle Dome 1',
        path: this.urlBaseSounds+'05.mp3'
      },
      {
        name: '06 Battle Dome 2',
        path: this.urlBaseSounds+'06.mp3'
      },
      {
        name: '07 Battle Palace',
        path: this.urlBaseSounds+'07.mp3'
      },
      {
        name: '08 Battle Arena',
        path: this.urlBaseSounds+'08.mp3'
      },
      {
        name: '09 Battle Factory',
        path: this.urlBaseSounds+'09.mp3'
      },
      {
        name: '10 Battle Pike',
        path: this.urlBaseSounds+'10.mp3'
      },
      {
        name: '11 Battle Pyramid 1',
        path: this.urlBaseSounds+'11.mp3'
      },
      {
        name: '12 Battle Pyramid 2',
        path: this.urlBaseSounds+'12.mp3'
      },
      {
        name: '13 Battle Points Get!',
        path: this.urlBaseSounds+'13.mp3'
      },
      {
        name: '14 Battle! Frontier Brain',
        path: this.urlBaseSounds+'14.mp3'
      },
      {
        name: '15 Battle Symbol Get!',
        path: this.urlBaseSounds+'15.mp3'
      },
      {
        name: '16 Battle! Mew',
        path: this.urlBaseSounds+'16.mp3'
      },
    ]
  }
  startSound (musicIndex){
    let audio = new Audio(this.sounds[musicIndex].path);
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    audio.play();
  }
}
