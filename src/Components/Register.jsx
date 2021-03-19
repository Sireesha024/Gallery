import React, { useState } from 'react';
import './Register.css'
import axios from 'axios';
import login from './Login.js';
import {BrowserRouter as Router, Switch,Route, Redirect,useHistory, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function Register() {
    const intialstate = {
        email : "",
        password: "",
        
    };
    const history = useHistory();
    const [user, setUser] = useState(intialstate);
    const [confirm,setConfirm] = useState("");

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({...user, [name]: value});
    }

    const onConfirmChange = (e) => {
        setConfirm(e.target.value);
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if(confirm !== user.password){
            toast("Password and confirm password are not same!",
            {position : toast.POSITION.TOP_RIGHT});
            setUser(intialstate);
            return;
        }

        var fd=new FormData();
        fd.append("email", user.email);
        fd.append("password", user.password);
        console.log();
        const response = await axios({
            url:"http://localhost:8080/user_registration.php",
            method:"post",
            data: fd,
        });
        console.log(response.data);
        console.log(response.data.message)
        if(response.data.message === "Success"){
            console.log("redirect");
        //     <Router>
        //     <Switch>
        //         <Route exact path='/Login' component={login} />
        //     </Switch>
        // </Router>
            history.push({
                pathname : './Login',
            });
        }
        else{

            toast("mail already exist try again with new email",
            {position : toast.POSITION.TOP_RIGHT});
            setUser(intialstate);


        }
    }
    return(
        <div>
            <h1>Registration</h1>
            <form className="reg-form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" className="form-control" required
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
                <div className="form-group">
                    <label htmlFor="confirm">
                        Confirm Password
                    </label>
                    <input type="password" className="form-control" required
                        name="cpwd" value={user.confirm} onChange={onConfirmChange}
                    />
                </div>
                <div>
                    {/* <Button variant="contained" color="primary" type="submit" name="signin" >Sign Up</Button> */}
                    <button class="btn-lg btn-dark btn-block">Sign Up</button>

                </div>
                <hr />
            </form>
            <div>
                have an account 
                <Link to="/Login"> Sign In</Link>
            </div>
        </div>
    );
}

export default Register;