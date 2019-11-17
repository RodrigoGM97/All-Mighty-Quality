import React from 'react';
import NavBar from './Nav-bar';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import setAlumnos from '../Actions/setAlumnos';
import setProfesores from '../Actions/setProfesores';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Data from '../classes/Data';
import Alumno from '../classes/Alumno';
import Profesor from '../classes/Profesor';

 
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

  render () {
      
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
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);