<?php
	$val=$_GET["data"];
	// echo $val;
	//引用到服务器
	$mysqli=new mysqli("localhost","root","","hcb");
	$sql="insert into `liuyan`(`message`) values('{$val}')";
	$mysqli->query($sql);
?>