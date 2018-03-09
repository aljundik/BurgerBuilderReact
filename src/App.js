import React, { Component } from 'react'; // eslint-disable-line
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Orders from '../src/containers/Orders/Orders';
import Auth from '../src/containers/Auth/Auth';
import Logout from '../src/containers/Auth/Logout/Logout';
import {authCheckState} from '../src/store/actions/auth';


class App extends Component {
  componentDidMount(){
    this.props.onAuthCheck();
  }

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />            
            <Route path='/logout' component={Logout} /> 
            <Route  path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

App.propTypes = {
  onAuthCheck: PropTypes.func
}
const mapDispatchToProps= dispatch => {
  return {
    onAuthCheck: () => {
      dispatch(authCheckState());
    }
  }
}

export default connect(null,mapDispatchToProps)(App);
