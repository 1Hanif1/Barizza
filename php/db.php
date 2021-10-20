<?php
// if($connection->connect_error) echo "Connection Failed".$connection->connect_error;
// else echo"Connection Succesfull";

function storeData(){
    try{
        $connection = new mysqli("localhost","root","","barizza");
        $sql = "SELECT * FROM `cart` WHERE `name`='".$_POST['name']."'";
        if($connection->query($sql)->num_rows > 0) {
            $sql = "UPDATE `cart` SET `quantity`= `quantity` + 1,`price`= `price` + ".$_POST['price']." WHERE `name`='".$_POST['name']."'";
            $connection->query($sql);
        } else {
            $sql = "INSERT INTO `cart`(`name`, `quantity`, `price`) VALUES ('".$_POST['name']."',1,'".$_POST['price']."')";
            $connection->query($sql);
        }
    } catch (Exception $e) {
        echo "Exception: ".$e;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if($_POST['action'] == 'store') storeData();   
}
?>