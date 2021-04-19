import { types } from "../types/types"


export const authReducer = (state = { checking: true }, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }        
        case types.authLogout:
            return {
                checking: false
            }        
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }        
    
        default:
            return state;
    }

}