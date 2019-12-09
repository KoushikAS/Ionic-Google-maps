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
    currentPosition;

  @ViewChild('mapElement', { static: true}) mapElement;

  constructor(private ngZone: NgZone,private geolocation: Geolocation) {}

  ngOnInit(): void {  }

  ngAfterContentInit(): void {
      this.getCurrentLocation()
   }

  getCurrentLocation() {
    const postionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.geolocation.getCurrentPosition(postionOptions)
     .then((pos) => {
       console.log('Successfull');
       this.currentPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
       this.loadMap();
     })
     .catch((error) => {
       console.log('Error getting location', error);
     });
  }

  loadMap(): void {
    const mapOptions = {
      center: this.currentPosition,
      zoom: 50,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    console.log(this.currentPosition);
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(this.currentPosition);
    // this.nearbyPlace(this.currentPosition);
    this.getPositionsOfBusiness();
   }

  addMarker(latLng,): void {
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }
      });

    marker.setMap(this.map);
  }

  getPositionsOfBusiness(){
    const markers = [
      {
        lat:12.9569,
        lng:77.7011
      }
    ];
    this.createMarker(markers[0])
  }
   nearbyPlace(latLng) {

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
           this.createMarker(results[i].geometry.location);
         }
       }
     }

     createMarker(place) {

       this.markers = new google.maps.Marker({
           map: this.map,
           position: place
       });
       // console.log()
       // const infowindow = new google.maps.InfoWindow();
       // google.maps.event.addListener(this.markers, 'click', () => {
       //   this.ngZone.run(() => {
       //     infowindow.setContent(place.name);
       //     infowindow.open(this.map, this.markers);
       //   });
       // });
     } }
