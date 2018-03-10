import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { auth, setAuthRedirectPath } from '../../store/actions/auth';
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


    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }
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
                type={formElement.config.elementConfig.type}
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

          </form>
          );

          if(this.props.loading) {
              formAuth = <Spinner />
          }
          let authRedirect = null;
          if(this.props.isAuthenticated) {
              authRedirect = <Redirect to={this.props.authRedirectPath} />
          }

        return (
          <div className={classes.ContactData}> 
            {authRedirect}
            { error }          
            {formAuth}
            <Button
              btnType='Danger'
              clicked={this.handleSwitch}
              > {this.state.isSignedUp ? 'Switch to sign in': 'Switch to Sign up'}</Button>
          </div>
        )
    }



}


Auth.propTypes = {
    onAuth: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.any,
    isAuthenticated: PropTypes.bool,
    building: PropTypes.bool,
    authRedirectPath: PropTypes.string
}

const mapStateTopProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password, isSignedUp) => {
            dispatch(auth(email,password,isSignedUp));
        },
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')) 
    }
}


export default connect(mapStateTopProps, mapDispatchToProps)(Auth);