import React, { Component, useEffect, useState } from 'react'
import './UploadImage';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { Navbar, NavbarBrand, NavLink, Nav } from 'reactstrap';
import './FetchImages';
import Cookies, { set } from 'js-cookie';
import axios from "axios";
import { Upload } from 'antd';
import './Gallery.css';
import {AiFillStar, AiOutlineStar, AiFillDelete } from 'react-icons/ai'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    HeartTwoTone,
  } from "@ant-design/icons";

toast.configure()
export default function Gallery() {
    const [sample, setSample] = useState(1);
    const [listItems,setList] = useState([]);
    const [favItems,setFav] = useState([]);
    const [s,sets] = useState(0);

    const [c1, setc1] = useState("grey");
    const [c2, setc2] = useState("red");

    const [fav, setFav1] = useState(1);

    // const loggedin = Cookies.get('loggedin');
    const history = useHistory();
    const getImgs = async () => {
        const fd = new FormData();
        fd.append("email", Cookies.get('email'));
        const allImages = await axios({
            url: "http://localhost:8080/fetch_images.php",
            method: "POST",
            header: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            data: fd,
        });
        console.log("length" + allImages.data.length);
        console.log("$"+allImages.data);

        const fdd = new FormData();
        fdd.append("email", Cookies.get('email'));
        const allfavImages = await axios({
            url: "http://localhost:8080/fetch_fav_images.php",
            method: "post",
            header: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            data: fdd
        });
        setList(allImages.data.map((i) => (i)));
        setFav(allfavImages.data.map((i) => (i)));
    }

    if (sample === 1) {
        getImgs();
        setSample(10);
    }
    const deleteimg = (params) => {
        console.log(params);
        const fd = new FormData();
        fd.append("email", Cookies.get('email'));
        fd.append("imageurl", params);
        axios({
            url: "http://localhost:8080/delete_image.php",
            method: "POST",
            header: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            data: fd,
        }).then((result) => {
            history.push({
                pathname : './Fetchimages',
            });
            history.push({
                pathname : './Gallery',
            });
            toast("Deleted Image Successfully");
        })
    }

    const updatefav = (params) => {
        console.log(params);
        const fd = new FormData();
        fd.append("email", Cookies.get('email'));
        fd.append("imageurl", listItems[params]);
        console.log(listItems[params]);
        axios({
            url: "http://localhost:8080/fav_image.php",
            method: "POST",
            header: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            data: fd,
        }).then((result) => {
            if(favItems[params] === "0"){
                history.push({
                    pathname : './Fetchimages',
                });
                toast("Added to Favourite!");
            }else{
                history.push({
                    pathname : './Fetchimages',
                });
                history.push({
                    pathname : './Gallery',
                });
                toast("Removed from Favourite!");
            }
        })
    }

    return (
        <div className="set">
            {  Cookies.get('loggedin') == 'true' ?
                listItems.map((image, index) =>
                <div className="imgpic" >
                    <img className="eachimg" src={image} width={300} height={300}/>
                    <div style={{display: 'flex', justifyContent:'space-evenly' , width:"100%"}}>
                        <AiFillDelete className="eachicon" onClick={() => deleteimg(image)} size={30}/>
                        {/* <HeartTwoTone height="100em" size={30} onClick={() => updatefav(index)} twoToneColor={c1}/>     */}
                        {
                            favItems[index] === "1" &&
                            <AiFillStar className="eachicon" onClick={()=>{ updatefav(index)}} size={30} />
                        }
                        {
                            favItems[index] === "0" &&
                            <AiOutlineStar className="eachicon" onClick={()=>{ updatefav(index)}} size={30} />
                        }
                    </div>
                </div>
                ):
                <div className="auth-wrapper">
                    <div className="auth-inner">
                     <h2 style={{color: "rgb(29, 157, 173)"}}> <span><Link to={"/Login"} > Login </Link></span> to view gallery </h2>
                     </div>
                </div>
            }        
        </div>
    );
}

