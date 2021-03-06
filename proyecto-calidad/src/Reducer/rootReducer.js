import Data from '../classes/Data';


var data = new Data();


function rootReducer(state = data, {type, payload}) {
    switch(type) {
        case 'setCurrentUser':
            state.setCurrentUser(payload[0], payload[1]);
            return state;
        case 'setClasses':
            state.setClasses(payload);
            return state;
        case 'setCurrentClass':
            state.currentClass = payload[0];
            state.currentclassID = payload[1];
            return state;
        case 'setAlumnosInClass':
            state.setAlumnosInClass(payload);
            return state;
        case 'setGrades':
            state.setGrades(payload);
            return state;
        case 'signOut':
            localStorage.clear();
            state = new Data();
            return state;
        case 'getStudentGrades':
            state.getStudentGrades(payload);
            return state;
        default:
            
            return state;
    }
}



export default rootReducer;