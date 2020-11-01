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
    ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/header';

export default class BookRequest extends Component{
    constructor(){
        super();
        this.state={
            emailid:firebase.auth().currentUser.email,
            bookname:'',
            reason:'',
            isbookrequestactive:'',
            requestedbookname:'',
            bookstatus:'',
            requestid:'',
            userdocid:'',
            docid:''
        }
    }
    createuniqueid(){
        return Math.random().toString(36).substring(7)
        
            }
            addrequest=async(bookname,reason)=>{
                var emailid=this.state.emailid
                var requestid=this.createuniqueid()
                db.collection("RequestBook").add({
                    'emailid':emailid,
                    'bookname':bookname,
                    'reason':reason,
                    'requestid':requestid,
                    'bookstatus':'requested',
                    'date':firebase.firestore.FieldValue.serverTimestamp()
        
                })
                await  this.getbookrequest()
            db.collection('users').where("emailid","==",emailid).get()
            .then()
            .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                db.collection('users').doc(doc.id).update({
              isbookrequestactive: true
              })
            })
          })
                this.setState({
                    bookname:'',
                    reason:'',
                    requestid:requestid
        
                })
                
            return Alert.alert("Book Requested Successfully")
            }
getbookrequest=()=>{
    var bookrequest=db.collection('RequestBook').where('emailid','==',this.state.emailid).get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
            if(doc.data().bookstatus !=='received'){
this.setState({requestid:doc.data().requestid,requestedbookname:doc.data().bookname,bookstatus:doc.data().bookstatus,docid:doc.id})
            }
        })
    })
}
getstatus(){
 db.collection('users').where('emailid','==',this.state.emailid).onSnapshot(querisnapshot=>{
     querisnapshot.forEach(doc=>{
         this.setState({isbookrequestactive:doc.data().isbookrequestactive,userdocid:doc.id})
     })
 })   
}

componentDidMount(){
    this.getstatus();
    this.getbookrequest();
}

updatestatus=()=>{
    db.collection('RequestBook').doc(this.state.docid).update({
        bookstatus:'received'
    })
    db.collection('users').where('emailid','==',this.state.emailid).get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
            db.collection('users').doc(doc.id).update({
                isbookrequestactive:false
            })
        })
    })
}

receivebooks=(bookname)=>{
    var emailid=this.state.emailid;
    var requestid=this.state.requestid;
    db.collection('receivedbooks').add({
        emailid:emailid,
        bookname:bookname,
        requestid:requestid,
        bookstatus:'received'
    })
}

sendNotification=()=>{ //to get the first name and last name 
    db.collection('users').where('emailid','==',this.state.emailid).get().then((snapshot)=>{
         snapshot.forEach((doc)=>{ 
             var name = doc.data().firstname 
             var lastname = doc.data().lastname 
             // to get the donor id and book nam 
             db.collection('allnotifications').where('requestid','==',this.state.requestid).get().then((snapshot)=>{ 
                 snapshot.forEach((doc) => {
         var donarid = doc.data().donarid
         var bookname = doc.data().bookname 
                       //targert user id is the donor id to send notification to the user 
 db.collection('allnotifications').add({ "targeteduserid" : donarid,
 "message" : name +" " + lastname + " received the book " + bookname ,
     "notificationstatus" : "unread", "bookname" : bookname
                         })
                         })
                         })
                         }) 
                        }) 
                    }


  

    
    render(){
        if(this.state.isbookrequestactive===true){
return(
    <View style={{flex:1,justifyContent:1}}>
<View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
<Text>
    bookname
</Text>
<Text>
{this.state.requestedbookname}
</Text>
</View>
<View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}> 
<Text >
bookstatus
</Text>
<Text>
{this.state.bookstatus}
</Text>
</View>
<TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}} onPress={()=>{
    this.sendNotification();
    this.updatestatus();
    this.receivebooks(this.state.requestedbookname);
}}>
<Text>I recieved the book</Text>
</TouchableOpacity>
    </View>
)
        }
        else{

        
        return(
  <View style={{flex:1}}>
      <Myheader 
      title="requestbook"navigation ={this.props.navigation}/>
      <KeyboardAvoidingView>
<TextInput 
placeholder={"bookname"}
onChangeText={(text)=>{
    this.setState({
        bookname:text
    })
}}
value={this.state.bookname}
/>

<TextInput 
placeholder={"reasonforbook"}
multiline
numberOfLines={8}
onChangeText={(text)=>{
    this.setState({
        reason:text
    })
}}
value={this.state.reason}
/>
<TouchableOpacity onPress={()=>{this.addrequest(this.state.bookname,this.state.reason)

}}>
<Text>Submit</Text>

</TouchableOpacity>
      </KeyboardAvoidingView>
  </View>
        )
    }
    
    
    
    }
    
}