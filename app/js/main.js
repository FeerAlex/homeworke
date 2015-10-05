// Поле с файлом через javascript + обрезание лишнего
window.onload = function () {
	document.getElementById("project_picture").onchange = function (e) {
		var str = e.target.value;
		if (str.lastIndexOf('\\')){
			var i = str.lastIndexOf('\\')+1;
		}
		else{
		    var i = str.lastIndexOf('/')+1;
		}	
		document.getElementById("fileformlabel").innerHTML = str.slice(i);
	}

    // document.getElementById('button_submit_succesful').onclick = function(e) {
    //     if ($('#project_name').val() == "") {
    //         e.preventDefault();
    //         alert("Вы не указали имя проекта!");
    //     };

    //     if ($('#project_picture').val() == "") {
    //         e.preventDefault();
    //         alert("Вы не выбрали изображение");
    //     };

    //     if ($('#project_url').val() == "") {
    //         e.preventDefault();
    //         alert("Вы не указали url проекта");
    //     };

    //     if ($('#project_info').val() == "") {
    //         e.preventDefault();
    //         alert("Вы не указали информацию о проекте");
    //     };
    // };

    // Фокус и потеря фокуса 
    // $('#project_name').focus(function(){$(this).addClass('onfocus');}).blur(function(){$(this).removeClass('onfocus')});
    // $('#project_picture').focus(function(){$(this).addClass('onfocus');}).blur(function(){$(this).removeClass('onfocus')});
    // $('#project_url').focus(function(){$(this).addClass('onfocus');}).blur(function(){$(this).removeClass('onfocus')});
    // $('#project_info').focus(function(){$(this).addClass('onfocus');}).blur(function(){$(this).removeClass('onfocus')});

}

// Поле с файлом через jQuery
// $(document).ready(function() {
// 	$( "#project_picture" ).change(function() {
// 		var $this = $(this),
// 			val = $this.val();
// 		$('#fileformlabel').text(val);
// 	});
// });

// Всплывающий попап
;(function($) {
    $(function() {
        $('#my-button').bind('click', function(e) {
            e.preventDefault();
            $('#addproject-block').bPopup({
                transition: 'slideDown',
                speed: 450,
                modalColor: '#818e9b',
                opacity: 0.8
            });
        });
    });
})(jQuery);