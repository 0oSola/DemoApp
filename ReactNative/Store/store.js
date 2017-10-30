'use strict';

import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';
import Immutable from 'immutable';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);



export default function store() {
  const initialState = Immutable.Map();
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}