import Data from '../classes/Data';
import Alumno from '../classes/Alumno';


var data = new Data();


function rootReducer(state = data, {type, payload}) {
    switch(type) {
        case 'setCurrentUser':
            state.setCurrentUser(payload[0], payload[1]);
            return state;
        case 'setClasses':
            console.log("%j", state);
            state.setClasses(payload);
            return state;
        default:
            
            return state;
    }
}



export default rootReducer;