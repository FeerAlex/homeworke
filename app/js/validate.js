var validate = (function() {

	var init = function() {
		_setUpListners();
	};

	var _setUpListners = function() {
		// прослушка событий...
		$('form').on('keydown', '.error-mes', _removeError);
		$('form').on('reset', _clearForm);
	};

	var _removeError = function() {
		$(this).removeClass('error-mes');
	};

	var _clearForm = function(form) {
		var form = $(this);
		form.find('.ipt, .txra').trigger('hideTooltip');
		form.find('.error-mes').removeClass('error-mes');
	};

	// создаёт тултипы
	var _createQtip = function(element, position) {
		// позиция тултипа
		if (position === 'right') {
			position = {
				my: 'left center',
				at: 'right center'
			}
		}else {
			position = {
				my: 'right center',
				at: 'left center',
				adjust: {
					method: 'shift none'
				}
			}
		}

		// инициализация тултипа
		element.qtip({
			content: {
				text: function() {
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'keydown hideTooltip'
			},
			position: position,
			style: {
				classes: 'qtip-mystyle qtip-rounded',
				tip: {
					height: 10,
					width: 16
				}
			}
		}).trigger('show');
	}

	var validateForm = function (form) {

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
			valid = true;

		// Пройдёмся по всем элементам формы
		$.each(elements, function (index, val) {
			var element = $(val),
				val = element.val(),
				pos = element.attr('qtip-position');
			if(val.length === 0) {
				element.addClass('error-mes');
				_createQtip(element, pos);
				valid = false;
			}
		});

		return valid;
	};

	return {
		init: init,
		validateForm: validateForm
	};
})();

validate.init();