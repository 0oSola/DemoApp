'use strict'

import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function store(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);
	return store;
}