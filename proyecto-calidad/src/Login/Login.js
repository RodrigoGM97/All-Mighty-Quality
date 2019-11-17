import React from 'react';
import NavBar from './Nav-bar';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import setAlumnos from '../Actions/setAlumnos';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Data from '../classes/Data';
import Alumno from '../classes/Alumno';

 
const loginCard = {
  position: 'absolute',
  left: '10%',
  right: '10%',
  top: '15%',
  padding: '5%'
};

const formElement= {
  marginBottom: '5%'
};


class Login extends React.Component {
  constructor(props){
    super(props);
  }
  
  getAlumnos(alumnos) {
    
    alumnos = alumnos.data;
    var alumnosArr = [];
    for(var i=0;i<alumnos.length;i++) {
        var alumno = {
            'id':alumnos[0].id,
            'name':alumnos[1].name,
            'lastNames':alumnos[2].lastNames,
            'mail':alumnos[3].mail,
            'password':alumnos[4].password
        }
        var clases = [{"class":"Arquitectura", "grade":"10"}, {"class":"Programación", "grade":"7"}];
        alumnosArr.push(new Alumno(alumno.id, alumno.name, alumno.lastNames, alumno.mail, clases, alumno.password));
    }
    var data = new Data(alumnosArr);
    this.props.setAlumnos(data);
}
  render () {
    axios.get('http://localhost:5000/GET-allStudents').then(response => this.getAlumnos(response));
    
    return (
      <div className="Login">
        <NavBar></NavBar>
        <Paper style={loginCard}>
          <h4 style={formElement}>Sign In</h4>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <Input value={''} style={formElement} id="component-simple" placeholder="User"/>
              <Input value={''} style={formElement} id="component-simple" placeholder="Password"/>
              
              <Link className="btn btn-primary" variant="contained" to="/Home">Sign In</Link>
          </div>
        </Paper>
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
  setAlumnos,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);