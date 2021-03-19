<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    $conn = mysqli_connect("172.17.0.2","root","password","gallery");

    if($_SERVER["REQUEST_METHOD"]=="POST") {

        $email = $_POST['email'];
        $url = $_POST['imageurl']; 
        $sql = "insert into Images (email,imageurl) values ('$email','$url')";
        
        $response = array();
        
        if($conn->query($sql)) {
            $response["message"] = "Success";
            $response["email"] = $email;
            $response["url"] = $url;

        }else{
            $response["message"] = $conn->error;
        }
        echo json_encode($response);
    }        
?>