import Data from '../classes/Data';
import User from '../classes/User';


var userArr = [];


userArr.push(new User("Saúl Enrique", "Labra", "1234", "quique"));
userArr.push(new User("Rodrigo", "Garcia", "5678"));
userArr.push(new User("Manuel", "Guadarrama", "abcd"));
userArr.push(new User("Emilio", "Hernandez", "efghi"));


var data = new Data(userArr);

function rootReducer(state = data, {type, payload}) {
    switch(type) {
        
        default:
            console.log('entró al default');
            return state;
    }
}

export default rootReducer;