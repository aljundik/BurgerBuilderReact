import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
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
        let summary = <Redirect to='/' />

        if(this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
              <div>
                {purchasedRedirect}
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
        return summary;
    }
}

Checkout.propTypes = {
    history: PropTypes.object,
    match: PropTypes.any,
    ingredients: PropTypes.object,
    purchased: PropTypes.bool

}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);