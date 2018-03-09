import React, { Component }  from 'react';
import Aux from '../Aux/Aux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import classes from './Layout.css'; 
import Toolbar from '../../components/Nav/ToolBar/ToolBar';
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    backDropStatus: false
  }

  backDropCloseHandler =() => {
    this.setState({backDropStatus: false});
  }  

  DrawerToggleButtonHandler =() => {
    this.setState((prevState) => {
      return {backDropStatus: !prevState.backDropStatus}
    })
  }  

  render() {
    console.log(this.props.isAuth);
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuth} toggleButton={this.DrawerToggleButtonHandler} />
        <SideDrawer isAuth={this.props.isAuth} show={this.state.backDropStatus} closed={this.backDropCloseHandler} />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};


Layout.propTypes=  {
    children: PropTypes.node,
    isAuth: PropTypes.bool
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(Layout));