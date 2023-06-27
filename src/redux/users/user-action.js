import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
  } from "./user-type";
import axios from "axios";
  
export const getUsers = () => (dispatch) => {
    dispatch({ type: GET_USERS })
    axios.get(`${process.env.REACT_APP_API_URL}`, {headers: {Authorization: `Bearer ${localStorage.getItem('sessionId')}`}})
        .then(async res => {
            dispatch({type: GET_USERS_SUCCESS, payload: res.data});
        })
        .catch(err=>{
            const errMsg = err.response?.data?.message;
            dispatch({type: GET_USERS_ERROR, payload: errMsg ? errMsg : 'Internal server error'});
        })
}
  