'use strict'

import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {StatusBar,View} from 'react-native';
import store from './Store/store';
import Navigation from  './Navigation/Navigation';

const storeInstance = store();

class App extends Component {

    constructor(props){
      super(props);
      this.state = {
      }
    }

  render() {
    return (
      <Provider store = {storeInstance}>
        <View style={{flex:1,backgroundColor:'black'}}>
          <StatusBar barStyle='dark-content'
           animated={true}/>
          <Navigation />
        </View>
      </Provider>
    )
  }
}

export default App
