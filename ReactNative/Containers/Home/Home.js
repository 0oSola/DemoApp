'use strict';
import React, { Component,PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Button,
  FlatList,
  Dimensions,
  NativeModules,
  InteractionManager,
} from 'react-native';

import Text from './../../CommonComponent/TextWrapper';
import TouchableOpacity from './../../CommonComponent/TouchableOpacity';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map} from 'immutable';
import * as homeActions from '../../Actions/Home/HomeAction';

class Home extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
    this.navigate = props.navigation.navigate;
  }

  componentDidMount() {
    this.props.actions.fetch();
  }

  _keyExtractor = (item, index) => index;

  //{ navigation }
  static navigationOptions = () => {
    return ({
      title: 'Home'
    });
  };

  GotoNative=()=>{
    InteractionManager.runAfterInteractions(()=> {
      if (Platform.OS === 'ios') {
        NativeModules.PushNative.RNOpenOneVC('测试');
      }else{
        NativeModules.BrigdeModule.rnCallNative();
      }
      
    });
  }

  _renderItem = ({item}) => {
    return (
      <ListItem
        id={item.name}
        title={item.name}
      />
    );
  };

  _onPress = ()=>{
    this.navigate('Detail');
  }

  render() {
    const data = this.props.home.get('data');
    let main = this.props.home.getIn(['data','main']);
    let listView = null;

    if(main){
      listView = <FlatList
        data={main.toJS()}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />;
    }
    return (
      <View style={styles.container}>
        <Button
          onPress={this._onPress}
          title="Detail>>"
        />
        {/*<TouchableOpacity onPress={this.GotoNative}>
          <Text style={styles.welcome}>
            跳转到原生
          </Text>
        </TouchableOpacity>*/}
        {listView}
      </View>
    );
  }
}


class ListItem extends PureComponent {

  _onPress = () => {
    //alert(this.props.id);
  };

  render() {
    const DeviceWidth = Dimensions.get('window').width;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{flex:1,justifyContent:'center',width:DeviceWidth,borderBottomColor:'rgba(0,0,0,0.3)',paddingLeft:20,borderBottomWidth:1,height:60,backgroundColor:'#fff'}}>
          <Text>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
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

function mapStateToProps(state) {
  const {home} = state.toObject();
  return { home };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

