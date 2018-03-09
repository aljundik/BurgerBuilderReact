import * as actions from '../actions/actions';

const initState= {
    token: null,
    id: null,
    loading: false,
    error: null
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case(actions.AUTH_START): 
            return {
                ...state,
                loading: true,
                error: ''
            };

        case(actions.AUTH_SUCCESS): 
            return {
                ...state,
                id: action.id,
                loading: false,
                token: action.token,
                error:null
            };

        case(actions.AUTH_FAIL): 
            return {
                ...state,
                error: action.error,
                loading: false
            };

        case(actions.LOGOUT): 
            return {
                ...state,
                token: null,
                id: null,
                error: null,
                loading: false
            };

        default: return state;
        
    }

}

export default reducer;