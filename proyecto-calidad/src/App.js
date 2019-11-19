import React from 'react';
import editGrades from './Home_Profesor/Home';
import Grades from './Home_Profesor/Home2';
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
          <Route exact path='/editGrades' component={editGrades} />
          <Route exact path='/Grades' component={Grades} />
          <Route exact path='/Home-Alumno' component={Home_Alumno} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;