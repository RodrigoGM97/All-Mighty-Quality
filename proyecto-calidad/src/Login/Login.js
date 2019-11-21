import React from 'react';
import NavBar from './Nav-bar';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import setCurrentUser from '../Actions/setCurrentUser';

import axios from 'axios';


 
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
  
  verifyLogin(user, pass) {
    var payload;
    axios.get("http://localhost:5000/login?user="+user+"&pass="+pass).then(response => {
      if(response.data === "Teacher")
        this.professor = true;
      if(response.data === "Student")
        this.student = true;
      
      if(this.professor) {
        payload = [user, "Profesor"];
        this.props.setCurrentUser(payload);
        this.props.history.push('/Grades');
        localStorage.setItem('currentUser',payload[0]);
        localStorage.setItem('state',this.props);
      }  
      else if (this.student) {
        payload = [user, "Alumno"];
        localStorage.setItem('currentUser',payload[0]);
        localStorage.setItem('state',this.props);
        this.props.setCurrentUser(payload);
        this.props.history.push('/Home-Alumno');
        
      } 
      else {
        console.log(this.props);
        alert("Incorrect Data");
      }
    });
  }

  render () {
    
    return (
      <div className="Login">
        <NavBar></NavBar>
        <Paper style={loginCard}>
          <h4 style={formElement}>Sign In</h4>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <Input style={formElement} id="user" placeholder="User"/>
              <Input type="password" style={formElement} id="pass" placeholder="Password"/>
              <Button variant="contained" color="primary" onClick={() => this.verifyLogin(document.getElementById("user").value, document.getElementById("pass").value)}>Sign In</Button>
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
  setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);