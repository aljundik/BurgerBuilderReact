import * as actionsTypes from '../actions/actions';
const initState= {
    ingredients: {
        meat: 0,
        cheese: 0,
        salad: 0,
        bacon: 0
    },
    totalPrice: 3,
    
}

const INGPRICES= {
    meat: 1,
    cheese: 0.7,
    salad: 1.2,
    bacon: 0.8
}

const reducer =(state= initState, action) => {
    switch(action.type){
        case(actionsTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGPRICES[action.ingredientName]
            };
            
        case(actionsTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGPRICES[action.ingredientName]
            };

        default: return {
            ...state
        }
    }
}

export default reducer;