'use strict';

import {
  localHost
} from './LocalHost';
import {
  QAHost
} from './QAHost';

import {AsyncStorage} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {toastShort} from '../Utils/ToastUtil';
import EventEmitter from 'EventEmitter';

let environment = 'PP'; //QA/IT/PA/PP


if(environment==''){
  environment = 'LOCAL';
}
let env_list = [{
  env: 'QA',
  host: QAHost,
  android_url: 'https://tako.im/fvvg',
  ios_url: 'https://tako.im/s2t9'
}, {
  env: 'LOCAL',
  host: localHost,
  android_url: 'https://tako.im/fvvg',
  ios_url: 'https://tako.im/s2t9'
}];

if(environment != 'PA'){
  AsyncStorage.multiGet(['sm_env','sm_env_localhost']).then((re)=>{
    let sm_env = re[0][1];
    let sm_env_localhost = re[1][1];
    if(sm_env && sm_env === 'LOCAL'){
      global.sm_env = sm_env;
      global.sm_env_localhost = sm_env_localhost;
      EventEmitter.emit('switchEnvironment');
      toastShort('当前环境固化为 LOCAL IP：'+ sm_env_localhost);
    }else if(sm_env ){
      global.sm_env = sm_env;
      EventEmitter.emit('switchEnvironment');
      toastShort('当前环境固化为 '+ sm_env);
    }
  });
}


let cur_env = env_list.filter((it, index) => (it.env == environment))[0];
global.sm_env = global.sm_env ? global.sm_env : environment;
global.sm_env_localhost = cur_env.host;

export const HOST = cur_env.host;
export const ANDROID_URL = cur_env.android_url;
export const IOS_URL = cur_env.ios_url;

export const version = DeviceInfo.getVersion();
export const ANDROID_CODE_PUSH_LABEL = 'v29';
export const IOS_CODE_PUSH_LABEL = 'v32';

export const ENVIRONMENT_LIST = env_list;
