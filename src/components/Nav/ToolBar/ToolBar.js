import React from 'react';
import PropTypes from 'prop-types';
import classes from './ToolBar.css';
import Logo from './../../Logo/Logo';
import NavItems from './../NavItems/NavItems';
import DrawerToggleButton from './DrawerToggleButton/DrawerToggleButton';


const toolbar = (props) => {
  return(
    <header className={classes.ToolBar}>
      <DrawerToggleButton clicked={props.toggleButton} />
      <Logo height='76%' /> 
      <nav className={classes.DesktopOnley}>
        <NavItems isAuth={props.isAuth} />    
      </nav>    
    </header>
  )
}


toolbar.propTypes = {
  toggleButton: PropTypes.func,
  isAuth: PropTypes.bool
}
export default toolbar;