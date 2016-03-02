angular.module('app.controllers', ['ngElectron'])

.controller('MainController', ['$scope', '$rootScope','electron','uiGmapGoogleMapApi', 'uiGmapIsReady','electron',
function($scope, $rootScope, electron, uiGmapGoogleMapApi, uiGmapIsReady, electron) {

  //listen for host messages



  var self = this, mapslib, mapObj, marker;
  this.geocoderForm = {
      query: ''
  };
  this.mapReady = false;
  this.map = {
    center:{
      latitude: 40.416775,
      longitude: -3.703790
    },
    zoom:8
  }
 

 uiGmapGoogleMapApi.then(function(maps) {
    mapslib = maps;
  });

 uiGmapIsReady.promise(1).then(function(instances) {
      instances.forEach( function (inst) {
            self.mapObj = inst.map;
      });
    electron.send('getData');  
  });

  $rootScope.$on('electron-host', function( evt, data ) {
    data = data || {}
    if(data.places){
      self.places = data.places
      for( var i = 0, len = self.places.length; i<len; i++){
          self.setPlaceMarker(self.places[i], self.mapObj)
      }
    }
  });

  this.setPlaceMarker = function (place, map){
    placePosition = {lat: place.lat, lng: place.lon}
    place.infowindow = new mapslib.InfoWindow({content: place.name})
    place.marker = new mapslib.Marker({
             position: placePosition,
             map:map
    });
    place.marker.addListener('click', function() {
      place.infowindow.open(map, place.marker);
    });
  }

}]);
