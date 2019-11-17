import Data from '../classes/Data';
import Alumno from '../classes/Alumno';
import axios from 'axios';


axios.get('http://localhost:5000/GET-allStudents').then(response => getAlumnos(response));

var alumnos = [
    new Alumno("A01024595", "Rodrigo", "Garcia", "mail",[{"class":"Arquitectura", "grade":"10"}, {"class":"Programación", "grade":"7"}]), 
    new Alumno("A01023607", "Alberto", "Pascal", "mail",[{"class":"Arquitectura", "grade":"9"}, {"class":"Programación", "grade":"8"}])];
var data = new Data(alumnos);

function getAlumnos(alumnos) {
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
    var writeData = new Data(alumnosArr);
    data = writeData;
}



function rootReducer(state = data, {type, payload}) {
    switch(type) {
        case 'Grades':
            
            console.log(state.studentArr);
            return state;
        default:
            
            return state;
    }
}



export default rootReducer;