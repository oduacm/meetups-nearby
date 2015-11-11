var app = angular.module("meetupsNearby", ["ngMaterial"]);

app.config(function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.filter('unsafe', function($sce){
    return function(val) {
        return $sce.trustAsHtml(val);
    }
});

app.filter('momentify', function(){
    return function(val) {
        return moment(val).format('MMMM Do YYYY, h:mm:ss a');
    }
});

app.controller("MainController", function($scope, $http){
  $http({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    url: 'https://meetup-events-api.herokuapp.com/meetup_events/nldm.json'
  }).then(function successCallback(response) {
        $scope.meetups = response.data.events;
        $scope.groups = response.data.groups;
      }, function errorCallback(response) {
        console.log(response);
    });
  });
