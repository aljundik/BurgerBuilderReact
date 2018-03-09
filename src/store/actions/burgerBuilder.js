import * as actionTypes from './actions';
import axios from '../../axios-orders';


 const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};



 const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
};

const setError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAIL
    }
};


const initIngredients = () => {
    return dispatch => {
        axios.get('https://reactburger-63715.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data)); 
        })
        .catch(error => {
            dispatch(setError());
        });
        
    };
}



export {
    addIngredient,
    removeIngredient,
    initIngredients,
    setError

}

