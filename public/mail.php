<?php

if(!empty($_POST)){


$mess = ''$_POST['nom'].','.$_POST['text-mail'].+<br>+.'from :'. $_POST['mail'];

$mail = mail('tristan3755@gmail.com','Envoi depuis mon portfolio',$mess);

var_dump($mail)

}

header('Location:./index.html');
exit;

?>