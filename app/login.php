<?php 

	$login = $_POST['myLogin'];
	$pas = $_POST['myPassword'];
	
	if ($login === 'junyk' and $pas === '12345') {
		$data['status'] = 1;
	}else {
		$data['status'] = 0;
	}


	header("Content-Type: application/json");
	echo json_encode($data);
	exit;
 ?>