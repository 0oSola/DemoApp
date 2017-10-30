'use strict';
import React, {Component} from 'react';
import { NetInfo,Platform,TouchableOpacity as Touable} from 'react-native';
import {DeviceHeight, DeviceWidth, IsIOS,getAdjustPx,formatNumber} from '../Utils/CommonUtils';
import {toastShort,toastLong } from '../Utils/ToastUtil';

/*var props = {
  netRequired:true||false, //按下执行前是否需要判断网络连接情况
  pressInterval:2000 //两次按下 响应的最小间隔
  disabledStyle:{}//不可点时的样式
}*/

export default class TouchableOpacity extends Component {
// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {

    };
    this.isActive = true;
  }
  static defaultProps = {
    pressInterval:1500,
  }
  handlePress = (e,callback)=>{
    if(this.isActive){

      if(this.props.netRequired){
        this.testNet(e,callback);
      }else{
        callback(e);
      }

      this.isActive = false;
      this.timer = setTimeout(()=>{
        this.isActive = true;
      },this.props.pressInterval);
    }
  };
  testNet = (e,callback)=>{
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected) {
        toastShort('网络连接异常，请检查你的网络');
      }else{
        callback(e);
      }
    });
  };

  render(){
    let props = {...this.props};
    let onPress = ()=>{};
    if(props.onPress && typeof props.onPress === 'function'){
      onPress = props.onPress;
    }
    delete props.onPress;
    return(
      <Touable
        style={this.props.disabledStyle?[{
        },this.props.style,this.props.disabledStyle]:[{
        },this.props.style]}
        onPress={(e)=>{this.handlePress(e,onPress);}}
        {...props}
      >{this.props.children}</Touable>
    );
  }
}
