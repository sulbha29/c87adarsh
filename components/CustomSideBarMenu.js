import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import db from '../config';

export default class CustomSideBarMenu extends Component{
  constructor(){
    super();
    this.state={
      emailid:firebase.auth().currentUser.email,
      image:'#',
      name:'',
      docid:''
    }
  }
  selectpicture=async()=>{
    const {cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
quality:1
    })
    if(!cancelled){
this.uploadImage(uri,this.state.emailid);
    }
  }

  uploadImage=async(uri,imagename)=>{
var response=await fetch(uri)
var blob=await response.blob();
var reference=firebase.storage().ref().child("userprofiles/"+imagename);
return (reference.put(blob).then((response)=>{
this.fetchImage(imagename);
}))
  }
  fetchImage=(imagename)=>{
    var reference=firebase.storage().ref().child("userprofiles/"+imagename);
    reference.getDownloadURL().then((url)=>{
this.setState({image:url})
    })
    .catch((error)=>{
      this.setState({image:'#'})
    })
  }
  getuserprofile(){
    db.collection('users').where('emailid','==',this.state.emailid).onSnapshot((querisnapshot)=>{
      querisnapshot.forEach((doc)=>{
this.setState({name:doc.data().firstname+' '+doc.data().lastname,
docid:doc.id,image:doc.data().image
})
      })
    })
  }
  componentDidMount(){
    this.fetchImage(this.state.emailid);
    this.getuserprofile();
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:0.5,backgroundColor:'orange',alignItems:'center'}}>
<Avatar
rounded
icon={{name: 'user', type: 'font-awesome'}}
source={{uri:this.state.image}}
size='medium'

overlayContainerStyle={{backgroundColor: 'white'}}
onPress={() => this.selectpicture()}
activeOpacity={0.7}
containerStyle={{flex:0.75,width:'40%',height:'20%', marginLeft: 20, marginTop: 30,borderRadius:40}}
/>
<Text  style = {{fontWeight:'100',fontSize:20,paddingTop:10,}}>
  {this.state.name}
</Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('LoginScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({ container: 
  { flex: 1, }
  ,
   drawerItemsContainer: 
   { flex: 0.8, },
    logOutContainer: { flex: 0.2,
       justifyContent: "flex-end",
     paddingBottom: 30, }, 
     logOutButton: 
     {
        height: 30,
       width: "100%", 
       justifyContent: "center",
        padding: 10, }, 
        imageContainer: { 
          flex: 0.75,
           width: "40%",
            height: "20%",
             marginLeft: 20, 
             marginTop: 30,
              borderRadius: 40, },
               logOutText: { fontSize: 30,
                 fontWeight: "bold",
                }, 
              });