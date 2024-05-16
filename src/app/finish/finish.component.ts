import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.css'
})
export class FinishComponent implements OnInit{
  title: string = "Pagename not found"
  id: number = 0
  wrongCounts: string | null = ""

  constructor(protected route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.wrongCounts = this.route.snapshot.queryParamMap.get("wrongCounts")

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php").subscribe(data=>{
      for(let i = 0; i < data.length; i++){
        if(data[i]['id'] == this.id){
          this.title = data[i]['name']
        }
      }
    })
  }
}
