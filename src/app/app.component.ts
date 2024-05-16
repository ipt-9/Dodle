import {Component, ElementRef, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {HashLocationStrategy, LocationStrategy, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppComponent implements OnInit{
  constructor(private el: ElementRef) {
  }
  ngOnInit() {
    window.addEventListener("load", ()=>{
      const loadingelement = document.getElementsByClassName("load")

      for(let i = 0; i < loadingelement.length; i++){
        loadingelement[i].className += " fade-out"
      }
    })
  }
}
