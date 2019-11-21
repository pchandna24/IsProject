import * as React from 'react';
import { Button, Image, View, Text, ActivityIndicator, Alert,TextInput, Dimensions, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height






export default class Encrypter extends React.Component{
    state={
        text:null,
        data:null,
        type:'encoding',
        image:null,
        isUploading:false,
    }
    render() {
        let{image}= this.state;
        
        if(this.state.type == "encoding"){
            return (
                <View style={{ flex: 1,paddingTop:30, alignItems:'center'}}>
                <View style={{backgroundColor:'#828282',height:580,width:350,borderRadius:20}}>
                <TextInput placeholder="Enter text" style={{height: 40, width:350, borderWidth: 0,top:30,textAlign:'center',color:'white'}} onChangeText={(text) => this.setState({text: text})}/>
                {
                this.state.isUploading && <ActivityIndicator/>
                }
                <Text style={{padding:20,color:'white',backgroundColor:'#A9A9A9',fontFamily:'Roboto',fontSize:15,marginBottom:80,top:50,textAlign:'center'}} onPress={this._pickImage}>
                Pick an Image from Camera Roll
                </Text>
                <Text style={{alignItems:'center',textAlign:'center',width:350,fontWeight:"bold",fontSize:15,backgroundColor:'#404040',height:50,paddingTop:15,color:'white'}} onPress={this.meraDost}>Upload</Text>
                {image &&
                <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}

                <TouchableOpacity
                style={{
                    position:'absolute',
                    top:0,
                    
                    
                }}
                onPress={()=>{
                    if(this.state.type == "encoding"){
                        this.setState({
                            type:'decoding'
                        })
                    }else{
                        this.setState({
                            type:'encoding'
                        })
                    }
                }}>
                    <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center',width:350}}>Decode</Text>
                </TouchableOpacity>
                </View>
                
                 
                </View>
              );
        }
        return (
          <View style={{ flex: 1,paddingTop:30, alignItems:'center'}}>
          <View style={{backgroundColor:'#828282',height:580,width:350,borderRadius:20}}>
          <TextInput placeholder="Enter Key" style={{height: 40,width:350, borderColor: 'gray', borderWidth: 0,top:30,textAlign:"center",color:'white'}} onChangeText={(text) => this.setState({text: text})}/>
          {
                this.state.isUploading && <ActivityIndicator/>
                }
                <Text style={{padding:20,color:'white',backgroundColor:'#A9A9A9',fontFamily:'Roboto',fontSize:15,marginBottom:80,top:50,textAlign:'center'}} onPress={this._pickImage}>
                Pick an Image from Camera Roll
                </Text>
                <Text style={{alignItems:'center',textAlign:'center',width:350,fontWeight:"bold",fontSize:15,backgroundColor:'#404040',height:50,paddingTop:15,color:'white'}} onPress={this.meraDost}>Upload</Text>
                <View style={{marginTop:20,marginLeft:50}}>
                {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200}} />}</View>
                
          <TouchableOpacity style={{
                    position:'absolute',
                    top:0,
                    
                    fontWeight:'bold',
                    fontSize:10
                }} onPress={()=>{
                    if(this.state.type == "encoding"){
                        this.setState({
                            type:'decoding'
                        })
                    }else{
                        this.setState({
                            type:'encoding'
                        })
                    }
                }}>
                    <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center',width:350}}>Encode</Text>
                </TouchableOpacity>
          </View>
          
           
          </View>
        );
      }
      componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
      }
    
      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: 1
        });

        console.log(result);
        if(!result.cancelled){
            this.setState({ image: result.uri});
            console.log('sakshu');
        }
    }
    meraDost = async () =>{
        console.log("sakshu");
        console.log(this.state.text);
        console.log(this.state.image);
    }

}