import React, { Component } from 'react';
import classes from './BurgerIng.css';
import PropTypes from 'prop-types';


class BurgerIng extends Component {
    

    render (){
        let ing = null;

        switch(this.props.type){
            case('bread-bottom'): 
                ing = <div className={classes.BreadBottom} />;
                break;
    
            case('bread-top'): 
                ing =( 
                  <div className={classes.BreadTop}>
                    <div className={classes.Seeds1} />
                    <div className={classes.Seeds2} />
                  </div>);
                break;
    
            case('meat'): 
                ing = <div className={classes.Meat} />;
                break;
    
            case('cheese'): 
                ing = <div className={classes.Cheese} />;
                break;
    
            case('salad'): 
                ing = <div className={classes.Salad} />;
                break;
    
            case('bacon'): 
                ing = <div className={classes.Bacon} />;
                break;
    
            default: ing = null; 

            
        }
        return ing;
    }
   
}

BurgerIng.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIng;