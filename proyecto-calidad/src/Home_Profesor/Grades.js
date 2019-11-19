import React from 'react';
import { Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Images/LogoTec.png';
import { connect } from 'react-redux';
import setClasses from '../Actions/setClasses';
import setCurrentClass from '../Actions/setCurrentClass';
import setAlumnosInClass from '../Actions/setAlumnosInClass';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import setGrades from '../Actions/Grades';


var called_state = 0;
 class EditGrades extends React.Component {
    constructor(props) {
        super(props);
        this.getData(this.props.state.currentUser);
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
        axios.get("http://localhost:5000/getStudentGrades?teacher_id="+this.props.state.currentUser+"&class_name="+classes).then(response => {
            this.props.setAlumnosInClass(response);
            this.setState({ state: this.state });
        });
        
        
        
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
                    <Link className="btn btn-outline-warning" variant="outline-warning" style = {{marginLeft: 'auto'}} to="/editGrades">Edit</Link>
                    <Link className="btn btn-outline-success" variant="outline-success" style = {{marginLeft: '5px'}} to="/">Sign out</Link>
                </Navbar>
                <div>
                  <Paper >
                    <Table id="students">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell >Name</TableCell>
                          <TableCell >Surname</TableCell>
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
                            <TableCell >{alumnos.Academic}</TableCell>
                            <TableCell >{alumnos.teamWork}</TableCell>
                            <TableCell >{alumnos.commSkills}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
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
    setGrades
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditGrades);