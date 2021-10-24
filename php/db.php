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

// function getTotal(){
//     try {
//         $connection = new mysqli("localhost","root","","barizza");
//         $sql = "SELECT SUM(`price`) FROM `cart`";
//         if($connection->query($sql)->num_rows > 0) {
//             $result = $connection->query($sql);
//             $totalArray = array();
//             while($row =mysqli_fetch_assoc($result))
//             {$totalarray[] = $row;}
//             echo json_encode($totalarray);
//         }
//     } catch(Exception $e){
//         echo $e;
//     }
// }

function update(){
    try{
        $connection = new mysqli("localhost","root","","barizza");
        $sql = "SELECT * FROM `cart` WHERE `name`='".$_POST['name']."'";
        
        if($connection->query($sql)->num_rows > 0) {
            switch($_POST['update']){
                case 'increase': {
                  $sql = "UPDATE `cart` SET `quantity`= `quantity` + 1,`price`= `price` + ".$_POST['price']." WHERE `name`='".$_POST['name']."'";
                  $connection->query($sql);
                  break;  
                }
                case 'decrease':{
                    $sql = "UPDATE `cart` SET `quantity`= `quantity` - 1,`price`= `price` - ".$_POST['price']." WHERE `name`='".$_POST['name']."'";
                    $connection->query($sql);
                }
            }
        } 
    } catch (Exception $e) {
        echo "Exception: ".$e;
    }
}

function remove(){
        try{
        $connection = new mysqli("localhost","root","","barizza");
        $sql = "DELETE FROM `cart` WHERE `name`='".$_POST['name']."'";
        $connection->query($sql);
    } catch (Exception $e) {
        echo "Exception: ".$e;
    }
}

function storeOrder(){
    try{
        $connection = new mysqli("localhost","root","","barizza");
        $sql = "INSERT INTO `orders` (`total`,`pizzas`,`cname`,`contact`,`address`) VALUES (".$_POST['total'].",'".$_POST['pizzas']."','".$_POST['cname']."',".$_POST['contact'].",'".$_POST['address']."')";
        if($connection->query($sql)) echo "true";
        else echo "false";
    } catch (Exception $e) {
        echo "Exception: ".$e;
    }
}

function clearCart(){
        try{
        $connection = new mysqli("localhost","root","","barizza");
        $sql = "DELETE FROM `cart`";
        if($connection->query($sql)) echo "true";
        else echo "false";
    } catch (Exception $e) {
        echo "Exception: ".$e;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    switch($_POST['action']){
        case 'store': storeData(); break;
        case 'json': echo file_get_contents("../JSON/pizzas.json"); break;
        case 'cartjson': getCartData(); break;
        // case 'getTotal': getTotal(); break;
        case 'update': update(); break;
        case 'delete': remove(); break;
        case 'order': storeOrder(); break;
        case 'clearcart': clearCart(); break;
    }

}
?>