<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    $conn = mysqli_connect("172.17.0.2","root","password","gallery");

    if($_SERVER["REQUEST_METHOD"]=="POST") {
        $response = array();
        $email = $_POST['email'];
        $url = $_POST['imageurl']; 
        $sql1 = "select fav from Images where  email='$email' and imageurl='$url'";
        $f = 0;
        if($conn->query($sql1)) {
            $check = mysqli_fetch_array(mysqli_query($conn,$sql1));
            if($check["fav"] == 0){
                $f = 1;
            }
        }
        $sql = "update Images set fav='$f' where email='$email' and imageurl='$url'";
        if($conn->query($sql)) {
            $response["message"] = "Success";
            $response["fav"] = $f;
        }else{
            $response["message"] = $conn->error;
        }
        echo json_encode($response);
    }        
?>