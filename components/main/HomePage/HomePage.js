import { Text, View, Box, Center, VStack, FormControl, Input, Button, Divider, HStack, Avatar, FlatList, Spinner, ScrollView } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { fetchEmailChange, fetchPassword, fetchUsername, fetchFullName, fetchFriends } from './../../../redux/action';
import {KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import FriendsList from '../FriendsList/FriendsList';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function AddUserPage(props) {
    const [load,setload] = useState(true)
    useEffect(()=>{
        props?.fetchFriends();
        setTimeout(()=>{
            setload(false)
        },4000)
    },[!props?.friends])

    if(load){
        return(
            <View style={{flex:1,display:"flex",alignItems:'center',justifyContent:'center'}}>
                <Spinner size={40}/>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <ScrollView scrollEnabled={true}>
                <VStack bg={"white"}>
                    <FlatList
                            data={props?.friends}
                            renderItem={({item})=>(
                                <FriendsList navigation={props.navigation} users={item} />
                            )}
                    />
                </VStack>
           </ScrollView>
        </KeyboardAvoidingView>
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
  friends:store.userState.friends,
  usersList:store.usersState.usersList,
  friendsList:store.usersState.friendsList
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchEmailChange, fetchFriends  }, dispatch);
 
export default connect(mapStateToProps, mapDispatchProps)(AddUserPage);