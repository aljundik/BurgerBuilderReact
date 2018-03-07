import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import Order from '../../components/UI/Checkout/Order/Order';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component {

    continoueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    cancelHandler = () => {
        this.props.history.goBack();        
    }
    render(){
        return(
          <div>
            <Order 
              ingredients={this.props.ingredients}
              clickedContinoue={this.continoueHandler}
              clickedCancel={this.cancelHandler}
            />
            <Route 
              path={`${this.props.match.url}/contact-data`} 
              component={ContactData} />
          </div>
        )
    }
}

Checkout.propTypes = {
    history: PropTypes.object,
    match: PropTypes.any,
    ingredients: PropTypes.object,

}


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout);