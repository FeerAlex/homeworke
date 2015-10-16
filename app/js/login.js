var loginMe = (function() {

	var init = function() {
		_setUpListners();
	};

	var _setUpListners = function() {
		$('#loginMe').on('submit', _loginMeNow); // Добавить проект
	};

	var _loginMeNow = function(e) {
		e.preventDefault();

		var form = $(this),
			url = '../login.php',
			myServerGiveMeAnAnswer = _ajaxForm(form, url);

		if(myServerGiveMeAnAnswer) {
			// Запрос на сервер
			myServerGiveMeAnAnswer.done(function(ans) {
				if(ans.status == 1) {
					
				}else {
					
				}
			});
		}
	}

	var _ajaxForm = function (form, url) {
 
		if (!validate.validateForm(form)) return false;

		data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		});

		return result;

	};

	return {
		init: init
	};
})();

loginMe.init();