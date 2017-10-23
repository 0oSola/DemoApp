'use strict';

//import {putRequest,getRequest,postRequest} from './HttpUtils';
import {IsDev} from '../Utils/CommonUtils';
import {Platform} from 'react-native';

/*
 param: 无
 method: get
 url: /apis/auth/app/home-info
 desc: 获取主页信息
*/
export function getHomeList(){

  if(IsDev){
    return mockResult(require('../Mock/Home/Home.json'));
  }

  let url = '/apis/auth/app/home-info';
  //return getRequest(url,null);
}


/*
 mock for dev
 */
function mockResult(result) {
  return new Promise((resolve,reject)=>{
    resolve({code:0,data:result});
  })
}