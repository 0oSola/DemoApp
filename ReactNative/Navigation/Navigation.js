'use strict';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Splash from '../Splash';
import Home from '../Containers/Home/Home';
import Detail from '../Containers/Detail/Detail';

const Navigation = StackNavigator({
  Splash: {
    screen: Splash,
  },
  Home: {
    screen: Home,
  },
  Detail: {
    screen: Detail,
  }
});

export default Navigation;