<?php
header("Content-type: text/html; charset=utf-8");
$dataFromSave = $_POST["data"];
$serieTurma = $_POST["nameFile"];


$nomealuno = $dataFromSave["student"];
//$strFile =  $dataFromSave["notes"];
$strFile  = "";

foreach( $dataFromSave["notes"] as $key => $value){
  $strFile .= $value["discipline"]." ".$value["note_1"]." ".$value["note_2"]." ".$value["note_3"];
  $strFile .= "\r\n";


if(!is_dir("boletim"))
	mkdir("boletim");
if( !is_dir("boletim/".($serieTurma)) )
    mkdir("boletim/".($serieTurma));



$file = "boletim/".($serieTurma)."/".($nomealuno).".txt";
$myfile = fopen($file, "w");
//$file="\xEF\xBB\xBF".$file;
fwrite($myfile, $strFile);
fclose($myfile);
echo ($nomealuno)." - [OK]";
?>