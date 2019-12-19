<?php
$un=$_POST['first_name'];
$em=$_POST['phone_number'];
$su=$_POST['email'];
$msg=$_POST['message'];

$to = "support@templatebundle.net";
$subject = "My subject";
$txt = "Hello admin! query is send by the user and user details are : name : ".$un." phone : ".$em." email : ".$su." message : ".$msg."";
$headers = "From: webmaster@example.com";

echo mail($to,$subject,$txt,$headers);


?>