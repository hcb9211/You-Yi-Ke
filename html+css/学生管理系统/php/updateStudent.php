<?php
  sleep(2);
  $mysqli = new mysqli('localhost','root','','test');
  $sql = "UPDATE `student` SET `{$_POST['shuxing']}`= '{$_POST['value']}' WHERE `id`='{$_POST['id']}' ";
  $mysqli->query($sql);
 ?>
