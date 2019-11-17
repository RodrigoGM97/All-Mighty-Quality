import React from 'react';
import NavBar from './Nav-bar';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
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
  verifyLogin(user, pass) {
    axios.get("http://localhost:5000/login?user="+user+"&pass="+pass).then(response => console.log(response));
    return <Redirect to="/" />;
  
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
              
              <Link className="a" variant="contained" to="/Home" onClick={() => this.verifyLogin(document.getElementById("user").value, document.getElementById("pass").value)}>Sign In</Link>
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