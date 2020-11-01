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
    ScrollView,FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem,Icon} from 'react-native-elements';
import Myheader from '../components/header';

export default class MYDonation extends Component{
    
    constructor(){
        super();
        this.state={
            donarid:firebase.auth().currentUser.email,
            alldonations:[],
            donarname:""
        }
        this.requestref=null
    }
    static navigationOptions={header:null}
    getdonardetails=(donarid)=>{
        db.collection("users").where("emaild","==",donarid).get().then((snapshot)=>
        {
            snapshot.forEach((doc)=>{
                this.setState({"donarname":doc.data().firstname+" "+doc.data.lastname()})
            })
        }
        )
    }

    getalldonations=()=>{
        this.requestref=db.collection("alldonations").where("donarid","==",this.state.donarid).onSnapshot((snapshot)=>{
            var alldonations=[]
            snapshot.docs.map((doc)=>{
                var donation = doc.data()
                donation["docid"]=doc.id
                alldonations.push(donation)
            })
                        this.setState({alldonations:alldonations})
        })

    }
    sendnotification=(bookdetails,requeststatus)=>{
var requestid=bookdetails.requestid;
var donarid=bookdetails.donarid;
db.collection("allnotifications").where("requestid","==",requestid)
.where("donarid","==",donarid).get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
        var message="";
        if(requeststatus=="booksent"){
message=this.state.donarname+"Sent You A Book"
        }
        else{
            message=this.state.donarname+"has shown intrest in Sending the book"
        }
        db.collection("allnotifications").doc(doc.id).update({message:message,
            notificationstatus:"unread",
        date:firebase.firestore.FieldValue.serverTimestamp()
    })
    })
})
    }

    sendbook=(bookdetails)=>{
        if(bookdetails.requeststatus=="Send Book"){
var requeststatus="donarinterested";
db.collection("alldonations").doc(bookdetails.docid).update({requeststatus:"donarinterested"})
this.sendnotification(bookdetails,requeststatus);

        }
        else{
            var requeststatus="booksent";
            db.collection("alldonations").doc(bookdetails.docid).update({requeststatus:"booksent"})
        }
        this.sendnotification(bookdetails,requeststatus);
    }
    componentDidMount(){
this.getalldonations();    
this.getdonardetails(this.state.donarid)    
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ( {item, i} ) =>(
         <ListItem
          key={i} title={item.bookname}
           subtitle={"Requested By : " + item.requestedby +"\nStatus : " + item.requeststatus}
            leftElement={
            <Icon name="book" type="font-awesome" color ='#696969'/>}
             titleStyle={{ color: 'black', fontWeight: 'bold' }}
              rightElement={ 
              <TouchableOpacity style={[styles.button,{backgroundColor:item.requeststatus==="booksent"?"green":"red"}]} 
              onPress={()=>{
                  this.sendbook(item);
              }}> 
              <Text style={{color:'#ffff'}}>
                  {item.requeststatus==="booksent"?"booksent":"Send book"}
                  </Text>
                   </TouchableOpacity> }
            bottomDivider /> )


    componentWillUnmount(){
        this.requestref();
    }
    render(){
        return(
            <View style={{flex:1}}>
<Myheader 
navigation={this.props.navigation}
title="mydonations"
/>
<View style={{flex:1}}>
     { this.state.alldonations.length === 0
      ?( <View style={styles.subtitle}>
           <Text style={{ fontSize: 20}}>
               List of all book Donations</Text>
                </View> )
                 :( <FlatList 
                 keyExtractor={this.keyExtractor}
                  data={this.state.alldonations}
                   renderItem={this.renderItem} /> ) }
                    </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
     button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 },
 subtitle :{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' } })