import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import signOut from '../Actions/signOut';
import getStudentGrades from '../Actions/getStudentGrades';
var student_name = "";
 class Alumnos extends React.Component {
    constructor(props) {
        super(props);
        this.getStudentGrades(localStorage.getItem('currentUser'));
        this.setStudentName(localStorage.getItem('currentUser'));
    }
    getStudentGrades(student_id) {
        console.log("ID: "+student_id);
        axios.get("http://localhost:5000/getStudentReportCard?student_id="+student_id).then(response => {
            this.props.getStudentGrades(response);
            this.setState({ state: this.state });
        });
    }
    setStudentName(student_id) {
        axios.get("http://localhost:5000/welcomeStudent?student_id="+student_id).then(response => {
            console.log(response.data);
            student_name = response.data;
          //this.props.setStudentName(response);
          this.setState({ state: this.state });
        });
    }
    signOut() {
      console.log("hola");
      this.props.signOut();
    }
    
    render() {       

        return (
            
            <div>
                <div>
                <h2>
                    Bienvenid@, {student_name}...
                </h2>
                </div>
                <Paper >
                <Table id="students">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign:"center"}}>Class ID</TableCell>
                        <TableCell >Class Name</TableCell>
                        <TableCell style={{textAlign:"center"}}>Academic</TableCell>
                        <TableCell style={{textAlign:"center"}}>Team work</TableCell>                        
                        <TableCell style={{textAlign:"center"}}>Communication Skills</TableCell>
                        <TableCell style={{textAlign:"center"}}>Final Grade</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody >
                    {this.props.state.classesArr.map(alumnos => (
                        <TableRow key={alumnos.classID}>
                        <TableCell style={{textAlign:"center"}}>{alumnos.classID}</TableCell>
                        <TableCell >{alumnos.className}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{alumnos.academic}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{alumnos.teamwork}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{alumnos.commskills}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{alumnos.final_grade}</TableCell>                    
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
    getStudentGrades,
    signOut
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Alumnos);