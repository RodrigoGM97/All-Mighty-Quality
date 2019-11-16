import React from 'react';
import {Navbar, ButtonGroup, Dropdown, DropdownButton, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Images/LogoTec.png';
import axios from 'axios'


 class NavBar extends React.Component {
    handleClick () {
        axios.get('http://localhost:5000/query')
          .then(response => console.log(response))
      }
    render() {

        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <img src={Logo} width="50" height="50" />
                    <Navbar.Brand href="#home" style = {{marginLeft: '15px'}}>International Exchange Portal</Navbar.Brand>
                    <DropdownButton as={ButtonGroup} title="Groups" id="bg-vertical-dropdown-1" style = {{marginLeft: '15px'}}>
                        <Dropdown.Item eventKey="1">Architecture</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Programming</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Entrepreneurship</Dropdown.Item>
                    </DropdownButton>
                    <Link className="btn btn-outline-success" variant="outline-success" style = {{marginLeft: 'auto'}} to="/">Sign out</Link>
                    <Button onClick={() => this.handleClick()}>Push</Button>
                </Navbar>
             </div>
        )
    }

 }

 export default NavBar;