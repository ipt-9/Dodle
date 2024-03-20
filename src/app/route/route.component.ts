import { Component } from '@angular/core';
import {OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationService} from "../location.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

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
  questions:any = []
  multipleChoiseAnswers: any = []
  currentAnswer = false;
  questionDone = false;

  public id: number | null | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, protected locationService: LocationService) {
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if(isNaN(this.id)){
      this.router.navigate(["/"])
    }

    this.http.get<any>("https://dodle-bmsd21a.bbzwinf.ch/assets/api.php?id=0").subscribe(data=>{
      this.questions.push(data)
      this.nextQuestion()
    })
  }

  nextQuestion(){
    this.currentQuestion++
    this.currentAnswer = false
    this.questionDone = false

    if(this.currentQuestion>=this.questions[0].length){
      this.router.navigate(["/"])
    }


    this.multipleChoiseAnswers = [
      {ans: this.questions[0][this.currentQuestion]['ans'], isCorrect: true},
      {ans: this.questions[0][this.currentQuestion]['fillers'][0], isCorrect: false},
      {ans: this.questions[0][this.currentQuestion]['fillers'][1], isCorrect: false},
      {ans: this.questions[0][this.currentQuestion]['fillers'][2], isCorrect: false},
    ]

    this.multipleChoiseAnswers = this.shuffle(this.multipleChoiseAnswers)

    this.locationService.stopWatch()
    this.locationService.watchPosition()
    this.locationService.distanceFromCurrentPosition({timestamp:0, coords: {latitude: this.questions[0][this.currentQuestion]['lat'],longitude: this.questions[0][this.currentQuestion]['lon'],accuracy: 0, altitude: 0, altitudeAccuracy: 0, speed:0, heading:0}})
  }

  changeAnswer(answer: any){
    if(answer.isCorrect){
      this.currentAnswer = true
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