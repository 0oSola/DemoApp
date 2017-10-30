'use strict';
import React, {PureComponent} from 'react';
import { Text } from 'react-native';

export default class TextWrapper extends PureComponent {
  render(){
    return(
      <Text
        allowFontScaling={false}
        style={[{
          textAlignVertical: 'center',
          includeFontPadding: false,
          backgroundColor:'transparent'
        },this.props.style]}
      >{this.props.children}</Text>
    );
  }
}
