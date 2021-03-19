<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    $conn = mysqli_connect("172.17.0.2","root","password","gallery");

    if($_SERVER["REQUEST_METHOD"]=="POST") {
        $response = array();
        $email = $_POST["email"];
        $fetchsql = "select imageurl from Images where email = '$email' and fav = 1";
        $result = $conn->query($fetchsql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            array_push($response,$row["imageurl"]);
            //echo($row["imageurl"]);
        }
        echo json_encode($response);
    }        
?>