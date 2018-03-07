import React, { Component }  from 'react';
import Aux from '../Aux/Aux';
import PropTypes from 'prop-types';
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
    return (
      <Aux>
        <Toolbar toggleButton={this.DrawerToggleButtonHandler} />
        <SideDrawer show={this.state.backDropStatus} closed={this.backDropCloseHandler} />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};


Layout.propTypes=  {
    children: PropTypes.node
}

export default Layout;