function LibraryListController($scope, $http) {
	$scope.libraries = [];
	$scope.newLibrary = {}
	$scope.markers = new Array();

	$scope.setLibraries = function (libraries) {
		$scope.libraries = libraries;

		angular.forEach($scope.libraries, function(lib) {
    	$scope.markers.push({
    		lat: +lib.lat,
    		lng: +lib.lng,
    		message: lib.name
    	});
    });
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
			var id = $scope.markers[i].message;

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

