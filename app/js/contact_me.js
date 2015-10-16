var contactMe = (function() {

	var init = function() {
		_setUpListners();
	};

	var _setUpListners = function() {
		$('#contactMe').on('submit', _submitForm);
	};

	var _submitForm = function(e) {
		e.preventDefault();

		var form = $(this),
			url = 'contactMe.php',
			defObj = _ajaxForm(form, url);
	};

	var _ajaxForm = function (form, url) {
		if (!validate.validateForm(form)) return false;

	}

	return {
		init: init
	};
})();

contactMe.init();