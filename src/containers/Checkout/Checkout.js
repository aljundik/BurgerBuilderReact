import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import Order from '../../components/UI/Checkout/Order/Order';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: null,
        prices: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = +param[1];
            } 
            else {
            ingredients[param[0]] = +param[1];
                
            }
        };
        console.log('price is', price);

        this.setState({ingredients, prices: price});

    }

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
              ingredients={this.state.ingredients}
              clickedContinoue={this.continoueHandler}
              clickedCancel={this.cancelHandler}
            />
            <Route 
              path={`${this.props.match.url}/contact-data`} 
              render={(props)=> { return <ContactData {...props} price={this.state.prices} ingredients={this.state.ingredients} />}} />
          </div>
        )
    }
}

Checkout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.any,
    search: PropTypes.string,
    match: PropTypes.any,
}

export default Checkout;