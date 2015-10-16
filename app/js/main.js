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
		document.getElementById("fileformlabel").value = str.slice(i);
	}

}

// Поле с файлом через jQuery
// $(document).ready(function() {
// 	$( "#project_picture" ).change(function() {
// 		var $this = $(this),
// 			val = $this.val();
// 		$('#fileformlabel').text(val);
// 	});
// });