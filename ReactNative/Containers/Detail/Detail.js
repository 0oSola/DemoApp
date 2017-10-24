'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class Details extends Component {

  static navigationOptions = {
    title: 'Details',
  };

  componentWillUnmount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Details to React Native!
        </Text>
      </View>
    );
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
