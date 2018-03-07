import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';


const BuildControl = (props) => {

    return (
      <div className={classes.BuildControl}>
        <div  className={classes.Label}> {props.label}</div>
        <button  onClick={props.less} className={classes.Less} 
          disabled={props.disable}>Less</button>
        <button  onClick={props.more} className={classes.More}> More</button>
      </div>
    )


};

BuildControl.propTypes = {
    label: PropTypes.string.isRequired,
    more: PropTypes.func,
    less: PropTypes.func,
    disable: PropTypes.bool
}
export default BuildControl;