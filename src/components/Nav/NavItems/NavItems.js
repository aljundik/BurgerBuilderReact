import React from 'react';
import PropTypes from 'prop-types'
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navitems =  (props) => {
  const authintcated = props.isAuth ?  <NavItem link='/logout'>Logout </NavItem> : <NavItem link='/auth'>Auth </NavItem>
    return (
      <div>
        <ul className={classes.NavItems}>
          {props.isAuth ?<NavItem link='/orders'>Orders </NavItem> : null }
          <NavItem  link='/'>Burger Builder </NavItem>
          {authintcated }
        </ul>
      </div>
    )
}

navitems.propTypes = {
  isAuth: PropTypes.bool
}

export default navitems;