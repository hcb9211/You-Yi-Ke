<?php
	$mysqli=new mysqli("localhost","root","","hcb");
	$sel="select * from liuyan order by id";
	$result=$mysqli->query($sel);
	$result=$result->fetch_all("MYSQLI_ASSOC");//转换为数组
	echo json_encode($result);//查询
?>