import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LocationService} from "./location.service";
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Test';
  coords:any = []

  constructor(protected LocationService:LocationService) {}

  printCoord(){
    this.coords = this.LocationService.watchPosition()
  }

  stopPrint(){
    this.LocationService.stopWatch()
    console.log(this.coords[this.coords.length -1])
  }

  protected readonly stop = stop;
}
