import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { auth } from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state= {
        authForm: {
            email: {
                elementType: 'input',
                shouldValidate: true,                
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false                
            },
            password: {
                elementType: 'input',
                shouldValidate: true,                
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    reqcosntuired: true
                },
                valid:false,
                touched:false                
            }
    },
    isSignedUp: true
}
    checkValidity = (value, rules)=> {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }

        return isValid;
    }

    changeHandler = (event, controlName) => {
        const updatedControles = {
            ...this.state.authForm,
            [controlName]: {
                ...this.state.authForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.authForm[controlName].validation),
                touched: true,
            }
        };
        this.setState({authForm: updatedControles});
    }

    submitHandler = (e)=> {
        e.preventDefault();
        this.props.onAuth(this.state.authForm.email.value,
            this.state.authForm.password.value,
            this.state.isSignedUp   
        );

    }

    handleSwitch = (e)=> {
        this.setState(prevState=> {
            return {isSignedUp: !prevState.isSignedUp}
        })
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }

        let error = this.props.error ? (<p> {this.props.error}</p>) : null;

        let formAuth = (

          <form onSubmit={this.submitHandler}>
            {formElementsArray.map(formElement => {

            return (
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.elementConfig.placeholder}
                key={formElement.id}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.shouldValidate && formElement.config.touched}
                changed={(event)=>this.changeHandler(event, formElement.id)}
                />)
  
                  })
                  }
            <Button
              btnType='Success'
              >Submit</Button>
            <Button
              btnType='Danger'
              clicked={this.handleSwitch}
              > {this.state.isSignedUp ? 'Switch to sign in': 'Switch to Sign up'}</Button>
          </form>
          );

          if(this.props.loading) {
              formAuth = <Spinner />
          }


        return (
          <div className={classes.ContactData}> 
            { error }          
            {formAuth}
          </div>
        )
    }



}


Auth.propTypes = {
    onAuth: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.any
}

const mapStateTopProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password, isSignedUp) => {
            dispatch(auth(email,password,isSignedUp));
        } 
    }
}


export default connect(mapStateTopProps, mapDispatchToProps)(Auth);