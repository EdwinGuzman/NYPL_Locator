
/*
 * GET home page.
 */

exports.index = function (Library) {
	return function (req, res) {
		Library.find({}, function (error, libraries) {
			res.render('index', {
				title: 'Express',
				libraries: libraries
			});
		});
  };
};

exports.get = function(Library) {
	return function (req, res) {
		Library.find({}, function (error, libraries) {
			res.json({ libraries: libraries });
		});
	};
};