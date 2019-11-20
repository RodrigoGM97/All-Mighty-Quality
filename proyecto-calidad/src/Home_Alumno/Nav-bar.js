import React from 'react';
import {Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Images/LogoTec.png';

 class NavBar extends React.Component {
    render() {

        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <img src={Logo} width="50" height="50" alt="notFound"/>
                    <Navbar.Brand style = {{marginLeft: '15px'}}>International Exchange Portal</Navbar.Brand>
                    <Link className="btn btn-outline-success" variant="outline-success" style = {{marginLeft: 'auto'}} to="/">Sign out</Link>
                </Navbar>
             </div>
        )
    }

 }

 export default NavBar;