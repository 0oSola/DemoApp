'use strict';
import {combineReducers} from 'redux';
import home from './Home/HomeReducers';
import {AsyncStorage} from 'react-native';

const appReducer = combineReducers({
  home
});


const rootReducer = (state, action) => {
  if (action.type === 'INIT_REDUX') {
    state = undefined;
    AsyncStorage.setItem('token','');
  }

  return appReducer(state, action);
};


export default rootReducer;