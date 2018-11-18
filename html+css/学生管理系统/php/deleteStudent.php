<?php
  //echo json_encode($_POST);//ajax post提交时候的调试手段
  $ids = $_POST['x'];
  $tmp = implode(" OR `id` = ", $ids);
  $mysqli = new mysqli('localhost','root','','test');
  $sql = "DELETE FROM `student` WHERE `id`=".$tmp ;
  $mysqli->query($sql);
?>
