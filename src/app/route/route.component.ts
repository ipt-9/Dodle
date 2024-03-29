import { Component } from '@angular/core';
import {OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationService} from "../location.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent implements OnInit{
  routeName: string = "Default"
  currentQuestion: number = -1
  question: any;
  multipleChoiseAnswers: any = []
  currentAnswer = false;
  questionDone = false;
  locationName: string | undefined;
  arrowRotation: any = 0

  public id: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, protected locationService: LocationService) {
  }

  ngOnInit() {
    let questions:any = []

    //get ID
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(isNaN(this.id)){
      this.router.navigate(["/"])
    }

    //get Name
    this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php").subscribe(data=>{
      for(let i = 0; i < data.length; i++){
        if(data[i]['id'] == this.id){
          this.routeName = data[i]['name']
        }
      }
    })

    //get Question Data
    this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php?id="+this.id).subscribe(data=>{
      questions.push(data)
      this.question = questions[0]
      this.nextQuestion()
    })
  }

  nextQuestion(){
    this.currentQuestion++
    this.currentAnswer = false
    this.questionDone = false

    //name
    this.locationName = this.question[this.currentQuestion]['locationName']

    if(this.currentQuestion>=this.question.length){
      this.router.navigate(["/"])
    }


    this.multipleChoiseAnswers = [
      {ans: this.question[this.currentQuestion]['ans'], isCorrect: true},
      {ans: this.question[this.currentQuestion]['fillers'][0], isCorrect: false},
      {ans: this.question[this.currentQuestion]['fillers'][1], isCorrect: false},
      {ans: this.question[this.currentQuestion]['fillers'][2], isCorrect: false},
    ]

    this.multipleChoiseAnswers = this.shuffle(this.multipleChoiseAnswers)

    this.locationService.stopWatch()
    this.locationService.watchPosition()
    this.locationService.distanceFromCurrentPosition({timestamp:0, coords: {latitude: this.question[this.currentQuestion]['lat'],longitude: this.question[this.currentQuestion]['lon'],accuracy: 0, altitude: 0, altitudeAccuracy: 0, speed:0, heading:0}})
  }

  changeAnswer(answer: any){
    if(answer.isCorrect){
      this.currentAnswer = true;
    }
  }

  checkAnswer(){
    if(this.currentAnswer){
      this.questionDone = true
    }
  }

  shuffle(array:any[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  protected readonly Math = Math;
  protected readonly LocationService = LocationService;
}
