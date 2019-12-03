import { AfterContentInit, NgZone, ViewChild, Component, OnInit  } from '@angular/core';
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
    markers;

  @ViewChild('mapElement', { static: true}) mapElement;

  constructor(private ngZone: NgZone,private geolocation: Geolocation) {}


  ngOnInit(): void {

  }

  ngAfterContentInit(): void {

      this.loadMap()
            // this.errorLog,
      // this.postionOptions);

   }

   errorLog(error): void {
       console.log('Error getting location', error);
   }

   nearbyPlace(latLng) {
       // this.loadMap();
       this.markers = [];
       const service = new google.maps.places.PlacesService(this.map);

      console.log(service);
       service.nearbySearch({
                 location: latLng,
                 radius: 5000,
                 types: ['restaurants']
               }, (results, status) => {
                   this.callback(results, status);
               });
     }
     callback(results, status) {
       if (status === google.maps.places.PlacesServiceStatus.OK) {
         for (var i = 0; i < results.length; i++) {
           this.createMarker(results[i]);
         }
       }
     }

     createMarker(place) {
       const placeLoc = place;
       console.log('placeLoc', placeLoc)
       this.markers = new google.maps.Marker({
           map: this.map,
           position: place.geometry.location
       });
       // console.log()
       const infowindow = new google.maps.InfoWindow();
       google.maps.event.addListener(this.markers, 'click', () => {
         this.ngZone.run(() => {
           infowindow.setContent(place.name);
           infowindow.open(this.map, this.markers);
         });
       });
     }

   loadMap(): void {
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
       this.addMarker(pos.coords.latitude, pos.coords.longitude);
       this.nearbyPlace(latLng);
 })
   .catch((error) => {
 console.log('Error getting location', error);
 });


     // console.log('Successfull');
     // const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
     // const mapOptions = {
     //   center: latLng,
     //   zoom: 15,
     //   mapTypeId: google.maps.MapTypeId.ROADMAP
     // };
     //
     // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   }

   addMarker(lat: number, lng: number): void {

    const latLng = new google.maps.LatLng(lat, lng);

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
    });
    console.log('Hello');
    marker.setMap(this.map);
    // this.markers.push(marker);

  }
 }
