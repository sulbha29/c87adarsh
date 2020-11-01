import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/header';
import {ListItem} from 'react-native-elements'

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
            emailid:"",
            firstname:'',
            lastname:'',
            address:'',
            contact:'',
            docid:''
        }
    }

getdetails=()=>{
    var email=firebase.auth().currentUser.email;
    db.collection('users').where('emailid',"==",email).get().then(snapshot=>{
        snapshot.forEach(doc=>{
            var data=doc.data()
            this.setState({emailid:data.emailid,
                firstname:data.firstname,
                lastname:data.lastname,
                address:data.address,
                contact:data.contact,
                docid:doc.id})

        })
    })
}
updatedetails=()=>{
    db.collection("users").doc(this.state.docid).update({"firstname":this.state.firstname,
        "lastname":this.state.lastname,
        "address":this.state.address,
        "contact":this.state.contact,
        "emailid":this.state.emailid}
        )
        Alert.alert("The Profile Updated Succesfully")
}

componentDidMount(){
    this.getdetails();
}

render(){
    return(
        <View>
            <Myheader 
            title="settings" navigation={this.props.navigation}
/>
            <View style={styles.formTextInput}>
            <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstname: text
            })
          }}
          value={this.state.firstname}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastname: text
            })
          }}
          value={this.state.lastname}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
          value={this.state.contact}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
          value={this.state.address}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailid: text
            })
          }}
          value={this.state.emailid}
        />
        <TouchableOpacity style={styles.button}
        onPress={()=>{
this.updatedetails();
        }}
        
        >
<Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
     container : { flex:1, alignItems: 'center', justifyContent: 'center' },
      formContainer:{ flex:1, width:'100%', alignItems: 'center' },
       formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91',
        borderRadius:10, borderWidth:1, marginTop:20, padding:10, },
         button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center'
         , borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000",
          shadowOffset: { width: 0, height: 8, },
           shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, 
           buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })