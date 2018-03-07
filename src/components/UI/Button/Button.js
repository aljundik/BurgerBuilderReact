import React from 'react';
import classes from './Button.css';
import PropTypes from 'prop-types';


const button = (props) => {
    return (
      <button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked} > 
        {props.children}
      </button>
    );
}

button.propTypes = {
    children: PropTypes.node,
    btnType: PropTypes.string,
    clicked: PropTypes.func

}


export default button;