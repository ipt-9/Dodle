import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent implements OnInit{
  id: number|undefined;
  routeName: string|undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php").subscribe(data=>{
      for(let i = 0; i < data.length; i++){
        if(data[i]['id']==this.id){
          this.routeName = (data[i]['name'])
        }
      }
    })
  }
}
