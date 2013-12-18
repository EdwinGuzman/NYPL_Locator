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

	// jQuery.getJSON('http://afternoon-citadel-1782.herokuapp.com', {
	// 	format: 'json'
	// })
	// 	.done(function(data) {
	// 		console.log(data);
	// 	});

	// $http.get('http://afternoon-citadel-1782.herokuapp.com').then(function(response) {
	// });
};

