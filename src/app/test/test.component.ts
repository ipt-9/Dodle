import {Component, isStandalone, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../data.service";
import {LocationService} from "../location.service";
import {HapticService} from "../haptic.service";
import {GoogleMapsModule} from "@angular/google-maps";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{

  coords:any = []
  data_input = "";

  constructor(protected LocationService:LocationService, protected HapticService:HapticService, protected dataService:DataService, private google: GoogleMapsModule) {}

  printCoord(){
    this.coords = this.LocationService.watchPosition()
  }

  ngOnInit() {
    this.LocationService.distanceFromCurrentPosition({timestamp:0, coords: {latitude: 47.17343,longitude: 8.094384,accuracy: 0, altitude: 0, altitudeAccuracy: 0, speed:0, heading:0}})
  }

  stopPrint(){
    this.LocationService.stopWatch()
  }

  protected readonly Math = Math;
}
