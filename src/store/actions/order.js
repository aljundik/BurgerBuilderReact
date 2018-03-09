import * as actionTypes from './actions';
import axios from '../../axios-orders';



const postOrderSucess = (order, id) => {
    return {
        type: actionTypes.SET_ORDER_SUCESS,
        order,
        id
    }
}

const initPurchasing = () => {
    return {
        type: actionTypes.INIT_PURCHASING
    }
};

const postOrderFail = (error) => {
    return {
        type: actionTypes.SET_ORDER_FAIL,
        error
    }
}

const postOrderStart = () => {
    return {
        type: actionTypes.SET_ORDER_START

    }
}


const fetchOrderSucess = (orders) => {
    
    return {
        orders,
        type: actionTypes.FETCH_ORDER_SUCCESS,
        
    }
};

const fetchOrderFail = () => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        
    }
}

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

const fetchOrder = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        
        axios.get( `https://reactburger-63715.firebaseio.com/order.json?auth=${token}` )
        .then( response => {
            const arr= [];
            for(let item in response.data){
                 arr.push({
                     ...response.data[item],
                     id: item
                 });
            }
    
            dispatch(fetchOrderSucess(arr));
        } )
        .catch( error => {
            dispatch(fetchOrderFail(error));
        } );
    }
}

 const postOrder = (order,token) => {
    return dispatch =>{
        dispatch(postOrderStart());
        axios.post(`/order.json?auth=${token}`, order).then(
            response => {
                dispatch(postOrderSucess( order, response.data.name));
            }
        ).catch(error => {
            dispatch(postOrderFail(error));
        });
    }
}


export {
    postOrder,
    initPurchasing,
    fetchOrder,
    postOrderSucess,
    postOrderFail,
    postOrderStart,
    fetchOrderSucess,
    fetchOrderFail,
    fetchOrderStart
}