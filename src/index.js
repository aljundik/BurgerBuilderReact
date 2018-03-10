import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { BrowserRouter  } from "react-router-dom";

import BurgerReducer from './store/reducers/burgerBuilder';
import OrderReducer from './store/reducers/order';
import AuthReducer from './store/reducers/auth';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


 const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
 
 const rootReducer = combineReducers({
   burgerBuilder: BurgerReducer,
   order: OrderReducer,
   auth: AuthReducer
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
