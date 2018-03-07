import React from 'react';
import PropTypes from 'prop-types';
import Burger from '../../../Burger/Burger';
import Button from '../../Button/Button';
import {withRouter} from 'react-router-dom'



const order = (props) => {
    return(
      <div style={{textAlign: 'center', marginBottom: '10px'}}>
        <h1> We hope you enjory our burger</h1>
        <Burger ingredients={props.ingredients} />

        <Button
          btnType='Danger'
          clicked={props.clickedCancel}        
        > CANCEL</Button>

        <Button
          btnType='Success'
          clicked={props.clickedContinoue}
        > CONTINOUE </Button>      
      </div>
    )
}

order.propTypes = {
    clickedCancel: PropTypes.func,
    clickedContinoue: PropTypes.func,
    ingredients: PropTypes.object
}

export default withRouter(order);