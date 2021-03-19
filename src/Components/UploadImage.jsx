import React, {useState} from 'react';
import axios from 'axios';
import {Navbar, NavbarBrand} from 'reactstrap';
import './UploadImage.css'
import {BrowserRouter as Route, useHistory,Link} from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


function UploadImage() {

    const history = useHistory();

    function uploadimg(){
        const url = document.getElementById("imgurl").value;
        const fd = new FormData();
        fd.append("email",Cookies.get('email'));
        fd.append("imageurl",url);
        axios ({
            url : "http://localhost:8080/upload_image.php",
            method : "post",
            data: fd,
        }).then((result) => {
            if(result.data.message === "Success"){
                console.log("Success");
                toast('image uploaded');
                history.push('Gallery')
            }
        }).catch((e) => {
            console.log("error"+ e);
            toast('image is not uploaded');
        })
    }
    return (
        Cookies.get("loggedin") === 'true' ?
        <div className="imageupload">
            <div className="up-form">
                <label>Upload url</label>
                <br/>
                <input type="text" id="imgurl"></input><br/><br/> 
                <button type="button" onClick={uploadimg} class="btn btn-outline-info">Upload</button>
            </div>
        </div>: 
                        <div className="auth-wrapper">
                        <div className="auth-inner">
                        <h2 style={{color: "rgb(29, 157, 173)"}}> Wanna Upload Image?<br/><span><Link to={"/Login"}> Login </Link></span> </h2>
                        </div>
                    </div>
    )
}

export default UploadImage;