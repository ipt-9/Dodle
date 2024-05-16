import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HapticService {

  constructor() { }

  iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

  shortVibrate(){
    if(!this.iOS()){
      navigator.vibrate(250)
    }
  }

  longVibrate(){
    if(!this.iOS()){
      navigator.vibrate(1000)
    }
  }

  playSound(name:string){
    let audio = new Audio()
    audio.src = "../../../assets/audio/"+name+".mp3"
    audio.load()
    audio.play()
  }

}
