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
import {ListItem,Icon} from 'react-native-elements';
import SwipableFlatlist from '../components/swipableflatlist';

export default class NotificationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            emailid:firebase.auth().currentUser.email,
allnotifications:[],

        }
        this.notificationref=null;
    }
    getnotifications=()=>{
        this.requestref = db.collection("allnotifications").where("notificationstatus", "==","unread")
        .where("targeteduserid",'==',this.state.emailid).onSnapshot((snapshot)=>
        { var allnotifications = [] 
            snapshot.docs.map((doc) =>
            { var notification = doc.data()
                 notification["docid"] = doc.id 
                 allnotifications.push(notification) });
                  this.setState({ allnotifications : allnotifications }); 
                }) 
            }
componentDidMount(){
    this.getnotifications();
}
componentWillUnmount(){
this.notificationref();
}
keyExtractor = (item,index) => index.toString()
renderItem = ({item,index}) =>{
    return (
      <ListItem

  leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
    title={item.bookname} 
    titleStyle={{ color: 'black', 
    fontWeight: 'bold' }}
 subtitle={item.message} bottomDivider /> ) }
    render(){
        return(
            <View style={{flex:1}}>

<View style={{flex:0.1}}>
     <Myheader title={"notifications"} navigation={this.props.navigation}/> 
     </View>
     <View style={{flex:0.9}}>
          {
            this.state.allnotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
             <SwipableFlatlist
             allnotifications={this.state.allnotifications}
             />
            )
          }
        </View>
            </View>
        )
    }
}