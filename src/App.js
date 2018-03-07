import React, { Component } from 'react'; // eslint-disable-line
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Orders from '../src/containers/Orders/Orders';


class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        </Layout>
      </Router>
      
    );
  }
}

export default App;
