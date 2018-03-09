import * as actionsTypes from '../actions/actions';
import {updateObject} from '../utility';

const initState = {
    ingredients: null,
    totalPrice: 3,
    error: false,
    errorMessage: '',
    building: false
}

const INGPRICES = {
    meat: 1,
    cheese: 0.7,
    salad: 1.2,
    bacon: 0.8
}

const reducer = (state = initState, action) => {
    switch (action.type) {


        case (actionsTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGPRICES[action.ingredientName],
                building: true
            };

        case (actionsTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGPRICES[action.ingredientName],
                building:true
            };

        case (actionsTypes.SET_INGREDIENT):
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 3,
                building: false
            };

        default: return {
            ...state,
            errorMessage: action.error
        }
    }
}

export default reducer;