'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  InteractionManager,
} from 'react-native';



export default class Splash extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      selected: (new Map(): Map<string, boolean>)
    };

  }


  componentDidMount() {
    const { navigate } = this.props.navigation;
    navigate('Home')
  }



  render() {
    return (
      <View></View>);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


