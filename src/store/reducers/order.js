import * as actionsTypes from '../actions/actions';
import {updateObject} from '../utility';
const initState = {
    orders: [],
    loading: false,
    purchased: false,
    error: ''
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case (actionsTypes.INIT_PURCHASING):

            return {
                ...state,
                purchased: false
            };

        case (actionsTypes.SET_ORDER_SUCESS):


            const newOrder = {
                ...action.order,
                id: action.id,
                purchased: true
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false
            };

        case (actionsTypes.SET_ORDER_FAIL):
            return {
                ...state,
                loading: false
            };

        case (actionsTypes.SET_ORDER_START):
            return {
                ...state,
                loading: true
            };


        case (actionsTypes.FETCH_ORDER_SUCCESS):

            return {
                ...state,
                orders: action.orders,
                loading: false
            };

        case (actionsTypes.FETCH_ORDER_FAIL):
            return {
                ...state,
                error: action.error
            };

        case (actionsTypes.FETCH_ORDER_START):
            return {
                ...state,
                loading: false
            };

        default: return {
            ...state,

        }




    }


}



export default reducer;