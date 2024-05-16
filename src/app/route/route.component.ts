import { Component } from '@angular/core';
import {OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationService} from "../location.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, NonNullableFormBuilder} from "@angular/forms";
import {GoogleMap, GoogleMapsModule, MapAdvancedMarker, MapMarker} from "@angular/google-maps";
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";
import {HapticService} from "../haptic.service";
import {Location} from "../location";
import {routes} from "../app.routes";

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    GoogleMap,
    MapAdvancedMarker,

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
  questionwrong = false;
  locationName: string | undefined;
  public id: number = 0;
  map:any;
  coords:any[] = []
  markers:any[] = []
  mapOptions: google.maps.MapOptions = {}
  distance: number = 9999;
  LiveMarker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement;
  pinElement = document.createElement('div')



  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private hapticService: HapticService) {
  }


  ngOnInit() {
    this.pinElement.className = "bg-primary rounded-circle"
    this.pinElement.setAttribute("style", "border: solid white 1px; padding: 4px")
    this.LiveMarker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      content: this.pinElement
    })

    this.coords = this.watchPosition()
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

    //Map
    this.mapOptions = {
      center: { lat: 47, lng: 8},
      zoom : 16,
      zoomControl: true,
      mapTypeControl: false,
      mapTypeId: "satellite",
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: "cooperative",
      mapId: "a222f34a16b3146a"
    }

    // @ts-ignore
    this.map = new google.maps.Map(document.getElementById("map-canvas"), this.mapOptions)
  }

  nextQuestion(){
    this.currentQuestion++
    if(this.currentQuestion == this.question.length-1){
      this.router.navigate(["/finish/"+this.id])
    }

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

    this.stopWatch()
    this.watchPosition()
    this.distanceFromCurrentPosition({timestamp:0, coords: {latitude: this.question[this.currentQuestion]['lat'],longitude: this.question[this.currentQuestion]['lon'],accuracy: 0, altitude: 0, altitudeAccuracy: 0, speed:0, heading:0}})

    //Map
    this.map.panTo({ lat: parseFloat(this.question[this.currentQuestion]['lat']), lng: parseFloat(this.question[this.currentQuestion]['lon'])})

    //Marker
    let pinOptionActive = new google.maps.marker.PinElement({
      background: "#0D6EFD",
      glyphColor: "#0B54BA",
      borderColor: "#0B54BA",
      scale: 1
    })

    this.markers.push(new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: { lat: parseFloat(this.question[this.currentQuestion]['lat']), lng: parseFloat(this.question[this.currentQuestion]['lon'])},
    }))

    for(let i = 0; i < this.markers.length; i++){
      let pinOption = new google.maps.marker.PinElement({
        background: "#CBCBCB",
        glyphColor: "#7D7D7D",
        borderColor: "#7D7D7D",
        scale: 0.5
      })
      this.markers[i].content = i == this.markers.length -1 ? pinOptionActive.element : pinOption.element
    }

    // Reset button colors
    for(let i = 0; i < this.multipleChoiseAnswers.length; i++){
      const element = document.getElementById(`Answerbutton-${i}`);
      if (element !== null) {
        element.style.backgroundColor = "#FF7F50";
      }
    }

  }

  changeAnswer(answer: any, id: number){
    if(answer.isCorrect){
      this.questionDone = true
      // Change button color to green
      const element = document.getElementById(`Answerbutton-${id}`);
      if (element !== null) {
      element.style.backgroundColor = "#006400"; // ein dunkleres grün, sanft und moosig
      }
      this.hapticService.longVibrate()

      setTimeout(() => {
        // Code zum Übergehen zum nächsten Schritt oder zur nächsten Frage
        // Zum Beispiel könnte hier eine Methode aufgerufen werden, die die Logik zum Wechseln der Frage enthält
        this.nextQuestion();
      }, 1000);
    }
    else{
      this.questionDone = false;
      this.questionwrong = true;
      this.hapticService.shortVibrate();
      this.hapticService.shortVibrate();
      const element = document.getElementById(`Answerbutton-${id}`);
      if (element !== null) {
        element.style.backgroundColor = "lightgrey";
      }
      console.log(element);
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

  watchId: number = 0;
  watchIdDistance: number = 0;

  watchPosition(){
    this.watchId = navigator.geolocation.watchPosition(
      (data)=>{
        this.coords.push(data)

        this.LiveMarker.remove()
        this.LiveMarker = new google.maps.marker.AdvancedMarkerElement({
          map: this.map,
          content: this.pinElement,
          position: new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
        })
      },
      ()=>{},
      { enableHighAccuracy: true},
    )
    return this.coords
  }

  stopWatch(){
    navigator.geolocation.clearWatch(this.watchId)
    navigator.geolocation.clearWatch(this.watchIdDistance)
  }

  distanceFromCurrentPosition(coord: GeolocationPosition){
    this.watchIdDistance = navigator.geolocation.watchPosition(
      (data)=>{
        this.distance = (this.haversine({latitude: data.coords.latitude, longitude: data.coords.longitude}, coord.coords)) * 1000
      },
      ()=>{},
      { enableHighAccuracy: true},
    )
  }

  haversine(coord1: Location, coord2:Location)
  {
    let lat1:number  = coord1.latitude
    let lat2:number = coord2.latitude
    let lon1:number = coord1.longitude
    let lon2:number = coord2.longitude


    let dLat:number = (lat2 - lat1) * Math.PI / 180.0;
    let dLon:number = (lon2 - lon1) * Math.PI / 180.0;

    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;

    let a:number = Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
    let rad:number = 6371;
    let c:number = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
  }

  protected readonly Math = Math;
  protected readonly google = google;
  protected readonly parseFloat = parseFloat;
}
