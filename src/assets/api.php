<?php
$con = mysqli_connect("localhost:3306", "dodle", "SamsungSmartFridge", "dodle");
$response = array();

$id = htmlspecialchars($_GET["id"]);

if($id != NULL){
	if($con){
		$sql = "SELECT * FROM Questions where fk_RouteId = " . $id;
		$result = mysqli_query($con, $sql);
		if($result)
		{
			header("Access-Control-Allow-Origin: *");
			$i=0;
			while($row = mysqli_fetch_assoc($result)){
				$response[$i]['lat'] = $row['lat'];
				$response[$i]['lon'] = $row['lon'];
				$response[$i]['order'] = $row['order'];
				$response[$i]['question'] = $row['question'];
				$response[$i]['ans'] = $row['ans'];
				$response[$i]['locationName'] = $row['locationName'];
				$response[$i]['fillers'] = [$row['q1'],$row['q2'],$row['q3']];
				$i++;
			}
			echo json_encode($response);
		}
	}
	else{
		echo "Database connetion failed";
	}
}else{
	if($con){
		$sql = "SELECT * FROM Routes";
		$result = mysqli_query($con, $sql);
		if($result)
		{
			header("Access-Control-Allow-Origin: *");
			$i=0;
			while($row = mysqli_fetch_assoc($result)){
				$response[$i]['id'] = $row['_id'];
				$response[$i]['name'] = $row['name'];
				$response[$i]['desc'] = $row['desc'];
				$response[$i]['image'] = $row['image'];
				$response[$i]['distance'] = $row['distance'];
				$i++;
			}
			echo json_encode($response);
		}
	}
	else{
		echo "Database connetion failed";
	}
}

?>
