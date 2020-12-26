import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from './App';
import reportWebVitals from './reportWebVitals';
import counterReducer from "./store/reducers/counter"
import resultReducer from "./store/reducers/result"

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});

const logger = (store:any) => {
  return (next:any) => {
    return (action:any) => {
      console.log("[Middleware] Dispatching ", action);
      const result = next(action);
      console.log("[Middleware] next state ",store.getState());
      return result;
    }
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
