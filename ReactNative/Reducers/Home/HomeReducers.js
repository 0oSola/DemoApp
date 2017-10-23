'user strict'

import * as types from '../../Constants/ActionTypes';

const initialState = {
  loading : false,
  data : {}
};

export default function handleFetchHome(state = initialState, action) {
    switch (action.type) {
       case types.BEGIN_FETCH_HOME:
           return Object.assign({}, state, {
                loading: true
           });
       case types.FINISH_FETCH_HOME:
           return Object.assign({}, state, {
                loading: false,
                data: action.data
           });
       default:
           return state;
    }
}
