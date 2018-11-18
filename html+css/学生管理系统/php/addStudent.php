<?php
  $mysqli = new mysqli('localhost','root','','test');
  $sql = "INSERT INTO `student`(`xuehao`, `name`, `xingbie`, `age`, `zhuangye` , `chengji`) VALUES (20120401,' ',' ',0,' ',0)";
  $mysqli->query($sql);
?>
