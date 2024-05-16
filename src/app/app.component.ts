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
    const loadingelement = document.getElementById("load")
    window.addEventListener("load", ()=>{
      if(loadingelement!=null){
        loadingelement.className += " fade-out"
      }
    })

    function stateChange() {
      setTimeout(function () {
        if(loadingelement!=null){
          loadingelement.className += " fade-out"
        }
      }, 5000);
    }
  }
}
