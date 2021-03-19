<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    $conn = mysqli_connect("172.17.0.2","root","password","gallery");

    if($_SERVER["REQUEST_METHOD"]=="POST") {
        $response = array();
        $email = $_POST["email"];
        $fetchsql = "select fav from Images where email = '$email'";
        $result = $conn->query($fetchsql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            array_push($response,$row["fav"]);
            //echo($row["imageurl"]);
        }
        echo json_encode($response);
    }        
?>