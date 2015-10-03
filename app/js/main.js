$(document).ready(function() {
	console.log('я на главной странице');
});

function getName (str){
    if (str.lastIndexOf('\\')){
        var i = str.lastIndexOf('\\')+1;
    }
    else{
        var i = str.lastIndexOf('/')+1;
    }						
    var filename = str.slice(i);			
    var uploaded = document.getElementById("fileformlabel");
    uploaded.innerHTML = filename;
}

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