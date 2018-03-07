import React, { Component } from 'react';
import classes from './Burger.css';
import BurgerIng from './BurgerIng/BurgerIng';
import PropTypes from 'prop-types';



const burger = props => {

   let transformIngredients = Object.keys(props.ingredients).map(ingKey => {
       return [...Array(props.ingredients[ingKey])].map((_,i) => {
           return <BurgerIng key={ingKey+i} type={ingKey} />
       })
   }).reduce((prev,curr) => {
       return prev.concat(curr);
   },[]);

    transformIngredients = transformIngredients.length >0 ? transformIngredients : <p>Please Add to the burger</p>;
    return(
      <div className={classes.Burger}>
        <BurgerIng 
          type='bread-top'
          />
        {transformIngredients}
        <BurgerIng 
          type='bread-bottom'
        />
      </div>
    );
}

burger.propTypes = {
    ingredients: PropTypes.object,
}
export default burger;