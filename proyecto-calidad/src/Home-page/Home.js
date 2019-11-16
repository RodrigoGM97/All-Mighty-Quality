import React from 'react';
import NavBar from './Nav-bar';
import TablaAlumnos from './Alumnos';


function Home() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <TablaAlumnos></TablaAlumnos>
    </div>
  );
}

export default Home;
