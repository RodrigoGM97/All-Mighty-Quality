import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Grades from '../Actions/Grades';

/*const root = {
  width: '100%',
  marginTop: theme.spacing(3),
  overflowX: 'auto',
};

const table = {
  minWidth: 650,
};*/

class tablaAlumnos extends React.Component {
  constructor(props){
    super(props);
  } 


  updateGrade() {
    var payload = [];
    var ids = [];
    var classes = [];
    var grades = [];
    var temp;
    var size = document.getElementById("students").rows.length;
    for(var i =1; i<size; i++)
    {
      ids.push(document.getElementById("students").rows[i].cells[0].innerHTML); 
      classes.push(document.getElementById("students").rows[i].cells[3].innerHTML);
      temp = {"academic": document.getElementById("grade1"+ids[i-1]).value, "team": document.getElementById("grade2"+ids[i-1]).value, "communication": document.getElementById("grade3"+ids[i-1]).value};
      grades.push(temp);
    }
    payload[0] = ids;
    payload[1] = classes;
    payload[2] = grades;
    this.props.Grades(payload);
    console.log(payload);
  }

  render() {
    
    this.alumnos = this.props.state.studentArr;
    //this.getGraph();
    

    return (
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
              {this.alumnos.map(alumnos => (
                <TableRow key={alumnos.id}>
                  <TableCell component="th" scope="row">{alumnos.id}</TableCell>
                  <TableCell >{alumnos.name}</TableCell>
                  <TableCell >{alumnos.surname}</TableCell>
                  <TableCell >{alumnos.enrolledClasses[0].class}</TableCell>
                  <TableCell >
                    <input type="number" id={"grade1" + alumnos.id} min="0" max="100"/>
                  </TableCell>
                  <TableCell >
                    <input type="number" id={"grade2" + alumnos.id} min="0" max="100"/>
                  </TableCell>
                  <TableCell >
                    <input type="number" id={"grade3" + alumnos.id} min="0" max="100"/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button className="btn btn-primary" variant="contained" onClick={() => this.updateGrade()}>Submit</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.rootReducer,
  }
}

const mapDispatchToProps = {
  Grades
}

export default connect(mapStateToProps, mapDispatchToProps)(tablaAlumnos);