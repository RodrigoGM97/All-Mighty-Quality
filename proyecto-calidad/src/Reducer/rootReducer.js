import Data from '../classes/Data';
import Alumno from '../classes/Alumno';


var data = new Data();


function rootReducer(state = data, {type, payload}) {
    switch(type) {
        
        default:
            
            return state;
    }
}



export default rootReducer;