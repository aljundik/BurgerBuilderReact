import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.css';

const input = (props) => {
    let inputEelment = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate){
        inputClasses.push(classes.Invalide);
    }


    switch(props.elementType) {  

        case ('input'):
        inputEelment= <input 
          className={inputClasses.join(' ')} 
          onChange={props.changed}          
          {...props.elementconfig} 
          
          placeholder={props.value} />;
            break;

        case ('textarea'):
        inputEelment= <textarea 
          className={inputClasses.join(' ')}
          onChange={props.changed}           
          {...props.elementconfig} 
          
          placeholder={props.value} />;
            break;
            
        case ('select'):
        inputEelment= <select 
          className={inputClasses.join(' ')} 
          {...props.elementconfig} 
          placeholder={props.value}
          onChange={props.changed}
          > 
          {props.elementConfig.options.map(option => {
              return (
                <option  
                  onChange={props.changed}     
                  key={option.value} value={option.value} > {option.displayValue} </option>
              )
          })}
        </select>;
            break;

        default:
        inputEelment= <input 
          className={classes.InputElement}
          onChange={props.changed}
           
          {...props.elementconfig}
           
          placeholder={props.value} />;
            break;
    }
   return ( 
     <div className={classes.Input}>
       <label className={classes.Label}>{props.name}</label>
       {inputEelment}
     </div>
    )
}

input.propTypes ={
    name: PropTypes.string,
    elementType: PropTypes.string,
    elementconfig: PropTypes.any,
    value: PropTypes.string,
    elementConfig: PropTypes.any,
    changed: PropTypes.func,
    invalid: PropTypes.bool,
    shouldValidate: PropTypes.bool

}

export default input;