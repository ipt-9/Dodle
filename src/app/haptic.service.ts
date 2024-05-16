import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HapticService {

  constructor() { }

  shortVibrate(){
    navigator.vibrate(250)
  }

  longVibrate(){
    navigator.vibrate(1000)
  }

  successVibrate(){
    navigator.vibrate([100, 150, 100, 150, 450])
  }

  vibrate(time: number){
    navigator.vibrate(time)
  }

  playSound(name:string){
    let audio = new Audio()
    audio.src = "../../../assets/audio/"+name+".mp3"
    audio.load()
    audio.play()
  }

}
