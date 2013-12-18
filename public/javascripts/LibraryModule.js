var app = angular.module('LibraryModule', ['leaflet-directive']);
app.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});