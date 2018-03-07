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
import * as actions from '../../store/actions';






class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        checkoutActive: false,
        loading: false,
        error: false
    }
    
    componentDidMount () {
        // axios.get( 'https://reactburger-63715.firebaseio.com/ingredients.json' )
        //     .then( response => {
        //         this.setState( { ingredients: response.data } );
        //     } )
        //     .catch( error => {
        //         this.setState( { error: true } );
        //     } );
    }

    updateCheckout = () => {
        this.setState({
            checkoutActive: true
        });
        console.log('checkout clicked', this.state.checkoutActive);
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

    // addHandler = (type) => {
    //     const upadateIng = this.props.ingredients[type] + 1;
    //     const updatedStateIng = { ...this.props.ingredients};
    //     updatedStateIng[type] = upadateIng;

    //     const updatedPrice = INGPRICES[type] + this.state.totalPrice;

    //     this.setState ({
    //         totalPrice: updatedPrice,
    //         ingredients: updatedStateIng
    //     });
    //     console.log('The current Price: ', updatedPrice);
    //     this.updatePurchase(updatedStateIng);

    // }

    // removeHandler = (type) => {
    //     const upadateIng = this.props.ingredients[type] - 1;
    //     const updatedStateIng = { ...this.props.ingredients};
        
    //     updatedStateIng[type] = upadateIng;
        
    //     const price = this.state.totalPrice;
    //     this.setState ({
    //         totalPrice: updatedPrice,
    //         ingredients: updatedStateIng 
    //     });
    //     console.log('The current Price: ', updatedPrice);
    //     this.updatePurchase(updatedStateIng);

    // }

    continueHandler = () => {

        const queryParams= [];
        for(let i in this.props.ingredients){
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ingredients[i])}`)
        }
        queryParams.push('price='+this.props.totalPrice);

        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
      const  { ingredients } = this.props;
      console.log(ingredients);
      let disabledInfo = {...this.props.ingredients};
      for (var key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      console.log('price is :',this.props.totalPrice);

      let modalActive = null;
      let orderSummary = (
        <Summary 
          ingredients={ingredients}
          clickedContinue={this.continueHandler}
          clickedCancel={this.backDropClicked}
          price={this.props.totalPrice}
      /> )
      if(this.state.loading) {
        orderSummary = <Spinner />
      }

      if(this.state.checkoutActive) {
          modalActive = (
            <Modal 
              backdropActive={this.backDropClicked}
              show={this.state.purchasable}
              > 
              {orderSummary}
            </Modal>);
      }
      let burger = <Spinner />

      if(ingredients) { // double check here if it works
         burger = (
           <Aux>
             <Burger ingredients={ingredients} />
             <BuildControls disabledInfo={disabledInfo} 
               removed={this.props.onRemoveIngredients} 
               added={this.props.onAddIngredients} 
               price={this.props.totalPrice}
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
    totalPrice: PropTypes.number
}


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps= dispatch => {
    return {

        onAddIngredients: (ingName) => {
            dispatch({
            type: actions.ADD_INGREDIENT,
            ingredientName: ingName     
        })},

        onRemoveIngredients: (ingName) => {
            dispatch({
             type: actions.REMOVE_INGREDIENT,
             ingredientName: ingName
            })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler (BurgerBuilder, axios));