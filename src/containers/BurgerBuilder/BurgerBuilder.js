import React , { Component }  from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Summary from '../../components/Burger/Summary/Summary';
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithError/WithError';
import {
    addIngredient,
    removeIngredient,
    initIngredients} from '../../store/actions/burgerBuilder';

import{ initPurchasing } from '../../store/actions/order';
import {setAuthRedirectPath} from '../../store/actions/auth';






export class BurgerBuilder extends Component {

    state = {
        checkoutActive: false,
    }
    
    componentDidMount () {

        this.props.onFetchIngredients();
    }

    updateCheckout = () => {
        if(this.props.isAuth) {
            this.setState({
                checkoutActive: true
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
 }       
    }

    backDropClicked = () => {
        this.setState({
            checkoutActive: false
        });
       
    }
    
    updatePurchase= (ingredients)=>{
        const sum = Object.keys(ingredients).map(ingKey =>{
            return ingredients[ingKey];
        }).reduce((pre,cur) => {
            return pre+cur;
        },0);

        return sum > 0;
    }

    continueHandler = () => {
        this.props.onInitPurchasing();
        this.props.history.push('/checkout');
    }

    render(){
      const  { ingredients } = this.props;
      let disabledInfo = {...this.props.ingredients};
      for (var key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }

      let modalActive = null;
      let orderSummary = (
        <Summary 
          ingredients={ingredients}
          clickedContinue={this.continueHandler}
          clickedCancel={this.backDropClicked}
          price={this.props.totalPrice}
      /> )


      if(this.state.checkoutActive) {
          modalActive = (
            <Modal 
              backdropActive={this.backDropClicked}
              show={this.updatePurchase(this.props.ingredients)}
              > 
              {orderSummary} 
            </Modal>);
      }

      let burger = this.props.error ? <Spinner /> : null

      if(ingredients) { 
         burger = (
           <Aux>
             <Burger ingredients={ingredients} />
             <BuildControls disabledInfo={disabledInfo} 
               removed={this.props.onRemoveIngredients} 
               added={this.props.onAddIngredients} 
               price={this.props.totalPrice}
               isAuth={this.props.isAuth}
               purchasable={this.updatePurchase(this.props.ingredients)}
               activeCheckout={this.updateCheckout}
             /> 
           </Aux>
        )
      }
        return(
          <Aux> 
            {modalActive}
            {burger}   
          </Aux>
        );
    }

}

BurgerBuilder.propTypes = {
    history: PropTypes.object,
    ingredients: PropTypes.object,
    onAddIngredients: PropTypes.func,
    onRemoveIngredients: PropTypes.func,
    totalPrice: PropTypes.number,
    onFetchIngredients: PropTypes.func,
    error: PropTypes.bool,
    onInitPurchasing: PropTypes.func,
    isAuth: PropTypes.bool,
    onSetAuthRedirectPath: PropTypes.func
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !==null,

    };
};

const mapDispatchToProps= dispatch => {
    return {

        onAddIngredients: (ingName) => {
            dispatch(
                addIngredient(ingName)
            )},

        onRemoveIngredients: (ingName) => {
            dispatch(
                removeIngredient(ingName)
            )},
        onFetchIngredients: () => {
            dispatch(
                initIngredients()
            )
        },
        onInitPurchasing: () => {
            dispatch(initPurchasing());
        },
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler (BurgerBuilder, axios));