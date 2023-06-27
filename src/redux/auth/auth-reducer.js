import {
  SIGNUP,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT
} from './auth-type';

const initialState = {
  data: null,
  loading: false,
  registered: false,
  error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP:
        return {
          ...state,
          loading: true,
          registered: false,
          error: null
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          registered: true,
          error: null
        };
      case SIGNUP_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
          registered: false
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          loggedIn: true,
          error: null
        };
      case LOGOUT:
        return {
          ...state,
          loading: false,
          data: null,
          loggedIn: false,
          error: null
        }
      default:
        return state;
    }
  };
  
export default reducer;
