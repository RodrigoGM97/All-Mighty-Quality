import React from 'react';
import { Navbar, ButtonGroup, DropdownButton} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Images/LogoTec.png';
import { connect } from 'react-redux';
import setClasses from '../Actions/setClasses';
import setCurrentClass from '../Actions/setCurrentClass';
import setAlumnosInClass from '../Actions/setAlumnosInClass';
import axios from 'axios';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import setGrades from '../Actions/Grades';
import signOut from '../Actions/signOut';

 class EditGrades extends React.Component {
    constructor(props) {
        super(props);
        this.getData(localStorage.getItem('currentUser'));
    }

    updateGrade() {
        var ids = [];
        var grades = [];
        var temp;
        var size = document.getElementById("students").rows.length;
        for(var i =1; i<size; i++)
        {
          ids.push(document.getElementById("students").rows[i].cells[0].innerHTML); 
          temp = {"academic": document.getElementById("grade1"+ids[i-1]).value, "team": document.getElementById("grade2"+ids[i-1]).value, "communication": document.getElementById("grade3"+ids[i-1]).value};
          grades.push(temp);
        }
        this.props.setGrades(grades);
        var json_stringify = JSON.stringify(this.props.state.alumnosinClass);
        console.log(this.props.state.currentclassID);
        axios.get("http://arquitectura-api.westus2.azurecontainer.io:5000/SET-studentgrade?classid="+this.props.state.currentclassID+"&json="+json_stringify).then(response => {
          console.log(response);
        });
    }
    getData(teacher_id) {
        axios.get("http://arquitectura-api.westus2.azurecontainer.io:5000/getClassesofTeacher?teacher-id="+localStorage.getItem('currentUser')).then(response => {
          this.props.setClasses(response);
          this.setState({ state: this.state });
        });
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    getClass(classesname, classesid){
        var payload = [classesname, classesid];
        this.props.setCurrentClass(payload);
        axios.get("http://arquitectura-api.westus2.azurecontainer.io:5000/getStudentGrades?teacher_id="+localStorage.getItem('currentUser')+"&class_name="+classesname).then(response => {
            this.props.setAlumnosInClass(response);
            this.setState({ state: this.state });
        });  
    }

    signOut() {
      this.props.signOut();
    }
    
    render() {       
               
        
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <img src={Logo} width="50" height="50" alt="notFound"/>
                    <Navbar.Brand style = {{marginLeft: '15px'}}>International Exchange Portal</Navbar.Brand>
                    <DropdownButton  as={ButtonGroup} title={this.props.state.currentClass} id="bg-vertical-dropdown-1" style = {{marginLeft: '15px'}} >
                    {this.props.state.classesArr.map(classes => (
                        <DropdownItem key={classes.id} value={classes.id} onClick={() => this.getClass(classes.name, classes.id)}>{classes.name}</DropdownItem>
                    ))}
                    </DropdownButton>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Link className="btn btn-outline-success" variant="outline-success" style = {{marginLeft: 'auto'}} to="/" onClick={() => this.signOut()}>Sign out</Link>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                  <Paper >
                    <Table id="students">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell >Name</TableCell>
                          <TableCell >Surname</TableCell>
                          <TableCell >Class</TableCell>
                          <TableCell >Academic</TableCell>
                          <TableCell >Team Work</TableCell>
                          <TableCell >Communication Skills</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.props.state.alumnosinClass.map(alumnos => (
                          <TableRow key={alumnos.ID}>
                            <TableCell component="th" scope="row">{alumnos.ID}</TableCell>
                            <TableCell >{alumnos.Name}</TableCell>
                            <TableCell >{alumnos.LastName}</TableCell>
                            <TableCell >{alumnos.className}</TableCell>
                            <TableCell >
                              <input type="number" defaultValue={alumnos.Academic} id={"grade1" + alumnos.ID} min="0" max="100"/>
                            </TableCell>
                            <TableCell >
                              <input type="number" defaultValue={alumnos.teamWork} id={"grade2" + alumnos.ID} min="0" max="100"/>
                            </TableCell>
                            <TableCell >
                              <input type="number" defaultValue={alumnos.commSkills} id={"grade3" + alumnos.ID} min="0" max="100"/>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                  <Link className="btn btn-primary" style={{justifyContent:'center'}} variant="contained" onClick={() => this.updateGrade()} to="/Grades" >Submit</Link>
                </div>
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
    setCurrentClass,
    setAlumnosInClass,
    setGrades,
    signOut
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditGrades);