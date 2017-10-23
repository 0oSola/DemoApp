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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../../Actions/Home/HomeAction';


class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return ({
      title: `Home`,
    })
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

  constructor(props) {
    super(props);
  
    this.state = {
      selected: (new Map(): Map<string, boolean>)
    };

  }

  _keyExtractor = (item, index) => item.id;

  componentDidMount() {
    this.props.actions.fetch();
  }


  _renderItem = ({item}) => {
    return (
      <MyListItem
        id={item.name}
        selected={!!this.state.selected.get(item.id)}
        title={item.name}
      />
    )
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/*<Button
          onPress={() => navigate('Detail')}
          title="Detail>>"
        />*/}
        <TouchableOpacity onPress={this.GotoNative}>
          <Text style={styles.welcome}>
            跳转到原生
          </Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.home.data.main}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />

      </View>
    );
  }
}

class HomeList extends Component{

}

class MyListItem extends Component {
  _onPress = () => {
    alert(this.props.id);
  };

  render() {
    const DeviceWidth = Dimensions.get('window').width;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{flex:1,justifyContent:'center',width:DeviceWidth,borderBottomColor:'rgba(0,0,0,0.3)',paddingLeft:20,borderBottomWidth:1,height:60,backgroundColor:'#fff'}}>
          <Text>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
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
  const {home} = state;
  return { home };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

