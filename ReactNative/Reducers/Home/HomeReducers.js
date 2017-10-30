'user strict';
import Immutable from 'immutable';
import * as types from '../../Constants/ActionTypes';

const initialState = Immutable.fromJS({
  loading : false,
  data : null
});

export default function handleFetchHome(state = initialState, action) {
  switch (action.type) {
  case types.BEGIN_FETCH_HOME:
    return state.set('loading', true);
  case types.FINISH_FETCH_HOME:
    return state.set('data',action.data).set('loading', true);
  default:
    return state;
  }
}
