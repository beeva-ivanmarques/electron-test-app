/**
 * Amy is Awesome!
 */
angular.module('app',
[
  "ngElectron",
  "ngAnimate",
  "ngAria",
  "ngMaterial",
  "ngRoute",
  "app.controllers",
  "app.directives",
  "app.services",
  "app.routes",
  "uiGmapgoogle-maps"
])
    .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
      });
    }]);
