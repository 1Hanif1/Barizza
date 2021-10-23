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

function getCartData(){
    try{
        $connection = new mysqli("localhost","root","","barizza");
        $sql = "SELECT * FROM `cart`";
        if($connection->query($sql)->num_rows > 0) {
            $result = $connection->query($sql);
            $cartArray = array();
            while($row =mysqli_fetch_assoc($result))
            {$cartArray[] = $row;}
            echo json_encode($cartArray);
        }
    } catch(Exception $e) {echo "Exception".$e;}
}

function getTotal(){
    try {
        $connection = new mysqli("localhost","root","","barizza");
        $sql = "SELECT SUM(`price`) FROM `cart`";
        if($connection->query($sql)->num_rows > 0) {
            $result = $connection->query($sql);
            $totalArray = array();
            while($row =mysqli_fetch_assoc($result))
            {$totalarray[] = $row;}
            echo json_encode($totalarray);
        }
    } catch(Exception $e){
        echo $e;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if($_POST['action'] == 'store') storeData();   
    if($_POST['action'] == 'json') echo file_get_contents("../JSON/pizzas.json");
    if($_POST['action'] == 'cartjson') getCartData();
    if($_POST['action'] == 'getTotal') getTotal();
}
?>