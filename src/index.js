import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { BrowserRouter  } from "react-router-dom";

import BurgerReducer from './store/reducers/burgerBuilder';
import OrderReducer from './store/reducers/order';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
 const rootReducer = combineReducers({
   burgerBuilder: BurgerReducer,
   order: OrderReducer
 });
 
 
 const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
 
 , document.getElementById('root'));
registerServiceWorker();
