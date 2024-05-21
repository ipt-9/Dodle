import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {routes} from "../app.routes";
import {HttpClient} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    FormsModule,
    NgIf,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  routes: any[] = [];

  constructor(private http: HttpClient, protected route: ActivatedRoute) {
  }

  ngOnInit() {
      this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php").subscribe(data=>{
        this.routes.push(data)
      })
  }



  search(){
    this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php?q="+this.text).subscribe(data=>{
      this.routes = []
      this.routes.push(data)
    })
  }
  protected readonly JSON = JSON;
  text: any;
}
