import React from 'react';
import { Navbar, ButtonGroup, DropdownButton} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Images/LogoTec.png';
import { connect } from 'react-redux';
import setClasses from '../Actions/setClasses';
import setCurrentClass from '../Actions/setCurrentClass';
import axios from 'axios';
import DropdownItem from 'react-bootstrap/DropdownItem';

var called_state = 0;
 class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.getData(this.props.state.currentUser);
    }

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
    getClass(classes){
        this.props.setCurrentClass(classes);
        this.setState({ state: this.state });
        
    }
    
    render() {       

        this.sleep(500).then(() => {
            if(called_state === 0)
            {
                called_state = 1;
                this.setState({ state: this.state });
            }
        })
        
        
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <img src={Logo} width="50" height="50" alt="notFound"/>
                    <Navbar.Brand href="#home" style = {{marginLeft: '15px'}}>International Exchange Portal</Navbar.Brand>
                    <DropdownButton  as={ButtonGroup} title={this.props.state.currentClass} id="bg-vertical-dropdown-1" style = {{marginLeft: '15px'}} >
                    {this.props.state.classesArr.map(classes => (
                        <DropdownItem key={classes.id} value={classes.id} onClick={() => this.getClass(classes.name)}>{classes.name}</DropdownItem>
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
    setCurrentClass
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);