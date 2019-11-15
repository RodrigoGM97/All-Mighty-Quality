import React from 'react';
import Home from './Home-page/Home';
import Login from './Login/Login';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import Popoto from './components/Popoto';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/Home' component={Home} />
          <Popoto />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
