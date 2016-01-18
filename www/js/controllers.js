angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.timeData = {};

  $scope.saveTimeData = function() {
    console.log($scope);
    $scope.$time = [
      {start: getCurrentTime(), last: new Date($scope.timeData.lastday), holidays: $scope.timeData.holidays, specialdays: $scope.timeData.specialDays}
    ]
  };


})

.controller('HomeCtrl', function($scope) {
  console.log('time');
})

.controller('HomeCtrl', function($scope, $stateParams) {
  console.log('wtf');
  console.log($scope);
});


function getCurrentTime() {
  var current = new Date();
  var currentDay = current.getDay();
  var currentMonth = current.getMonth() + 1;
  var currentYear = current.getFullYear();

  return currentMonth+'/'+currentDay+'/'+currentYear;
}

function workingDaysBetweenDates(startDate, endDate, holidays, specialdays) {

  // Validate input
  if (endDate < startDate)
    return 0;

  // Calculate days between dates
  var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
  startDate.setHours(0,0,0,1);  // Start just after midnight
  endDate.setHours(23,59,59,999);  // End just before midnight
  var diff = endDate - startDate;  // Milliseconds between datetime objects
  var days = Math.ceil(diff / millisecondsPerDay);

  // Subtract two weekend days for every week in between
  var weeks = Math.floor(days / 7);
  days = days - (weeks * 2);

  // Handle special cases
  var startDay = startDate.getDay();
  var endDay = endDate.getDay();

  // Remove weekend not previously removed.
  if (startDay - endDay > 1)
    days = days - 2;

  // Remove start day if span starts on Sunday but ends before Saturday
  if (startDay == 0 && endDay != 6) {
    days = days - 1;
  }

  // Remove end day if span ends on Saturday but starts after Sunday
  if (endDay == 6 && startDay != 0) {
    days = days - 1;
  }

  // Remove holidays
  days = days - holidays;

  // Remove special days
  days = days - specialdays;

  return days;
}
