import { Component } from '@angular/core';
import {OnInit} from "@angular/core";

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent implements OnInit{
  routeName: string = "Default"
  numbersOfQuestions: number = 0
  currentQuestion: number = 0

  ngOnInit() {
    this.routeName = "Pilatus"
  }

}
