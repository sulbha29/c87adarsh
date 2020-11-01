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
    FlatList,
    SnapshotViewIOS} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/header';
import { Card, Icon,Header } from 'react-native-elements';

export default class RecieverDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            emailid:firebase.auth().currentUser.email,
            recieverid:this.props.navigation.getParam("details")['emailid'],
            requestid:this.props.navigation.getParam("details")['requestid'],
            bookname:this.props.navigation.getParam("details")['bookname'],
            reason:this.props.navigation.getParam("details")['reason'],
            recievername:"",
            contact:"",
            recieveraddress:"",
            recieverrequestdocid:"",
            username:""

        }
    }
    getrecieverdetails(){
        db.collection("users").where("emailid",'==',this.state.recieverid).get().then(snapshot=>{
            snapshot.forEach(doc=>{this.setState({recievername:doc.data().firstname,contact:doc.data().contact,recieveraddress:doc.data().address})})
        })
        db.collection("RequestBook").where("requestid",'==',this.state.requestid).get().then(snapshot=>{
            snapshot.forEach(doc=>{this.setState({recieverrequestdocid:doc.id})})
        })
    }
    getUserDetails=(emailid)=>{
        db.collection("users").where('emailid','==', emailid).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              username  :doc.data().firstname + " " + doc.data().lastname
            })
          })
        })
      }
    updatbookstatus=()=>{
db.collection("alldonations").add({
    bookname:this.state.bookname,
    requestid:this.state.requestid,
    requestedby:this.state.recievername,
    donarid:this.state.emailid,requeststatus:"donarintrested"
})
    }

    addnotifications=()=>{
        var message=this.state.username+"has shown intrest in donating the book"
        db.collection("allnotifications").add({
            targeteduserid:this.state.recieverid,
            donarid:this.state.emailid,
requestid:this.state.requestid,
bookname:this.state.bookname,
date:firebase.firestore.FieldValue.serverTimestamp(),
notificationstatus:"unread",
message:message
        })
    }

    componentDidMount(){
this.getrecieverdetails();
this.getUserDetails(this.state.emailid)
    }
    render(){
        return(
          <View style={styles.container}>
              <View style={{flex:0.1}}>
                  <Header
                  leftComponent={<Icon name="arrow-left"
                  type="feather" 
                  color="blue"
                  onPress={()=>{
                      this.props.navigation.goBack()
                  }}             
                  />}
                  centerComponent={{text:"donatebooks"}}
                  backgroundColor="red"
                  />
               
              </View>
              <View style={{flex:0.3}}>
<Card title={"bookinformation"}
titleStyle={{fontSize:24}}
> 
<Card>
    <Text>name:{this.state.bookname}</Text>
</Card>

<Card>
    <Text>
        reason:{this.state.reason}</Text>
</Card>



</Card>
              </View>
              <View style={{flex:0.3}}>
<Card title={"receiverinformation"}
titleStyle={{fontSize:24}}
>
<Card>
    <Text>
        name:{this.state.recievername}
    </Text>
</Card>
<Card>
    <Text>
        contact:{this.state.contact}
    </Text>
</Card>

<Card>
    <Text>
        address:{this.state.recieveraddress}
    </Text>
</Card>

</Card>
              </View>
<View style={styles.buttonContainer}>
{this.state.recieverid !== this.state.emailid ?(<TouchableOpacity style={styles.button} onPress={()=>{
    this.updatbookstatus(),
    this.addnotifications();
    this.props.navigation.navigate("mydonations");
}}>

<Text>
    I Want To Donate
</Text>
</TouchableOpacity>):null} 
              </View>
          </View>
        )
    }
}
const styles = StyleSheet.create({
     container: { flex:1, },
      buttonContainer : {flex:0.3, justifyContent:'center', alignItems:'center' },
            button:{ width:200, height:50, justifyContent:'center', 
            alignItems : 'center', borderRadius: 10, backgroundColor: 'orange',
             shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
               elevation : 16 } 
            })