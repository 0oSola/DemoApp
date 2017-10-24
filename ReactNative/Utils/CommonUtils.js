'use strict';

import { Dimensions, Platform, PixelRatio, NetInfo, NativeModules } from 'react-native';


export const DeviceHeight = Dimensions.get('window').height;
export const DeviceWidth = Dimensions.get('window').width;
export const DesignWidth = 750;
export const DesignHeight = 1334;
export const PxScale = DesignWidth / DeviceWidth;
export const PxScaleY = DesignHeight / DeviceHeight;

// eslint-disable-next-line
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}


export function isEmptyObject(obj) {
  for (let name in obj) {
    return false;
  }
  return true;
}

export function RenderIf(flag) {
  return function (viewContent) {
    return flag ? viewContent : null;
  };
}

//比例转化
export function getAdjustPx(px) {
  return PixelRatio.roundToNearestPixel(px) / PxScale;
}

//数字格式化
export function formatNumber(num, cent, isThousand) {
  // eslint-disable-next-line
  num = num.toString().replace(/\$|\,/g, '');

  // 检查传入数值为数值类型
  if (isNaN(num))
    num = '0';
  if (typeof num != 'number' && !isFinite(num)) {
    return '-';
  }

  // 获取符号(正/负数)
  let sign = (num == (num = Math.abs(num)));

  num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
  let cents = num % Math.pow(10, cent);       // 求出小数位数值
  num = Math.floor(num / Math.pow(10, cent)).toString();  // 求出整数位数值
  cents = cents.toString();        // 把小数位转换成字符串,以便求小数位长度

  // 补足小数位到指定的位数
  while (cents.length < cent)
    cents = '0' + cents;

  if (isThousand) {
    // 对整数部分进行千分位格式化.
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }

  if (cent > 0)
    return (((sign) ? '' : '-') + num + '.' + cents);
  else
    return (((sign) ? '' : '-') + num);
}

export const IsDev = true;