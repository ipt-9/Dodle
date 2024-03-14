import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LocationService} from "./location.service";
import {HapticService} from "./haptic.service";
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Test';
  coords:any = []
  public distance: number = 0;

  constructor(protected LocationService:LocationService, protected HapticService:HapticService) {}

  printCoord(){
    this.coords = this.LocationService.watchPosition()
  }

  ngOnInit() {
    this.LocationService.distanceFromCurrentPosition({timestamp:0, coords: {latitude: 47.17343,longitude: 8.094384,accuracy: 0, altitude: 0, altitudeAccuracy: 0, speed:0, heading:0}})
  }

  stopPrint(){
    this.LocationService.stopWatch()
  }

  protected readonly stop = stop;
  protected readonly Location = Location;
  protected readonly GeolocationPosition = GeolocationPosition;
  protected readonly Geolocation = Geolocation;
  protected readonly Math = Math;
}
