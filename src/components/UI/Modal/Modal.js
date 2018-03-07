import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';


const modal = (props) => {

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.backdropActive} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Aux>

  )

}

modal.propTypes = {
  children: PropTypes.node,
  backdropActive: PropTypes.func,
  show: PropTypes.bool

}


export default modal;