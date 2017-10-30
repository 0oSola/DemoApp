'use strict';

import Toast from 'react-native-root-toast';
let toast;

export const toastShort = (content) => {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,
    backgroundColor:'rgba(0,0,0,0.6)',
    position: -80,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};

export const toastLong = (content) => {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.LONG,
    backgroundColor:'rgba(0,0,0,0.6)',
    position: -80,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};
