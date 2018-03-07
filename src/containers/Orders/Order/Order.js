import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './Order.css';

const order = (props) => {
    const ke = Object.keys(props.ingredients).map( n => {
        return <p key={n}>{n}: {props.ingredients[n]} </p>
    })
    return (
      <div className={classes.Order}>
        <h3> Your orders details are: </h3>
        {ke}
        <p>Price: <strong> USD {props.price.toFixed(2)}</strong></p>
      </div>
    );
}

order.propTypes ={
    price: PropTypes.any,
    ingredients: PropTypes.object
}
export default order;