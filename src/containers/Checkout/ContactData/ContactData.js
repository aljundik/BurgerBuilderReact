import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {postOrder} from '../../../store/actions/order';



class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                shouldValidate: true,                
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false                
            },
            steet: {
                elementType: 'input',
                shouldValidate: true,                
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false                                
                
            },
            zipCode: {
                elementType: 'input',
                shouldValidate: true,                
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false                                
            },
            email: {
                elementType: 'input',
                shouldValidate: true,
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false                
                
            },
            deliveryMethod: {
                elementType: 'select',
                shouldValidate: false,
                validation:{
                    required: false
                },
                value:'fastest',
                touched:false,                
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' }, {
                            value: 'cheapest',
                            displayValue: 'cheapest'
                        }
                    ]
                }
            },
        },
        loading: false
    }

    submitHandler = (e) => {
        e.preventDefault();
        //this.setState({ loading: true });
        const formData= {};
        for (let ele in this.state.orderForm) {
            formData[ele]= this.state.orderForm[ele].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        this.props.onPostOrder(order);

        this.props.history.push('/');

    }
    changeHandler= (event,id) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[id]};


        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;

        
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,
            updatedFormElement.validation);
            updatedOrderForm[id] = updatedFormElement;
        
        this.setState({orderForm: updatedOrderForm});

    }

    checkValidity = (value, rules)=> {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
          <form onSubmit={this.submitHandler}>
            {formElementsArray.map(formElement => {
                console.log(formElement);
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
          </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
          <div className={classes.ContactData}>
            <h1> please fill in the form</h1>
            {form}
          </div>
        );
    }
}

ContactData.propTypes = {
    ingredients: PropTypes.object,
    price: PropTypes.number,
    history: PropTypes.any,
    onPostOrder: PropTypes.func,
    loading: PropTypes.bool
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostOrder: (order) => {
            dispatch(postOrder(order));
        } 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);