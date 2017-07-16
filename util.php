<?php
function removerCaracter($string){
@$string = ereg_replace("[áàâãª]","a",$string);
@$string = ereg_replace("[ÁÀÂÃ]","A",$string);
@$string = ereg_replace("[éèê]","e",$string);
@$string = ereg_replace("[ÉÈÊ]","E",$string);
@$string = ereg_replace("[íì]","i",$string);
@$string = ereg_replace("[ÍÌ]","I",$string);
@$string = ereg_replace("[óòôõº]","o",$string);
@$string = ereg_replace("[ÓÒÔÕ]","O",$string);
@$string = ereg_replace("[úùû]","u",$string);
@$string = ereg_replace("[ÚÙÛ]","U",$string);
@$string = ereg_replace("ç","c",$string);
@$string = ereg_replace("Ç","C",$string);
@$string = ereg_replace("[][><}{)(:;,!?*%~^`&#@]","",$string);
@$string = ereg_replace(" ","_",$string);
return $string;
}

?>