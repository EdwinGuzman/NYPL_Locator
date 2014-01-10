
/*
 * GET home page.
 */

exports.index = function () {
	var http = require('http');
	var Library = [];

	http.get('http://afternoon-citadel-1782.herokuapp.com', function(res) {
	  //console.log("statusCode: ", res.statusCode);
	  //console.log("headers: ", res.headers);
	  var data = '';

	  res.on('data', function(d) {
	    data += d.toString();
	  });

	  res.on('end', function() {
		  data = JSON.parse(data);

		  Library = data.branches;
	  });

	}).on('error', function(e) {
	  console.error(e);
	});
	

	return function (req, res) {
		Library.forEach(function(lib) {
			if (lib.hasOwnProperty('long')) {
				lib['lng'] = lib['long'];
				delete lib['long'];
			}
		});

		res.render('index', {
			title: 'NYPL Locator',
			libraries: Library
		});
  };
};

exports.get = function(Library) {
	return function (req, res) {
		//Library.find({}, function (error, libraries) {
			res.json({ libraries: Library });
		//});
	};
};