import { Text, View, Box, Center, VStack, FormControl, Input, Button, Divider, HStack, Avatar, FlatList, Spinner, ScrollView } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { fetchEmailChange, fetchPassword, fetchUsername, fetchFullName, fetchFriends } from './../../../redux/action';
import {KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity, Image} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import moment from 'moment';
import { Video, AVPlaybackStatus } from 'expo-av';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function AddUserPage(props) {
    const [message, setMessage] = useState({});
    useEffect(()=>{
        firebase.firestore()
        .collection("friends")
        .doc(props.users.id)
        .collection("message")
        .orderBy("sendAt", "desc")
        .onSnapshot((snapshot)=>{
            const data = snapshot.docs.map((doc)=>{
                return {...doc.data(), id:doc.id};
            })
            if(data.length!==0){
                setMessage(data[0]);
            }
            else{
                setMessage({})
            }
        })
    },[!message])

    function toDate(unix_timestamp) {
        let date = new Date(unix_timestamp * 1000);
        let currentDate = new Date();
        const timeDiff = currentDate.getTime() - date.getTime();
      
        if (timeDiff <= (24 * 60 * 60 * 1000)) {
          //Today
          return moment(date).format('h:mm a');
        } else if (timeDiff <= (48 * 60 * 60 * 1000)) {
          // Yesterday
          return "Yesterday"
        }else if(timeDiff <=  (168 * 60 * 60 * 1000)) {
          // Less than week
          return moment(date).format('dddd')
        } else {
          return moment(date).format("DD/MM/YYYY")
        }
      }
    return (
        <TouchableOpacity style={{borderColor:"whitesmoke", borderWidth:1}} onPress={()=>props?.navigation.navigate("Message",{...props?.users})}>
            {message?.sendAt!==undefined?
                <HStack width={"100%"} paddingX={3} paddingY={3} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack alignItems={"center"}>
                        <Avatar size={"48px"} source={{uri:props?.users.photoURL}} />
                        <VStack paddingLeft={4}>
                            <Text fontSize={18} fontWeight={"bold"} fontFamily={"heading"} >{props?.users.username}</Text>
                           { message.type==="text"?
                                <Text>{message?.message}</Text>
                                :
                                message.type==="image"?<Image source={{uri:message.message}} style={{height:20, width:26, borderRadius:5, borderColor:"whitesmoke", borderWidth:1}} />
                                :
                                message.type==="video"&&
                                <Video
                                    style={styles.video}
                                    source={{
                                    uri: message.message,
                                    }}
                                    useNativeControls
                                    resizeMode="contain"
                                />
                           }
                        </VStack>
                    </HStack>
                    <HStack>
                        <Text style={{fontWeight:"500", fontSize:10}}>{toDate(message?.sendAt)}</Text>
                    </HStack>
                </HStack>
                :
                <HStack width={"100%"} paddingX={3} paddingY={3} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack alignItems={"center"}>
                        <Avatar size={"48px"} source={{uri:props?.users.photoURL}} />
                        <VStack paddingLeft={4}>
                            <Text fontSize={18} fontWeight={"bold"} fontFamily={"heading"} >{props?.users.username}</Text>
                            <Text>{props?.users.fullName?props?.users.fullName:props?.users.fullname}</Text>
                        </VStack>
                    </HStack>
                    <HStack>
                        <Text style={{fontWeight:"500", fontSize:10}}></Text>
                    </HStack>
                </HStack>
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-between',
        width: "100%",
        height: "100%"
    },
    video: {
        alignSelf: 'center',
        width: screenWidth*0.1,
        height: 20,
      },
});

const mapStateToProps = (store) => ({
  friends:store.userState.friends,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchEmailChange, fetchFriends  }, dispatch);
 
export default connect(mapStateToProps, mapDispatchProps)(AddUserPage);