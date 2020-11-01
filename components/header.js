import React,{Component}from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    } from 'react-native';
import db from '../config';
import {Header,Icon,Badge} from 'react-native-elements'
import firebase from 'firebase';


export default class Myheader extends Component{
    constructor(props){
        super(props);
        this.state={
            value:"",
        }
    }

getunreadnotifications(){
    db.collection("allnotifications").where("notificationstatus","==","unread").onSnapshot((snapshot)=>{
    var unreadnotifications=snapshot.docs.map((doc)=>doc.data())
    this.setState({value:unreadnotifications.length})
    })
}

ComponentDidMount(){
    this.getunreadnotifications();
}

 BellIcon=()=>{
return(
    <View>
        <Icon
      name='bell' type='font-awesome' color="orange" size={24} onPress={()=>{
        this.props.navigation.navigate('notifications')
    }}
        />
        <Badge
        value={this.state.value} containerStyle={{position:"absolute",top:-4,right:-4
    }}
        />        
    </View>
)
 }

render(){
    return(
<Header 
leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
centerComponent={{text:this.props.title,style:{color:'purple',fontSize:20,fontWeight:'bold'}}}
rightComponent={
<this.BellIcon {...this.props}/>
}
backgroundColor="red"
/>

    )
}
}