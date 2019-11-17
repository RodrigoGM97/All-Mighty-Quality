import React from 'react';
import Home_Profesor from './Home_Profesor/Home';
import Home_Alumno from './Home_Alumno/Home';
import Login from './Login/Login';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/Home-Profesor' component={Home_Profesor} />
          <Route exact path='/Home-Alumno' component={Home_Alumno} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;