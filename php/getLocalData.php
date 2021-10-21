<?php 
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if($_POST['action'] == 'json') echo file_get_contents("../JSON/".$_POST['file']);
    else echo "no";
}
?>