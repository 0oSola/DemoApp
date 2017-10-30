'use strict';

import { AsyncStorage, NetInfo, NativeModules, Platform } from 'react-native';
import { IsDev } from './CommonUtils';
import { ENVIRONMENT_LIST,HOST } from '../Constants/Config';
import { toastShort, toastLong } from '../Utils/ToastUtil';

import {version} from '../Constants/Config';
import DeviceInfo from 'react-native-device-info';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
const EventEmitter = RCTDeviceEventEmitter;

function getHost(env) {
  return ENVIRONMENT_LIST.filter((it, index) => (it.env == env))[0];
}

if (global.sm_env != 'PA') {
  EventEmitter.addListener('switchEnvironment', (clearFlag) => {
    if(clearFlag){
      host = HOST;
    }else{
      host = (global.sm_env == 'LOCAL') ? global.sm_env_localhost : getHost(global.sm_env).host;
    }
  });
}

let now_token = null;
let net_status = null;

let host = HOST;

let parseParam = function (param) {
  let paramStr = '';
  for (let key in param) {
    paramStr += '&' + key + '=' + encodeURIComponent(param[key]);
  }
  return paramStr.substr(1);
};


AsyncStorage.getItem('token').then((data) => {
  now_token = data;
});


//断网判断
function handleFirstConnectivityChange(reach) {
  console.log('network change: ' + reach);
  net_status = reach;
  if (reach.toUpperCase() === 'NONE' || reach.toUpperCase() === 'UNKNOWN') {
    toastShort('网络连接异常，请检查你的网络');
  }
}

if (Platform.OS === 'ios') {
  NetInfo.addEventListener(
    'change',
    handleFirstConnectivityChange
  );
}


export function putRequest(url, token, body) {
  let isOk = false;
  let p = Promise.race([
    new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        NetInfo.isConnected.fetch().done((isConnected) => {
          console.log('ios network status:' + (isConnected ? 'online' : 'offline'));
          if (!isConnected) {
            reject(new Error('request timeout'));
          }
        });
      } else {
        NativeModules.AesModule.isConnected((result) => {
          console.log('android network status:', result);
          if (result === 'false') {
            reject(new Error('request timeout'));
          }
        });
      }
    }),
    new Promise((resolve, reject) => {
      fetch(host + url, {
        method: 'PUT',
        headers: {
          'channel': 'mobile',
          'token': now_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((response) => {
        isOk = response.ok;
        return response.json();
      })
        .then((responseData) => {
          console.log('responseData is:', responseData);
          if (isOk) {
            if (responseData.code === 0) {
              resolve(responseData);
            } else {
              if (responseData.code === 690 || responseData.code === 401) {
                //Actions.login({ type: 'reset' });
                AsyncStorage.setItem('token','');
                toastShort('账号过期，请重新登录');
              } else if (responseData.code === 999) {
                console.log('error', responseData.message);
                toastShort('服务器开小差了');
              } else {
                toastShort(responseData.message);
              }
            }
          } else {
            reject(responseData);
          }
        });
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request post timeout')), 30000);
    })
  ]).catch((error) => {
    console.log('request failed error is:' + error.toString());
    let msg = '网络连接异常，请检查你的网络';
    if (error.code === 401 || error.code === 690) {
      msg = '账号过期，请重新登录';
      // //Actions.login({ type: 'reset' });
      // AsyncStorage.setItem('token','');
    }
    toastShort(msg);
  });
  return p;
}


// ---- basic request -----
export function getRequest(url, token, params) {

  let paramUrlString = '';
  if (params) {
    paramUrlString = parseParam(params);
    paramUrlString = '?' + paramUrlString;
  }

  console.log('paramUrlString is:' + host + url + paramUrlString);

  //console.log('token',now_token);
  let p = Promise.race([
    new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        NetInfo.isConnected.fetch().done((isConnected) => {
          console.log('ios network status:' + (isConnected ? 'online' : 'offline'));
          if (!isConnected) {
            reject(new Error('request timeout'));
          }
        });
      } else {
        NativeModules.AesModule.isConnected((result) => {
          console.log('android network status:', result);
          if (result === 'false') {
            reject(new Error('request timeout'));
          }
        });
      }
    }),
    new Promise((resolve, reject) => {

      fetch(host + url + paramUrlString, {
        headers: {
          'channel': 'mobile',
          'token': now_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then((response) => {
        return response.json();
      })
        .then((responseData) => {
          console.log(responseData);
          if (responseData.code != 0) {
            if (responseData.code === 690 || responseData.code === 401) {
              //Actions.login({ type: 'reset' });
              AsyncStorage.setItem('token','');
              toastShort('账号过期，请重新登录');
            } else if (responseData.code === 999) {
              console.log('error', responseData.message);
              toastShort('服务器开小差了');
            } else {
              toastShort(responseData.message);
            }
          }
          resolve(responseData);
        });
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request timeout')), 30000);
    })
  ]).catch((error) => {
    console.log('request failed error is:' + error.toString());
    let msg = '网络连接异常，请检查你的网络';
    if (error.code === 401 || error.code === 690) {
      msg = '账号过期，请重新登录';
      //Actions.login({ type: 'reset' });
      AsyncStorage.setItem('token','');
    }
    //白名单跳过消息报错
    if(url === '/apis/auth/app/user-message-new'){
      console.log('whiteListError:message-'+error.toString());
    }else{
      toastShort(msg);
    }
  });
  return p;
}


export function postRequest(url, token, body) {
  let isOk = false;
  console.log('request url is:' + url);
  if (!token) {
    //token = window.token;
    token = now_token;
  }

  console.log(token);
  let p = Promise.race([
    new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        NetInfo.isConnected.fetch().done((isConnected) => {
          console.log('ios network status:' + (isConnected ? 'online' : 'offline'));
          if (!isConnected) {
            reject(new Error('request timeout'));
          }
        });
      } else {
        NativeModules.AesModule.isConnected((result) => {
          console.log('android network status:', result);
          if (result === 'false') {
            reject(new Error('request timeout'));
          }
        });
      }
    }),
    new Promise((resolve, reject) => {
      fetch(host + url, {
        method: 'POST',
        headers: {
          'channel': 'mobile',
          'token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((response) => {
        isOk = response.ok;
        return response.json();
      })
        .then((responseData) => {
          console.log('responseData is:', responseData);
          if (isOk) {
            resolve(responseData);
            if (responseData.code === 0) {
              if (responseData.token) {
                AsyncStorage.setItem('token', responseData.token);
                AsyncStorage.setItem('userName', body.userName);
                now_token = responseData.token;
              }
            } else {
              if (responseData.code === 690 || responseData.code === 401) {
                //Actions.login({ type: 'reset' });
                AsyncStorage.setItem('token','');
                toastShort('账号过期，请重新登录');
              } else if (responseData.code === 999) {
                console.log('error', responseData.message);
                toastShort('服务器开小差了');
              } else {
                if (url.indexOf('check-gesture') < 0) {
                  toastShort(responseData.message);
                }
              }
            }
          } else {
            reject(responseData);
          }
        });
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request post timeout')), 30000);
    })
  ]).catch((error) => {
    console.log(error);
    let msg = '网络连接异常，请检查你的网络';
    if (error.code === 401 || error.code === 690) {
      msg = '账号过期，请重新登录';
      //Actions.login({ type: 'reset' });
      AsyncStorage.setItem('token','');
    }
    toastShort(msg);
  });
  return p;
}
