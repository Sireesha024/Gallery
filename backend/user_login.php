<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header("Content-type: application/json; charset=utf-8");
    header("'Accept': 'application/json'");
    $conn = mysqli_connect("172.17.0.2","root","password","gallery");

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        //echo 'request recieved';

        $email = $_POST['email'];
        $password = $_POST['password'];
        $sql = "select * from users where email='$email' and password='$password';";
        $res = $conn->query($sql);
        $res = $res->fetch_assoc();

        $response = array();

        if(!(is_null($res) || $res == false)) {
            $response["message"] = "Success";
            $response["email"] = $email;
            $response["password"] = $password;
        }
        else {
            $sqla = "select * from users where email='$email';";
            $resa = $conn->query($sqla);
            $resa = $resa->fetch_assoc();
            if(!(is_null($resa) || $resa == false)) {
                $response["message"] = "Password didn't match. Please try again!";
            }
            else {
                $response["message"] = "User did not exist! Please sign up";
            }
            $response["email"] = $email;
            $response["password"] = $password;
        }
        echo json_encode($response);
    }

?>