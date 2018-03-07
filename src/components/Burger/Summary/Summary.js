import React from 'react' 
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';

const summary = (props) => {
    const ingredients = {...props.ingredients};

    const summaryOrder = Object.keys(ingredients).map(ingKey=>{
      return <li key={ingKey}>{ingKey} : {ingredients[ingKey]}</li>
    });

    return (
      <div> 
        <h3>The summary of your order is as follows:</h3>
        <ul>
          {summaryOrder}
        </ul>
        <p>you order price is {props.price.toFixed(2)}</p>
        <p> Do you want to continue? </p>
        <Button clicked={props.clickedContinue} btnType='Danger'>CONTINUE</Button>
        <Button clicked={props.clickedCancel} btnType='Danger'>Cancel</Button>
      </div>
    )
}

summary.propTypes = {
    ingredients: PropTypes.object,
    clickedContinue: PropTypes.func,
    clickedCancel: PropTypes.func,
    price: PropTypes.number

}

export default summary;