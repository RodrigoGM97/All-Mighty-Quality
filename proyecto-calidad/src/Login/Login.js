import React from 'react';
import NavBar from './Nav-bar';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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

  state = {
    student: false,
    professor: false,
  }

  verifyLogin(user, pass) {
    axios.get("http://localhost:5000/login?user="+user+"&pass="+pass).then(response => {
      if(response.data === "Teacher")
        this.professor = true;
      if(response.data === "Student")
        this.student = true;
      
      if(this.professor)
        this.props.history.push('/Home');
      else if (this.student)
        this.props.history.push('/Home');
      else {
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
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);