import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR
} from './user-type';

const initialState = {
  data: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null
        };
      case GET_USERS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  };
  
export default reducer;
