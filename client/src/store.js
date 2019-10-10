import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
// import { syncHistoryWithStore } from 'react-router-dom';
// import { browserHistory } from 'react-router';

const initialState = {};
// if (localStorage.getItem('cartItems')) {
//   initialState.cart = { items: JSON.parse(localStorage.getItem('cartItems')) };
// }

export const store = createStore(
  rootReducer,

  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
