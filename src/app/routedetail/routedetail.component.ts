import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-routedetail',
  standalone: true,
  templateUrl: './routedetail.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './routedetail.component.css'
})
export class RoutedetailComponent implements OnInit{
  id:number|undefined;
  name: string|undefined;
  desc: string|undefined;
  longDesc: string|undefined;
  image: string|undefined;
  distance: number|undefined;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if(isNaN(this.id)){
      this.router.navigate(["/"])
    }

    this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php").subscribe(data=>{
      for(let i = 0; i < data.length; i++){
        if(data[i]['id'] == this.id){
          this.name = data[i]['name']
          this.desc = data[i]['desc']
          this.longDesc = data[i]['longDesc']
          this.image = data[i]['image']
          this.distance = data[i]['distance']

        }
      }
    })
  }
}
