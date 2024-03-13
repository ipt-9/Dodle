import { Injectable } from '@angular/core';
import {Location} from "./location";
import {OnInit} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocationService implements OnInit{

  constructor() { }

  ngOnInit() {
  }

  watchId = 0

  watchPosition(){
    let coords:GeolocationPosition[] = []
    this.watchId = navigator.geolocation.watchPosition(
        (data)=>{
        coords.push(data)
        },
      ()=>{},
      { enableHighAccuracy: true},
      )
    return coords
  }

  stopWatch(){
    navigator.geolocation.clearWatch(this.watchId)
  }

}
