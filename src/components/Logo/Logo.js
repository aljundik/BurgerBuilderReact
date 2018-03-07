import React from 'react';
import PropTypes from 'prop-types';

import classes from './Logo.css'
import Logo from '../../assets/images/burger-logo.png';

const logo = (props) => {
    return (
      <div className={classes.Logo} style={{height: props.height}} >
        <img src={Logo} alt='' />
      </div>
    )
}

logo.propTypes = {
  height: PropTypes.string
}

export default logo;