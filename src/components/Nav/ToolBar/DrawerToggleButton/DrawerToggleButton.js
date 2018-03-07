import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggleButton.css';


const drawerToggleButton = (props) => {
    return (
      <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div />
        <div />
        <div />
      </div>
    )
}

drawerToggleButton.propTypes={
    clicked: PropTypes.func
}

export default drawerToggleButton;

