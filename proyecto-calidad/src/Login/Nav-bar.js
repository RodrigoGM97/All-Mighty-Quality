import React from 'react';
import {Navbar, Button} from 'react-bootstrap';
import Logo from '../Images/LogoTec.png';


 class NavBar extends React.Component {

    render() {

        return (
            <div>
                <Navbar bg="light" expand="lg">
                <img src={Logo} width="50" height="50" />
                <Navbar.Brand href="#home">International Exchange Portal</Navbar.Brand>
                    
                </Navbar>
             </div>
        )
    }

 }

 export default NavBar;