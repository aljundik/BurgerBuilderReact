import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navitems =  () => {
    return (
      <div>
        <ul className={classes.NavItems}>
          <NavItem  link='/'>Burger Builder </NavItem>
          <NavItem link='/orders'>Orders </NavItem>
        </ul>
      </div>
    )
}


export default navitems;