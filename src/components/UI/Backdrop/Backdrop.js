import React from 'react';
import classes from './Backdrop.css';
import PropTypes from 'prop-types';


const backdrop = (props) => {
 
    return (
        props.show ? (<div onClick={props.clicked} className={classes.BackDrop} />) : null
    );
}

backdrop.propTypes = {
    clicked: PropTypes.func,
    show: PropTypes.bool

}

export default backdrop;