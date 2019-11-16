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


  updateGrade(number, clase, academic, team, com) {
    var payload = [];
    payload[0] = number;
    payload[1] = clase;;
    payload[2] = academic;
    payload[3] = team;
    payload[4] = com;
    this.props.Grades(payload);
    console.log(payload);
  }

  render() {
    
    this.alumnos = this.props.state.studentArr;
    //this.getGraph();
    

    return (
      <Paper >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell >Name</TableCell>
              <TableCell >Surname</TableCell>
              <TableCell >Class</TableCell>
              <TableCell >Academic</TableCell>
              <TableCell >Team Work</TableCell>
              <TableCell >Communication Skills</TableCell>
              <TableCell > </TableCell>
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
                <TableCell component="th" scope="row">
                  <Button className="btn btn-primary" variant="contained" onClick={() => this.updateGrade(alumnos.id, alumnos.enrolledClasses[0].class, document.getElementById("grade1" + alumnos.id).value, document.getElementById("grade2" + alumnos.id).value, document.getElementById("grade3" + alumnos.id).value)}>Submit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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