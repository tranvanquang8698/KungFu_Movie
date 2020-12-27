import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {link: ''};
  }
  componentDidMount = async () => {
    let value = await AsyncStorage.getItem('linkHomePage');
    if (value === null) {
      await AsyncStorage.setItem('linkHomePage', 'https://google.com');
      this.setState({link: 'https://google.com'});
    } else {
      this.setState({link: value});
    }
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <WebView
          source={{
            uri: 'https://www.hhkungfu.tv/',
          }}
          style={{flex: 1}}
        />
      </View>
    );
  }
}
