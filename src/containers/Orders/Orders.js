import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import axios from '../../axios-orders';
import Order from './Order/Order';
import withError from '../../hoc/WithError/WithError';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrder } from '../../store/actions/order';

class Orders extends Component {
    
    componentDidMount(){

        this.props.onFetchOrder();
        // const arr= [];
        // axios.get( 'https://reactburger-63715.firebaseio.com/order.json' )
        // .then( response => {
        //     for(let item in response.data){
        //          arr.push({
        //              ...response.data[item],
        //              id: item
        //          });
        //     }
        //    //console.log(arr);
        //    this.setState({
        //     orders: [...arr],
        //     loading:false
        //     });
        // } )
        // .catch( error => {
        //     this.setState({
        //         loading: false
        //     });
        // } );

       // console.log('the orders from server are :', this.state.orders);
    }



    render(){   

        let ord = <Spinner />
        console.log('this.props.orders',this.props.orders);
        if(this.props.orders) {
             ord =  this.props.orders === null ? <Spinner /> :(this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
              })) ;

        }

          
        return(
          <div> 
            {ord}
          </div>
        )
    }
}

Orders.propTypes = {
    onFetchOrder: PropTypes.func,
    orders: PropTypes.any
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => {
            dispatch(fetchOrder());
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (Orders);