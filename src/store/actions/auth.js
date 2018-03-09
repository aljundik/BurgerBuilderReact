import * as actionTypes from './actions'
import axios from 'axios';
import { APIKEY, APIKEY_SIGNIN } from '../../constant';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
const authSuccess = (data) => {
    const {localId, idToken} = data;
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        id: localId
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpireDate');
    localStorage.removeItem('userId');
    
    return {
        type: actionTypes.LOGOUT
    }
}

const logOutTimer = (timer) => {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout());
        } ,timer* 1000)
    }
} 


const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStart());
        
        const userData = {
            email,
            password,
            returnSecureToken: true
        }

        const url = isSignedUp ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}` :
         `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;

        axios.post(url, userData)
        .then(response => {
            const tokenExpireAt = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('tokenExpireDate', tokenExpireAt);
            localStorage.setItem('userId', response.data.localId);
            
            
            dispatch(logOutTimer(response.data.expiresIn));
            dispatch(authSuccess(response.data));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error.message));
        })

    }
}

const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const tokenExpireDate = new Date(localStorage.getItem('tokenExpireDate'));
            if(tokenExpireDate <= new Date){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(logOutTimer((tokenExpireDate.getTime() - new Date().getTime())/ 1000));
            }

        }
    }
}

export {
    auth,
    logout,
    setAuthRedirectPath,
    authCheckState
};