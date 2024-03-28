import { Injectable } from '@angular/core';
import {Location} from "./location";
import {OnInit} from "@angular/core";
import {first} from "rxjs";
import {AppComponent} from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class LocationService implements OnInit{

  public coords:GeolocationPosition[] = []
  public distancea= 1000

  constructor() { }

  ngOnInit() {
  }

  watchId = 0
  watchIdDistance = 0

  watchPosition(){
    this.watchId = navigator.geolocation.watchPosition(
        (data)=>{
          this.coords.push(data)
        },
      ()=>{},
      { enableHighAccuracy: true},
      )
    return this.coords
  }

  distanceFromCurrentPosition(coord: GeolocationPosition){
    this.watchIdDistance = navigator.geolocation.watchPosition(
      (data)=>{
        this.distancea= (this.haversine({latitude: data.coords.latitude, longitude: data.coords.longitude}, coord.coords)) * 1000
      },
      ()=>{},
      { enableHighAccuracy: true},
    )
  }

  stopWatch(){
    navigator.geolocation.clearWatch(this.watchId)
    navigator.geolocation.clearWatch(this.watchIdDistance)
  }

  haversine(coord1: Location, coord2:Location)
  {
    let lat1:number  = coord1.latitude
    let lat2:number = coord2.latitude
    let lon1:number = coord1.longitude
    let lon2:number = coord2.longitude


    let dLat:number = (lat2 - lat1) * Math.PI / 180.0;
    let dLon:number = (lon2 - lon1) * Math.PI / 180.0;

    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;

    let a:number = Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
    let rad:number = 6371;
    let c:number = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
  }

}
