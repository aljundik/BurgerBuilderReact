import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.css';
import NavItems from './../NavItems/NavItems';
import Logo from './../../Logo/Logo';
import Aux from './../../../hoc/Aux/Aux';
import BackDrop from './../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {
    let combinedClasses = [classes.SideDrawer,classes.Close];
    if(props.show) {
        combinedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
      <Aux>
        <BackDrop show={props.show} clicked={props.closed} />
        <div className={combinedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo clicked={props.closed} />
          </div>
          <nav>
            <NavItems isAuth={props.isAuth} />
          </nav> 
        </div>
      </Aux>
    )
}

sideDrawer.propTypes = {
    closed: PropTypes.func,
    show: PropTypes.bool,
    isAuth: PropTypes.bool
}
export default sideDrawer;