import { createStore , combineReducers } from 'redux';
import rootReducer from './Reducer/rootReducer';



const mainReducer = combineReducers({
    rootReducer
})

const store = createStore(mainReducer);

export default store;