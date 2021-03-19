import React,{useState} from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { Redirect ,useHistory, Link} from 'react-router-dom';
import {CardTitle,CardText,CardBody,CardImg,Card} from 'reactstrap';
import {Navbar, NavbarBrand, NavLink,Nav} from 'reactstrap';
import './Gallery.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillStar, AiOutlineStar, AiFillDelete } from 'react-icons/ai'


export default function FetchImages() {
    const [sample, setSample] = useState(1);
    const [listItems,setList] = useState([]);
    const [favItems,setFav] = useState([]);

    const history = useHistory();
    // const loggedin = Cookies.get('loggedin');
    const getImgs = async () => {
        const fd = new FormData();
        fd.append("email", Cookies.get('email'));
        const allfavImages = await axios({
            url: "http://localhost:8080/fetch_fav_url.php",
            method: "post",
            header: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            data: fd,
        });
        //console.log("length" + allfavImages.data.length);
        console.log(allfavImages.data);
        setList(allfavImages.data.map((i) => (i)));


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
                pathname : './Gallery',
            });
            history.push({
                pathname : './FetchImages',
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
                    {
                        
                        <AiFillStar className="eachicon" onClick={()=>{ updatefav(index)}} size={30} />
                    }
                    
                </div>
            </div>
            ):
            <div className="auth-wrapper">
                <div className="auth-inner">
                 <h2 style={{color: "rgb(29, 157, 173)"}}> <span><Link to={"/Login"} > Login </Link></span> to view Fav Images </h2>
                 </div>
            </div>
        }        
    </div>
    );
}
