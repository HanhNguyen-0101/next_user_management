import { combineReducers } from 'redux'
import authReducer from './auth.reducer';
import drawerReducer from './drawer.reducer';

const rootReducer = combineReducers({
    authReducer,
    drawerReducer,
})

export default rootReducer;