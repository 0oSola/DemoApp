'use strict';
import * as Types from '../../Constants/ActionTypes';
import * as Service from '../../Utils/Services';

export function fetch() {
  return dispatch => {
    dispatch(beginFetchHome());
    Service.getHomeList()
      .then(result => {
        dispatch(finishFetchHome(result));
      });
  };
}

function beginFetchHome() {
  return {
    type: Types.BEGIN_FETCH_HOME,
  };
}

function finishFetchHome(result) {
  let data = null;
  if(result){
    let data = result.data;
  }
  return {
    type: Types.FINISH_FETCH_HOME,
    data: data
  };
}
