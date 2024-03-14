import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private cookieService: CookieService) { }

  saveData(key:string, value:string){
      this.cookieService.set(key, value)
  }

  readData(key:string){
    return this.cookieService.get(key)
  }

}
