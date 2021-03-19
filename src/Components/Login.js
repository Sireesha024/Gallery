import React, { useState } from "react";
import "./Login.css";
import {BrowserRouter as Router, Switch,Route, Redirect, Link, useHistory} from 'react-router-dom';
import axios from "axios";
import './UploadImage.jsx';
import 'bootstrap/dist/css/bootstrap.css';
// import {Button} from "@material-ui/core" ;
import './Register.jsx';
import Cookies from "js-cookie";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Gallery';


toast.configure()
function Login(){

  const initialState = {
    email : "",
    password: "",
  };
  const history = useHistory();
  const [user,setUser] = useState(initialState);

  const onChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({...user, [name]: value});
    console.log(value);
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();

    console.log("enterd");
    var fd = new FormData();
    fd.append("email", user.email);
    fd.append("password",user.password);
    console.log();
    const response = await axios ({
      url:"http://localhost:8080/user_login.php",
      method : "post",
      data : fd,
    });
    console.log(response.data);
    //console.log(response.data.message);
    if(response.data.message === "Success"){
      console.log("success");
      Cookies.set('loggedin',true);
      Cookies.set('email',user.email);
      history.push({
        pathname : './Gallery',
      });
    }
    else{
      toast('check your credentials',
       {position: toast.POSITION.TOP_RIGHT,
        autoClose : 3000
      });
      console.log('no alert');
      setUser(initialState);
      console.log();
    }

  }

  return(
    <div>
      
      <h3>Login</h3>
      <form className="login-form" onSubmit={onFormSubmit}>
        <div className="form-group">
            <label htmlFor="email">
                Email
            </label>
            <input type="email" className="form-control" requried
                name="email" value={user.email} onChange={onChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">
                Password
            </label>
            <input type="password" className="form-control" required
                name="password" value={user.password} onChange={onChange}
            />
        </div>
        <div>
            <button class="btn-lg btn-dark btn-block">Sign In</button>
        </div>
        <hr />
    </form>
    <div>
        don't have an account 
        <Link to="/Register"> Sign Up</Link>
        </div>
    </div>
  );
}
export default Login;