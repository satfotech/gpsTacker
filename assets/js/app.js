var gpsApp = angular.module('gpstrack', ['ngRoute']);
gpsApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/maps.html",
        controller : 'mapCtrl'
    })
    .when("/upload", {
        templateUrl : "templates/upload.html"
    })
    .otherwise({redirectTo:'/'});
});
