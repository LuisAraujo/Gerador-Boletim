<?php
class Students
{
	public $nome;
	public $notes;
	
	function __construct($n, $n2) {
        $this->nome = $n;
        $notes = $n2;
		 
   }
}


$studentes = array();
$s = new Students("AA", "AA");

echo $s->nome;

?>