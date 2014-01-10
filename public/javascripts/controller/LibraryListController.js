function LibraryListController($scope, $http, $window) {
	$scope.libraries = [];
	$scope.newLibrary = {}
	$scope.markers = new Array();
	$scope.supportsGeo = $window.navigator;
	$scope.userLocation = {};
	$scope.showFilter = false;
	var RedIcon = L.Icon.Default.extend({
		options: {
			iconUrl: 'images/marker-icon-red.png'
		}
	});

	var redIcon = new RedIcon();
  $scope.userLocationObj = {
    lat: 0,
    lng: 0,
    id: 'userLocation',
    icon: redIcon
  };

	$scope.removeMarkers = function () {
		for (var i=0, len = $scope.markers.length; i < len; i++){
			$scope.markers.pop();
		}
	};

	$scope.submitDistance = function () {
		$scope.removeMarkers();

		$scope.markers.push($scope.userLocationObj);
		$scope.filteredLibraries= [];

		for (var i=0, len = $scope.libraries.length; i < len; i++) {
			if (distance($scope.userLocation.lat, $scope.userLocation.lng, $scope.libraries[i].lat, $scope.libraries[i].lng) <= $scope.miles){
				$scope.filteredLibraries.push($scope.libraries[i]);
			}
		}

		angular.forEach($scope.filteredLibraries, function(lib) {
			var contacts = lib.hasOwnProperty('contacts') ? lib.contacts : '';
			var email =  (contacts).hasOwnProperty('email') ? lib.contacts.email : '';
			var address = lib.address + '<br>'+lib.city+', New York ' + lib.zipcode + '<br>' + email;
    	$scope.markers.push({
    		lat: +lib.lat,
    		lng: +lib.lng,
    		id: lib.name,
    		message: lib.name + '<p>' + address + '</p>'
    	});
    });

	};

	$scope.geolocator = function() {
		window.navigator.geolocation.getCurrentPosition(function(pos) {
			$scope.userLocation.lat = pos.coords.latitude;
			$scope.userLocation.lng = pos.coords.longitude;

			$scope.$apply(function() {
				$scope.pos = pos;
				$scope.userLocationObj = {
		  		lat: pos.coords.latitude,
		  		lng: pos.coords.longitude,
          id: 'userLocation',
		  		message: '<p>Your location</p>',
		  		icon: redIcon
		  	};

				$scope.showFilter = true;

		  	angular.extend($scope, {
					center: {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
						zoom: 15,
					},
					defaults: {
						scrollWheelZoom: false
					}
				});

				$scope.removeMarkers();
				$scope.markers.push($scope.userLocationObj);

				for (var i=0, len = $scope.libraries.length; i < len; i++) {
					var lib = $scope.libraries[i];
					var contacts = lib.hasOwnProperty('contacts') ? lib.contacts : '';
					var email =  (contacts).hasOwnProperty('email') ? lib.contacts.email : '';
					var address = lib.address + '<br>'+lib.city+', New York ' + lib.zipcode + '<br>' + email;
					var marker = {
			  		lat: +lib.lat,
			  		lng: +lib.lng,
			  		id: lib.name,
			  		message: lib.name + '<p>' + address + '</p>',
			  	};

			  	if (distance($scope.userLocation.lat, $scope.userLocation.lng, $scope.libraries[i].lat, $scope.libraries[i].lng) <= 1) {
			  		marker.icon = redIcon;
					}

			  	$scope.markers.push(marker);					
				}

			});
		}, function(err) {
			// alert(err);
		});

	};

	$scope.setLibraries = function (libraries) {
		$scope.libraries = libraries;

		angular.forEach($scope.libraries, function(lib) {
			var contacts = lib.hasOwnProperty('contacts') ? lib.contacts : '';
			var email =  (contacts).hasOwnProperty('email') ? lib.contacts.email : '';
			var address = lib.address + '<br>'+lib.city+', New York ' + lib.zipcode + '<br>' + email;
    	$scope.markers.push({
    		lat: +lib.lat,
    		lng: +lib.lng,
    		id: lib.name,
    		message: lib.name + '<p>' + address + '</p>'
    	});
    });

    $scope.geolocator();
	};

	angular.extend($scope, {
		center: {
			lat: 40.7619,
			lng: -73.9691,
			zoom: 12
		},
		defaults: {
			scrollWheelZoom: false
		}
	});

	$scope.gotoLibrary = function (library) {
		$scope.removeMarkers();
		$scope.markers.push($scope.userLocationObj);

		angular.forEach($scope.libraries, function(lib) {
			var contacts = lib.hasOwnProperty('contacts') ? lib.contacts : '';
			var email =  (contacts).hasOwnProperty('email') ? lib.contacts.email : '';
			var address = lib.address + '<br>'+lib.city+', New York ' + lib.zipcode + '<br>' + email;
    	$scope.markers.push({
    		lat: +lib.lat,
    		lng: +lib.lng,
    		id: lib.name,
    		message: lib.name + '<p>' + address + '</p>'
    	});
    });

		for (var i in $scope.markers) {
			var id = $scope.markers[i].id;

			if (library.name == id) {
				($scope.markers[i])['focus'] = true;
				($scope.markers[i])['icon'] = redIcon;
			}
		}

		angular.extend($scope, {
			center: {
				lat: library.lat,
				lng: library.lng,
				zoom: 14
			}
		});

	};

};

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
