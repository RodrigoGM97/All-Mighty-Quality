import Data from '../classes/Data';
import Alumno from '../classes/Alumno';

var alumnos = [
    new Alumno("A01024595", "Rodrigo", "Garcia", "mail",[{"class":"Arquitectura", "grade":"10"}, {"class":"Programación", "grade":"7"}]), 
    new Alumno("A01023607", "Alberto", "Pascal", "mail",[{"class":"Arquitectura", "grade":"9"}, {"class":"Programación", "grade":"8"}])];
var data = new Data(alumnos);





function rootReducer(state = data, {type, payload}) {
    switch(type) {
        case 'setAlumnos':
            state = payload;
            return state;
        default:
            
            return state;
    }
}



export default rootReducer;