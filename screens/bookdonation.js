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
export default class BookDonation extends Component{
    constructor(){
        super();
        this.state={
            requestbook:[],
            emailid:firebase.auth().currentUser.email,
        }
        this.requestref=null
    }
    getrequestlist=()=>{
        this.requestref=db.collection("RequestBook").onSnapshot((snapshot)=>{
            var requestbook=snapshot.docs.map(doc=>doc.data());
            this.setState({
                requestbook:requestbook
            })
        })
    }
    componentDidMount(){
        this.getrequestlist()
      }
      componentWillUnmount(){
        this.requestref();
      }
      keyExtractor = (item, index) => index.toString()

      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.bookname}
            subtitle={item.reason}
            titleStyle={{color:"blue",fontWeight:"bold"}}
            rightElement={<TouchableOpacity style={styles.button}
             onPress={()=>{this.props.navigation.navigate('recieverdetails',{'details':item})}}> 
<Text>View</Text>
            </TouchableOpacity>}
            bottomDivider
            />
        )
    }
render(){
    return(
<View style={{flex:1}}>
    <Myheader
    title="donatebooks"navigation ={this.props.navigation}/>
    <View style={{flex:1}}> 
    {
        this.state.requestbook.length==0?(<View>
            <Text>ListOfAllRequestedBooks</Text>
            </View>):(<FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.requestbook}
            renderItem={this.renderItem}
            />)
    }
      </View>

</View>
    )
}



}
const styles = StyleSheet.create({
     subContainer:{ flex:1, fontSize: 20,
     justifyContent:'center', alignItems:'center' },
 button:{ width:100, height:30, justifyContent:'center', alignItems:'center',
  backgroundColor:"#ff5722", shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 } } })
