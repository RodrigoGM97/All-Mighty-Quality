import Data from '../classes/Data';
import Alumno from '../classes/Alumno';

var alumnos = [
    new Alumno("A01024595", "Rodrigo", "Garcia", [{"class":"Arquitectura", "grade":"10"}, {"class":"Programación", "grade":"7"}]), 
    new Alumno("A01023607", "Alberto", "Pascal", [{"class":"Arquitectura", "grade":"9"}, {"class":"Programación", "grade":"8"}])];
var data = new Data(alumnos);

function rootReducer(state = data, {type, payload}) {
    switch(type) {
        case 'Grades':
            console.log("Actualizando calificación");
            console.log(payload);
            for(var i=0; i<state.studentArr.length; i++)
            {
                for(var j=0; j< state.studentArr[i].enrolledClasses.length; j++)
                {
                    if(state.studentArr[i].id.localeCompare(payload[0]) === 0 && state.studentArr[i].enrolledClasses[j].class.localeCompare(payload[1] === 0))
                    {
                        state.studentArr[i].enrolledClasses[j].grade = payload[2];
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
            }
            
            //state.studentArr[0].enrolledClasses[0].grade = payload;
            //console.log(state.studentArr[0].enrolledClasses[0].grade);
            console.log(state.studentArr);
            return state;
        default:
            console.log('entró al default');
            return state;
    }
}

export default rootReducer;