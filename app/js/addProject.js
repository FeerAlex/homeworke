var myModule = (function() {

	// Инициализирует наш модуль
	var init = function() {
		_setUpListners();
	};

	// Прослушивает события
	var _setUpListners = function() {
		// прослушка событий...
		$('#my-button').on('click', _showModal); // открыть модальное окно
		$('#form_add_project').on('submit', _addProject); // Добавить проект

		// // // // // // //
		$('#project_picture').on('change', _removeErrorLabel);
		// // // // // // //
	};
	
	// // // // // // //
	var _removeErrorLabel = function() {
		$('#fileformlabel').keydown();
	};
	// // // // // // //

	// Работает с модальным окном
	var _showModal = function (e) {
		e.preventDefault();
		var divPopup = $('#addproject-block'),
			form = divPopup.find('.addproject-form');

		divPopup.bPopup({
			transition: 'slideDown',
            speed: 450,
            modalColor: '#818e9b',
            opacity: 0.8,
            onClose: function() {
            	form.trigger("reset");
            	form.find('.server-mes').text('').hide();
            }
		});
	};

	// Добавляет проект
	var _addProject = function (e) {
		e.preventDefault();

		// Объявляем переменные
		var form = $(this),
			url = '../add_project.php',
			myServerGiveMeAnAnswer = _ajaxForm(form, url);

		if(myServerGiveMeAnAnswer) {
			// Запрос на сервер
			myServerGiveMeAnAnswer.done(function(ans) {
				var successBox = form.find('.success-mes'),
					errorBox = form.find('.error-mes');
				if(ans.status === 'OK') {
					errorBox.hide();
					successBox.text(ans.text).show();
				}else {
					successBox.hide();
					errorBox.text(ans.text).show();
				}
			});
		}
			
	};

	// Универсальная функция
	// Для её работы используются
	// @form - форма
	// @url -адрес php файла, к которому мы обращаемся
	// 1. собрать данные из формы
	// 2. проверить форму
	// 3. делает запрос на сервер и возвращает ответ с сервера
	var _ajaxForm = function (form, url) {
 
		if (!validate.validateForm(form)) return false;

		data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function(ans) {
			form.find('.error-mes').text('Ошибка! Невозможно добавить прект').show();
		});

		return result;

	};

	// Возвращаем объект(публичные методы)
	return {
		init: init
	};

})();

myModule.init();