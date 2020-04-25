import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMap, GoogleMaps, Marker, GoogleMapsEvent, Environment, GoogleMapsAnimation, GoogleMapOptions } from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { Http } from '@angular/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
map:GoogleMap;
latitude:any
longitude:any;
  constructor(public navCtrl: NavController,private geolocation:Geolocation,public http:Http) {

  }
  ionViewDidLoad(){
    this.loadMap();
  }
  loadMap(){
    this.geolocation.getCurrentPosition().then((resp)=>{
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
           lat: resp.coords.latitude,
           lng: resp.coords.longitude
          },
     zoom: 15,
         tilt: 30
        }
      }
      this.map= GoogleMaps.create('map_canvas',mapOptions);
    let marker: Marker = this.map.addMarkerSync({
      title:'My location',
      size: {
        width: 32,
        height: 24
      },
    //snippet: '@ionic-native/google-maps',
      icon: 'blue',
      infoWindowAnchor: [16, 0],
      anchor: [16, 32],
      flat: false,
      //rotation: 32,
      visible: true,
      styles: {
        'text-align': 'center',
        'font-style': 'italic',
        'font-weight': 'bold',
        'color': 'red'
      },
      animation: GoogleMapsAnimation.DROP,
    
      zIndex: 0,
    
      disableAutoPan: true,
      position:{
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      },
      draggable:true
    })
  
    marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((res) => {
    
       // alert(JSON.stringify(res));
       this.latitude=res[0].lat;
          this.longitude=res[0].lng;
          let body={
            lat:this.latitude,
            long:this.longitude
          }
     this.http.post("http://localhost:8080/map",body).subscribe(response=>{
      if(response.json().status==200)
      {
        alert("Success");
          }
          else{
            alert("Failed");
          }
      
    });
  
  })
})
  }
}