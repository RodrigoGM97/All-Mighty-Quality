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
          
        });
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    render() {
        this.getData(this.props.state.currentUser);
        this.clases = this.props.state.classesArr;
        
        this.sleep(500).then(() => {
            //do stuff
          
        console.log("hola: %j",this.props.state.classesArr);
        var arr = this.props.state.classesArr;
        console.log("Arr: %j",arr[0]);
        console.log("Length: %j",arr);
        
        })
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <img src={Logo} width="50" height="50" />
                    <Navbar.Brand href="#home" style = {{marginLeft: '15px'}}>International Exchange Portal</Navbar.Brand>
                    <DropdownButton  as={ButtonGroup} title="Groups" id="bg-vertical-dropdown-1" style = {{marginLeft: '15px'}} >
                    {this.clases.map(clasesArr => (
                        <Dropdown.Item key={clasesArr.id} id = {clasesArr.id} onClick={() => this.updateGrade(clasesArr.id)} >{clasesArr.name}</Dropdown.Item>
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
    setClasses,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
