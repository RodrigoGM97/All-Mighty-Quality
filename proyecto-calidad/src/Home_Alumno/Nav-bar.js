import React from 'react';
import {Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Images/LogoTec.png';
import signOut from '../Actions/signOut';
import { connect } from 'react-redux';

 class NavBar extends React.Component {
    signOut() {
        this.props.signOut();
      }
    
    render() {

        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <img src={Logo} width="50" height="50" alt="notFound"/>
                    <Navbar.Brand style = {{marginLeft: '15px'}}>International Exchange Portal</Navbar.Brand>
                    <Link className="btn btn-outline-success" variant="outline-success" style = {{marginLeft: 'auto'}} to="/" onClick={() => this.signOut()}>Sign out</Link>
                </Navbar>
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
    signOut
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
