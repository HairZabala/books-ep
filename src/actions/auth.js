import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch'
import { types } from '../types/types';

export const startLogin = (email, password) => {
    return async(dispatch) => {

        const resp = await fetchWithoutToken('login', { email, password}, 'POST');
        const body = await resp.json();
        
        // console.log(body);

        if( body.status ){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(body.user));

        } else {
            Swal.fire('Error', body.error.msg, 'error')
        }

    }
}

export const starChecking = () => {
    return async(dispatch) => {

        const resp = await fetchWithToken('login/renew');
        const body = await resp.json();
        
        if( body.status ){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // console.log(body);
            dispatch(login(body.user));

        } else {
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })