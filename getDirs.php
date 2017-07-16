<?php
header ('Content-type: text/html; charset=UTF-8');
$dir = "notas/";
$arrFiles = array();

if (file_exists($dir)){
    if ($handle = opendir($dir)) {
        while (false !== ($file = readdir($handle))) {
            if ($file != "." && $file != "..") {
                $nameFile = explode(".",$file);
                $file = utf8_encode($file);
                if((count($nameFile) > 1) && ($nameFile[1] == "csv" )){
                    array_push($arrFiles,  str_replace("../", "", $dir)."/".$file);
                }
            }
        }

        closedir($handle);
    }
}

$str = '[';

for($i = 0; $i < count($arrFiles); $i++){
    $str.= '"'.$arrFiles[$i].'"';

    if($i < count($arrFiles)-1)
        $str.=",";
}

$str .= ']';

echo $str;

?>