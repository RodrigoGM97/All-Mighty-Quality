import React from 'react';
import { Navbar, ButtonGroup, DropdownButton, DropdownItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Images/LogoTec.png';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import signOut from '../Actions/signOut';

var called_state = 0;
 class Alumnos extends React.Component {
    constructor(props) {
        super(props);
        this.getClasses(localStorage.getItem('currentUser'));
    }
    getClasses(student_id) {

    }

    signOut() {
      console.log("hola");
      this.props.signOut();
    }
    
    render() {       

        return (
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Alumnos);