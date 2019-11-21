import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Encrypter from './Components/main'


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color:'#242424',fontFamily:'Roboto',fontSize:30,fontWeight:'bold'}}>Hi</Text>
      <Text style={{color:'#242424',fontFamily:'Roboto',fontSize:20, fontWeight:'bold'}}>Welcome Again!</Text>
      <Encrypter/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
    paddingTop: 50,
    paddingLeft:5
    
    
  },
});
