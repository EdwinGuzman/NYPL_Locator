function LibraryListController($scope, $http, $window) {
	$scope.libraries = [];
	$scope.newLibrary = {}
	$scope.markers = new Array();
	$scope.supportsGeo = $window.navigator;

	$scope.geolocator = function() {
		window.navigator.geolocation.getCurrentPosition(function(pos) {
			$scope.$apply(function() {
				$scope.pos = pos;
				console.log($scope.pos);
				$scope.markers.push({
		  		lat: pos.coords.latitude,
		  		lng: pos.coords.longitude,
		  		message: '<p>Your location</p>'
		  	});
			});
		}, function(err) {
			alert(err);
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

		for (var i in $scope.markers) {
			var id = $scope.markers[i].id;

			if (library.name == id) {
				($scope.markers[i])['focus'] = true;
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

