import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {routes} from "../app.routes";
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  routes: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php").subscribe(data=>{
      this.routes.push(data)
    })
    console.log(this.routes)
  }

  protected readonly JSON = JSON;
}
