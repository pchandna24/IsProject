import * as React from 'react';
import { Button, Image, View, Text, ActivityIndicator, Alert,TextInput, Dimensions, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import ImgToBase64 from 'react-native-image-base64';
import * as FileSystem from 'expo-file-system';
import base64 from 'base-64';
import utf8 from 'utf8';
import axios from 'axios';




const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height





export default class Encrypter extends React.Component{
    state={
        text:null,
        data:null,
        type:'encoding',
        image:null,
        imageSelect:null,
        isUploading:false,
        mainImage:null,
        base64send:null,
        b64:null
    }
    render() {
        
        
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
                <View style={{marginTop:20,marginLeft:50}}>
                {this.state.image &&
                <Image source={{ uri: this.state.image }} style={{ width: 250, height: 250}} />}
                </View>
                { this.state.data && 
                    <Text style={{alignItems:'center',textAlign:'center',width:350,fontWeight:"bold",color:'white',fontSize:20}} >{`${this.state.data}`}</Text>
                }
                

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
                {this.state.image &&
                <Image source={{ uri: this.state.image }} style={{ width: 250, height: 250}} />}
                </View>
                { this.state.data && 
                    <Text style={{alignItems:'center',textAlign:'center',width:350,fontWeight:"bold",color:'white',fontSize:20}} >{`${this.state.data}`}</Text>
                }
                
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
            this.setState({ mainImage: result.uri});
            console.log('sakshu');
        }
    }
    meraDost = async () =>{
        console.log("sakshu");
        console.log(this.state.text);
        // console.log(this.state.image);
        // let file = await FileSystem.readAsStringAsync(this.state.image, { encoding: 'base64' });
        // console.log(file.substring(0,50))
        // this.setState({
        //     base64send: file
        // })
        let formData = new FormData()
        formData.append("text", this.state.text)
        // formData.append("image", this.state.file)

         try{
            let res = await axios.post('http://61770f5b.ngrok.io/encode',formData)
            this.setState({
              b64:`data:image/png;base64,${res.data.image}`,
              data:res.data.key,
              image:`data:image/png;base64,${res.data.image}`
            })
           }catch(err){
             console.log(err)
           }
        if(this.state.mainimage){
            console.log(this.state.image);
        let file = await FileSystem.readAsStringAsync(this.state.mainimage, { encoding: 'base64' });
        console.log(file.substring(0,50))
        this.setState({
            base64send: file
        })
            let formData = new FormData()
            formData.append("key", this.state.text)
            formData.append("image",file)
            
            try{
                let res = await axios.post('http://61770f5b.ngrok.io/decode',formData)
                this.setState({
                  
                  data:res.data.key,
                  image:null
                })
                
               }catch(err){
                 console.log(err)
               }

        }
       

    }

}