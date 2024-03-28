import {Component, OnInit} from '@angular/core';
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
export class AppComponent{
  title = "hello"
}
