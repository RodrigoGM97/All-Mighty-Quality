import React from 'react';
import {Navbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';


 class NavBar extends React.Component {

    render() {

        return (
            <div>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">RPMA</Navbar.Brand>
                    <Link className="btn btn-outline-success" variant="outline-success" style = {{marginLeft: 'auto'}} to="/Profile">Profile</Link>
                    <Link className="btn btn-outline-success" variant="outline-success" style = {{marginLeft: '5px'}} to="/">Sign out</Link>
                </Navbar>
             </div>
        )
    }

 }

 export default NavBar;