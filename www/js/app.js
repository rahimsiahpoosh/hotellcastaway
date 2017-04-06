// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//Min instansvariabel och object
var incheck = { "checkinmonth": '', "checkindate": '',
                "checkoutmonth": '', "checkoutdate": '',
                "adults": '', "children": '',
                "bookroom":'', "firstname": '',
                "lastname":'', "email": '',
                "phonenumber":''
              }; 

angular.module('starter', ['ionic' , 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("ListController", function($scope, $rootScope, $http, $state){ //$state är en tjänst på angular1
  $http.get('js/data.json').success(function(data){
    //All data som hämtas hamnar i $scope.data
    $scope.data = data;
    /*Den väljer ut vilket rum beroende på id med hjälp av filter i info.html*/
    $scope.whichroom = $state.params.aId;
  })
    //i $scopet.reg så säger vi att den har objekt incheck
    $scope.reg = incheck;

    /*Med hjälp av setBookRoom så så hämtar vi innehållet av det rummet som vi valt att titta
    vidare på i info.html med hjälp av ng-init*/
    $scope.setBookRoom = function(room) {
      incheck.bookroom = room;
    }
    /*Med hjälp av $scope.start functionen så ser vi till att start.html restartas*/
  $scope.start = function() {
    location.href = location.origin;
  }

}) //ListController
 .config(function($stateProvider, $urlRouterProvider) {


        $stateProvider
            .state('start', { //variabeln
                url: '/start', //addressen finns i variabeln
                templateUrl: 'templates/start.html' //innehållet och all material finns i t.url
            })
            .state('reserve', {
                url: '/reserve',
                templateUrl: 'templates/reserve.html'               
            })
            .state('info', {
                url:'/reserve/:aId', //Hemsidan väljs med hjälp av rummet 
                templateUrl: 'templates/info.html'
            })
              .state('book', {
                url:'/info/:aId', 
                templateUrl: 'templates/book.html',
                controller: 'ListController'
            })
                .state('receipt', {
                url:'/receipt',
                templateUrl: 'templates/receipt.html'
            })
        $urlRouterProvider.otherwise('/start'); //Vår start sida
    });
