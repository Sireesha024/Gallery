<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    $conn = mysqli_connect("172.17.0.2","root","password","gallery");

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        
        $email = $_POST['email'];
        $password = $_POST['password'];

        $user_check = "select * from users where email='$email' LIMIT 1 ;";
        
        // $res = $res->fetch_assoc();

        $result = mysqli_query($conn, $user_check);
        $user = mysqli_fetch_assoc($result);
        $response = array();
        
        if($user){
            if($user['email'] === $email){
                $response["message"] = "User taken";
            }
            else{
                $query = "insert into users values('$email','$password')";
                $response["message"] = "Success";
                $response["email"] = $email;
                $response["password"] = $password;
            }
        }
        else{            
            $response["message"] = $conn->error;
            $response["email"] = $email;
            $response["password"] = $password;
        }

        echo json_encode($response);

    }


?>