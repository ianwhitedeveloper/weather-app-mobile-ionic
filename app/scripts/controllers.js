'use strict';
angular.module('IonicWeatherApp.controllers', ['ionic'])

.controller('DashCtrl', function($scope, $ionicLoading, $ionicModal, Cities, localStorageService) {
  $scope.hide = true;
  $scope.cityComments = [];
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createComment = function(comment) {
    // $scope.cityComments.push({
    //   comment: city.comment
    // });
    console.log(comment.body);
    // console.log(this.city);
    // console.log(this.state);
    $scope.modal.hide();
    console.log(Cities.find(this.city, this.state, comment.body));
    comment.body = "";
  };

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Execute action on hide modal
  $scope.$on('modal.hide', function() {
    // Execute action
  });

  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.add = function(cityName, stateName) {
    console.log(cityName + ', ' + stateName);
    $scope.city = cityName;
    $scope.state = stateName;
    $ionicLoading.show({
      content: 'Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ", " + stateName + "&mode=json&units=imperial",
        type: "get",
        dataType: "json",
        success: function (data) {
          $ionicLoading.hide();
          $scope.hide = false;
          console.log(data.main.temp);
          $scope.$apply(function() { //necessary to $apply the changes
            $scope.cityInfo = "Weather Info For " + cityName + ', ' + stateName + ":"
            $scope.temp = '' || "Temp: " + data.main.temp + " °F";
            $scope.highTemp = '' || "Hi: " + data.main.temp_max + " °F";
            $scope.lowTemp = '' || "Lo: " + data.main.temp_min + " °F";
            $scope.pressure = '' || "Pressure: " + data.main.pressure + " hPa";
            $scope.humidity = '' || "Humidity: " + data.main.humidity + " %";
          })
        },
        error: function(xhr, status) {
          console.log("Error: " + status);
        }
      });
  };

  $scope.clear = function() {
    $('input').val('');
  }
})

.controller('CityCtrl', function($scope, Cities, localStorageService) {
  $scope.cities = Cities.all();
})

.controller('CityDetailCtrl', function($scope, $stateParams, Cities, localStorageService) {
  // console.log(Cities.get($stateParams));
  $scope.city = Cities.get($stateParams);
});

// .controller('FriendsCtrl', function($scope, Friends) {
//   $scope.friends = Friends.all();
// })

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })

// .controller('AccountCtrl', function($scope) {
// });
