import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})


export class MapsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mr: any;
  start = '';
  end = '';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 17,
      center: {lat: 45.7105041, lng: 4.9341411}
    });
     this.mr = new google.maps.Marker({
      position: {lat: 45.7105041, lng: 4.9341411},
       animation: 'DROP',
      map: this.map,
      title: 'Sully-Group'
    });
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
       // window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
