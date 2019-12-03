import { AfterContentInit, ViewChild, Component, OnInit  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit {

postionOptions: any;

    map;

  @ViewChild('mapElement', { static: true}) mapElement;

  constructor(private geolocation: Geolocation) {}


  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.postionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.geolocation.getCurrentPosition(this.postionOptions)
    .then((pos) => {
      console.log('Successfull');
      const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

})
  .catch((error) => {
console.log('Error getting location', error);
});
      // this.loadMap,
      // this.errorLog,
      // this.postionOptions);

   }

   errorLog(error): void {
       console.log('Error getting location', error);
   }

   loadMap(pos): void {
     console.log('Successfull');
     const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
     const mapOptions = {
       center: latLng,
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };

     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


   }

 }
