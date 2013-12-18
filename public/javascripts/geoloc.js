if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(posSuccess, posError, { enableHighAccuracy: true });
} else {
	console.log('out of date browser');
}

function posSuccess(pos) {
	console.log('success ' + pos);
}

function posError(error) {
	console.log('error ' + error);
}