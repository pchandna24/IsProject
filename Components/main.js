import * as React from 'react';
import { Button, Image, View, Text, ActivityIndicator, Alert } from 'react-native';

import Constants from 'expo-constants';




export default class Encrypter extends React.Component{
    state={
        text:null,
        data:null
    }
    render() {
        l
    
        return (
          <View style={{ flex: 1,paddingTop:100, alignItems:'center',}}>
            <input type="text" id="name" value={this.state.text} onChange={ (e) => this.handleNameOnChange(e) } />
           
          </View>
        );
      }
}