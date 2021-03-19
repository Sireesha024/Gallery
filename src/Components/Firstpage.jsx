import React from 'react';
import {BrowserRouter as Router, Switch,Route, Link} from 'react-router-dom';
import { Navbar, NavbarBrand,NavMenu, NavLink, Nav } from 'reactstrap';
import Login from './Login';
import Register from './Register';
import './Firstpage.css';
import UploadImage from './UploadImage';
import FetchImages from './FetchImages';
import gallery from './Gallery';
import Cookies from "js-cookie";


function Firstpage(){
    const c = Cookies.get('loggedin') === true
    return(
        <Router>    
            {
                // <Navbar dark color="dark .bg-light">
                //     <Nav><Link to={'/Gallery'} className='d-inline p-2 bg-dark text-white'>Gallery</Link></Nav>
                //     <Nav><Link to={'/UploadImage'} className='d-inline p-2 bg-dark text-white'>Upload Image</Link></Nav>
                //     <Nav><Link to={'/FetchImages'} className='d-inline p-2 bg-dark text-white'>Fav Images</Link></Nav>
                //     <Nav><Link to={'/Login'} className='d-inline p-2 bg-dark text-white' 
                //     onClick={() => { Cookies.set('loggedin', false) }}> Logout </Link></Nav>
                // </Navbar>
                <div className="App">
                    <Navbar dark color="dark .bg-light">
                    {/* <nav className="navbar navbar-expand navbar-dark fixed-top"> */}
                       
                            <Nav><Link to={'/Gallery'} className='d-inline p-2 bg-dark text-white'>Gallery</Link></Nav>
                            
                                <Nav ><Link to={'/UploadImage'} className='d-inline p-2 bg-dark text-white' pl>Upload Image</Link></Nav>
                                <Nav><Link to={'/FetchImages'} className='d-inline p-2 bg-dark text-white'>Fav Images</Link></Nav>
                                <Nav><Link to={'/Login'} className='d-inline p-2 bg-dark text-white' 
                                onClick={() => { Cookies.set('loggedin', false) }}> Logout </Link></Nav>
                        
                        
                        </Navbar>
                </div>
            } 
            <Switch>
                <Route exact path='/' component={Register} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/Register' component={Register} />
                <Route exact path='/Gallery' component={gallery} />
                <Route exact path='/UploadImage' component={UploadImage} />
                <Route exact path='/FetchImages' component={FetchImages} />
            </Switch>
        </Router>
    );
}

export default Firstpage;