import React from 'react';
import {Navbar, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Images/LogoTec.png';
import Clase from '../classes/Clase';
import { connect } from 'react-redux';
import setClasses from '../Actions/setClasses';
import axios from 'axios';

 class NavBar extends React.Component {
    clases = [
        new Clase("A01024595", "Arquitectura"),
        new Clase("A01024585", "Programación")];

    updateGrade(id)
    {
        console.log(document.getElementById(id).innerHTML);
        console.log(id);
    }
    getData(teacher_id) {
        axios.get("http://localhost:5000/getClassesofTeacher?teacher-id="+teacher_id).then(response => {
          this.props.setClasses(response);
        })
      }

    render() {
        this.getData(this.props.state.currentUser);
        this.clases = this.props.state.classesArr;
        console.log(this.props.state);
        
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <img src={Logo} width="50" height="50" />
                    <Navbar.Brand href="#home" style = {{marginLeft: '15px'}}>International Exchange Portal</Navbar.Brand>
                    <DropdownButton  as={ButtonGroup} title="Groups" id="bg-vertical-dropdown-1" style = {{marginLeft: '15px'}} >
                    {this.clases.map(clases => (
                        <Dropdown.Item key={clases.id} id = {clases.id} onClick={() => this.updateGrade(clases.id)} >{clases.name}</Dropdown.Item>
                    ))}
                    </DropdownButton>
                    <Link className="btn btn-outline-success" variant="outline-success" style = {{marginLeft: 'auto'}} to="/">Sign out</Link>
                </Navbar>
             </div>
        )
    }

 }

 const mapStateToProps = (state) => {
    return {
      state: state.rootReducer,
    }
  }
  
  const mapDispatchToProps = {
    setClasses
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
