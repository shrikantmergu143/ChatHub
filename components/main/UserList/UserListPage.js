import { Text, View, Box, Center, VStack, FormControl, Input, Button, Divider, Icon, HStack, FlatList, Avatar, Spinner, useToast } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { fetchAllUser, fetchFriendsState, fetchFriends,fetchrequestFriends, fetchUser } from './../../../redux/action';
import {KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Feather } from "@expo/vector-icons";
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import { db } from '../../../config/Firebase';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function AddUserPage(props) {
    const [sendFriend, setStatus] = useState(false)
    const [load,setload] = useState(false)
    const toast = useToast();
    useEffect(()=>{
        db.collection("userfriend").doc(firebase.auth().currentUser.uid).collection("friends").doc(props.uid).get().then((res)=>{
            if(res.exists){
                setStatus(true)
            }else{
                setStatus(false)
            }
        })
    },[!sendFriend])
    function AddFriend(uid){
        toast.show({
            title: "Friend added soon please go back it require time to procced",
            placement: "bottom"
          })
        setload(true)
        setStatus(true)
        db.collection("users").doc(firebase.auth().currentUser.uid).update({friends:firebase.firestore.FieldValue.arrayUnion(uid)})
        db.collection("friends").add({users:[uid, firebase.auth().currentUser.uid]})
        db.collection("users").doc(uid).update({friends:firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)})
        db.collection("userfriend").doc(firebase.auth().currentUser.uid).collection("friends").doc(uid).set({})
        setTimeout(()=>{
            setload(false)
        },4000)
    }
    function DeleteFriend(id){
        setload(true)
        setStatus(false)
        const send =  props.friend.find(res=>res.uid===props.uid?res.id:false);
        if(send.id){
            db.collection("userfriend").doc(firebase.auth().currentUser.uid).collection("friends").doc(id).delete()
            db.collection("users").doc(firebase.auth().currentUser.uid).update({friends:firebase.firestore.FieldValue.arrayRemove(id)})
            db.collection("friends").doc(send.id).delete();
            db.collection("users").doc(id).update({friends:firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)})
        }
        setTimeout(()=>{
            setload(false)
        },4000)
    }

    
    return (
        <HStack borderBottomColor={"whitesmoke"} justifyContent={"space-between"} borderBottomWidth={1} paddingX={3} padding={4} alignItems={"center"}>
            <HStack>
                <Avatar size={"40px"} source={{uri:props?.photoURL}} />
                <VStack ml={3}>
                    <Text fontWeight={"bold"} fontSize={16}>{props?.fullName?props?.fullName:props?.fullname}</Text>
                    <Text>{props?.username}</Text>
                </VStack>
            </HStack>
            {
           
            sendFriend && load==false?
               <HStack  justifyContent={"flex-end"} space={1}>
                    <Button onPress={()=>DeleteFriend(props?.uid)} borderRadius={100} bg={"white"} >
                        <FontAwesome name={"times"} style={{color:'black', fontSize:18,}} />
                    </Button>
                    <Button>
                        <HStack alignItems={"center"}>
                            <Feather name={"user-check"} style={{marginRight:4, fontSize:18, color:'white'}} />
                            <Text color={"white"}> Added</Text>
                        </HStack>
                    </Button>
               </HStack>
                :
                
                <Button colorScheme={'primary'} isLoading={load} isLoadingText="wait" spinnerPlacement={"start"} onPress={()=>AddFriend(props.uid)}> 
                    <HStack alignItems={"center"}>
                        <Feather name={"user-plus"} style={{marginRight:4, fontSize:18, color:'white'}} />
                        <Text color={"white"}> Add Freind</Text>
                    </HStack>
                </Button>
            }
        </HStack>
    )
}
const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-between',
        width: "100%",
        height: "100%"
    },
});

const mapStateToProps = (store) => ({
    currentUser:store.userState.currentUser,
    friend:store.userState.friends,
    usersList:store.usersState.usersList,
    friendsList:store.usersState.friendsList
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchAllUser, fetchFriends, fetchFriendsState, fetchrequestFriends, fetchUser}, dispatch);
 
export default connect(mapStateToProps, mapDispatchProps)(AddUserPage);