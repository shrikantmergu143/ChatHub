import React,{ useEffect, useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from 'firebase/compat'
import { Entypo, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { StyleSheet, View,Text, Image,TextInput, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView, LogBox} from 'react-native'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchAllUser, fetchFriends, fetchFriendsState, fetchrequestFriends } from './../redux/action/index';
import HomeScreen from "./main/HomePage/HomePage";
import { HStack, VStack, Box, Popover } from 'native-base';
import StatusPage from './main/StatusPage/StatusPage';

const Tab = createMaterialTopTabNavigator();
LogBox.ignoreLogs(['Setting a timer']);

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
export const BlackComponent=()=>{
  return(null)
}

function Main(props){
  useLayoutEffect(()=>{
    props.navigation.setOptions({
      headerShown :true,
      headerTitle:"ChatHub",
      headerTitleStyle:{
        fontFamily:"font",
        fontSize:25
      },
      headerStyle:{
            borderBottomWidth: 0,
            borderBottomColor:"white"
      },
      headerShadowVisible: false,
      headerRight:()=>(
        <HStack marginRight={0} alignItems={"center"}>
            <TouchableOpacity onPress={()=>props.navigation.navigate("AddUser")} >
                <FontAwesome name={"user-plus"} style={{fontSize:20}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Menu")} style={{marginLeft:15}} >
                <Ionicons name={"ellipsis-vertical"} style={{fontSize:20}} />
            </TouchableOpacity>
        </HStack>
      )
    })
  },[!props.navigation])

  useEffect(()=>{
    props.fetchUser()
    props.fetchAllUser()
    props.fetchFriends()
  },[!props.currentUser]);
    return(
      <Tab.Navigator initialRouteName="Home"
        screenOptions={{ 
            tabBarColor:"white",
            tabBarLabelStyle: { fontSize: 16 },
            tabBarActiveTintColor: '#007aff',
            tabBarStyle: { backgroundColor: 'white',borderBottomColor:'grey', borderTopColor:'white',borderTopColor:0 },
            tabBarInactiveTintColor:'grey'
        }}
        style={{width:screenWidth,backgroundColor:"white"}} labeled={false}>
            <Tab.Screen initialParams={props} name="Home" component={HomeScreen} options={{title:"Chats"}}/>
            <Tab.Screen name="Search" component={StatusPage} options={{title:"Status"}}/>
            <Tab.Screen name="Postss" component={HomeScreen} options={{title:"Calls"}} />
      </Tab.Navigator>
    )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  usersList: store.usersState.usersList,
  friends:store.userState.friends,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchAllUser, fetchFriends, fetchFriendsState, fetchrequestFriends }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);