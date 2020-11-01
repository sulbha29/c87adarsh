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
    FlatList, Dimensions} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/header';
import {ListItem,Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';

export default class SwipableFlatlist extends Component{
    constructor(props){
        super(props);
        this.state={
            allnotifications:this.props.allnotifications
        }
    }
    onSwipeValueChange=swipedata=>{
var allnotifications=this.state.allnotifications;
const {key,value}=swipedata
if(value<-Dimensions.get('window').width){
const newdata=[...allnotifications];
const preindex=allnotifications.findIndex(item=>item.key===key)
this.updatemarkasread(allnotifications[preindex]);
newdata.splice(preindex,1);
this.setState({allnotifications:newdata});
}
    }

    renderItem=data=>(
        <ListItem
        leftElement={<Icon 
            name="book"
        type="font-awesome"
        color="orange"
        />}
        title={data.item.bookname}
        titleStyle={{color:"purple",fontWeight:"bold"}}
        subtitle={data.item.message}
        bottomDivider
        />

        
    )

    

 updatemarkasread=(notification)=>{
     db.collection("allnotications").doc(notification.docid).update({
         notificationstatus:"read"
     })
 }

 renderHiddenItem = () => ( <View style={styles.rowBack}>
      <View style={[styles.backRightBtn,
       styles.backRightBtnRight]}> 
       <Text style={styles.backTextWhite}>
           </Text> 
           </View>
            </View>
             );

    render(){
        return(
            <View styel={styles.container}>
                <SwipeListView
                disableRightSwipe
                data={this.state.allnotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                 previewRowKey={'0'} 
                 previewOpenValue={-40} 
                 previewOpenDelay={3000}
                 onSwipeValueChange={this.onSwipeValueChange}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({ container: { backgroundColor: 'white', flex: 1, }, backTextWhite: { color: '#FFF', fontWeight:'bold', fontSize:15 }, rowBack: { alignItems: 'center', backgroundColor: '#29b6f6', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, }, backRightBtn: { alignItems: 'center', bottom: 0, justifyContent: 'center', position: 'absolute', top: 0, width: 100, }, backRightBtnRight: { backgroundColor: '#29b6f6', right: 0, }, });