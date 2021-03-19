<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    //require('./connection.php');
    $conn = mysqli_connect("172.17.0.2","root","password","gallery");
    // echo("hello");
    if($_SERVER["REQUEST_METHOD"]=="POST") {
        // echo("hi");
        $email = $_POST["email"];
        // echo($email);
        $sql = "select imageurl,fav from Images where email = '$email'";
        $response=array();
        //$favarr = array();
        $result = $conn->query($sql) or die($conn->error);
        //echo json_encode($result->fetch_assoc());
        while($row = $result->fetch_assoc()) {
            array_push($response,$row["imageurl"]);
            //array_push($response,$row["fav"]);
          //   array_push($favarr,$row["fav"]);
            // $response["fav"]=$row["fav"];
        }
        echo json_encode($response);
        //echo json_encode($favarr);
    }        
?>