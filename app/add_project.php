<?php 

	$name = $_POST['project_name'];
	$data = array();

	
	
	if ($name === '') {
		$data['status'] = 'error';
		$data['text'] = 'Ошибка! Невозможно добавить прект.';
	}else {
		$data['status'] = 'OK';
		$data['text'] = 'Ура! Проект успешно добавлен.';
	}


	header("Content-Type: application/json");
	echo json_encode($data);
	exit;
 ?>