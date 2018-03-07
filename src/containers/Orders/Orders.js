import React, {Component} from 'react';
import PropTypes from 'prop-types';

import axios from '../../axios-orders';
import Order from './Order/Order';
import withError from '../../hoc/WithError/WithError';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders:[],
        loading: false
    }

    
    componentDidMount(){
        this.setState({
            loading: true
        })
        const arr= [];
        axios.get( 'https://reactburger-63715.firebaseio.com/order.json' )
        .then( response => {

            for(let item in response.data){
                 arr.push({
                     ...response.data[item],
                     id: item
                 });

            }
            
           //console.log(arr);
           this.setState({
            orders: [...arr],
            loading:false
            });

         
        } )
        .catch( error => {
            this.setState({
                loading: false
            });
        } );

       // console.log('the orders from server are :', this.state.orders);
    }



    render(){   
        let ord =  this.state.orders === null ? <Spinner /> :(this.state.orders.map(order => {
            return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
          })) ;
          console.log(this.state.orders);
        return(
          <div> 
            {ord}
          </div>
        )
    }
}

export default Orders;