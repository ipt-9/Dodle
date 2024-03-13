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

  haversine(coord1:GeolocationPosition, coord2:GeolocationPosition)
  {
    let lat1 = coord1.coords.latitude
    let lat2 = coord2.coords.latitude
    let lon1 = coord1.coords.longitude
    let lon2 = coord2.coords.longitude


    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;

    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;

    let a = Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
  }

}
