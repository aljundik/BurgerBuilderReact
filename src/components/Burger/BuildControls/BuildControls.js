import React from 'react';
import PropTypes from 'prop-types';
import classes from './Buildcontrols.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'}
]


const BuildControls = (props) => {

    return (
      <div className={classes.BuildControls}>
        <p> The current price is <strong> {props.price.toFixed(2)}</strong></p>
        { controls.map(control => {
          return <BuildControl 
            label={control.label} 
            key={control.type} 
            more={()=>props.added(control.type)}
            less={()=>props.removed(control.type)}
            disable={props.disabledInfo[control.type]}
          />
        })}

        <button className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.activeCheckout}
        >Checkout Now!</button >
      </div>
    )

};

BuildControls.propTypes = {
    disabledInfo: PropTypes.object,
    price: PropTypes.number,
    purchasable: PropTypes.bool,
    activeCheckout: PropTypes.func
}

export default BuildControls;