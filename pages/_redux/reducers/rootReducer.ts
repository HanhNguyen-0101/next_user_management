import { combineReducers } from 'redux'
import authReducer from './auth.reducer';
import drawerReducer from './drawer.reducer';
import menuReducer from './menu.reducer';

const rootReducer = combineReducers({
    authReducer,
    drawerReducer,
    menuReducer,
})

export default rootReducer;