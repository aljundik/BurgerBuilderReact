import React from 'react';
import classes from './NavItem.css';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';


const navitem =  (props) => {
    return (
      <li className={classes.NavItem} > 
        <NavLink
          exact
          className={props.active ? classes.active : null}
          to={props.link}>{props.children}
        </NavLink>
      </li>
    )
}


navitem.propTypes = {
    link: PropTypes.string,
    children: PropTypes.node,
    active: PropTypes.bool
}

export default navitem;