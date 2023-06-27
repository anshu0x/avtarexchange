import {combineReducers} from 'redux';
import auth from './auth/auth-reducer';
import users from './users/user-reducer';
 
export default combineReducers({
    auth,
    users
});
