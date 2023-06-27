import {
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP,
    LOGIN_SUCCESS,
    LOGOUT
  } from "./auth-type";
import axios from "axios";
import { createAccount } from "../../utils/currentWallet.utility";
  
export const signUp = (data) => (dispatch) => {
    dispatch({ type: SIGNUP })
    console.log(data)
    axios.post(`${process.env.REACT_APP_API_URL}/register`, data)
        .then(async res => {
            dispatch({type: SIGNUP_SUCCESS, payload: res.data});
        })
        .catch(err=>{
            const errMsg = err.response?.data?.message;
            dispatch({type: SIGNUP_ERROR, payload: 'Email already exists'});
        })
}

export const login = (data) => (dispatch) => {
    dispatch({ type: SIGNUP })
    // axios.post(`${process.env.REACT_APP_API_URL}/authenticate`, data)
        axios.post(`${process.env.REACT_APP_API_URL}authenticate`, data)
        .then(async res=>{
            localStorage.setItem('sessionId', res.data.jwtToken);
            localStorage.setItem('user-data', JSON.stringify(res.data));
            console.log("This is before creating wallet in login process and repsonse from api is", res.data)
            if (!res.data.wallet) {
                const account = await createAccount();
                axios.put(`${process.env.REACT_APP_API_URL}/${res.data.id}`, {wallet: account.address, privateKey: account.privateKey}, {headers: {Authorization: `Bearer ${localStorage.getItem('sessionId')}`}})
                    .then(res => {
                        var userData = JSON.parse(localStorage.getItem("user-data"));
                        userData.wallet = res.data.wallet;
                        userData.privateKey = res.data.privateKey;
                        localStorage.setItem('user-data', JSON.stringify(userData));

                        console.log("Before loggin in, creating new wallet and userData is", userData)

                        dispatch({type: LOGIN_SUCCESS, payload: res.data});
                    })
                    .catch(err => {
                        const errMsg = err.response?.data?.message;
                        dispatch({type: SIGNUP_ERROR, payload: errMsg ? errMsg : 'Internal server error'});
                    })
            } else {
                dispatch({type: LOGIN_SUCCESS, payload: res.data});
            }
            
        })
        .catch(err=>{
            const errMsg = err.response?.data?.message;
            dispatch({type: SIGNUP_ERROR, payload: errMsg ? errMsg : 'Internal server error'});
        })
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('user-data');
    localStorage.removeItem('sessionId');
    dispatch({ type: LOGOUT })
}