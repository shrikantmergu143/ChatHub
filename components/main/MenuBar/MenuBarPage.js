import { Text, View, Box, Center, VStack, FormControl, Input, Button, Divider, HStack } from 'native-base'
import React, { useLayoutEffect, useState } from 'react';
import { fetchEmailChange, fetchPassword, fetchUsername, fetchFullName } from './../../../redux/action';
import {KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function AddUserPage(props) {

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <VStack bg={"white"}>
            <TouchableOpacity onPress={()=>props.navigation.navigate("AddUser")} style={{borderBottomColor:"whitesmoke",borderBottomWidth:1}}>
              <HStack paddingX={3} paddingY={4} alignItems={"center"}>
                <FontAwesome name={"user-plus"} style={{fontSize:25,color:"#0090f7"}}  />
                <Text ml={5} fontSize={20} fontWeight={"normal"}>Add Friend</Text>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity style={{borderBottomColor:"whitesmoke",borderBottomWidth:1}}>
              <HStack paddingX={3} paddingY={4} alignItems={"center"}>
                <FontAwesome name={"user"} style={{fontSize:25,color:"#0090f7"}}  />
                <Text ml={5} fontSize={20} fontWeight={"normal"}>Personal Account</Text>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity style={{borderBottomColor:"whitesmoke",borderBottomWidth:1}}>
              <HStack paddingX={3} paddingY={4} alignItems={"center"}>
                <Ionicons name={"settings-outline"} style={{fontSize:25,color:"#0090f7"}}  />
                <Text ml={5} fontSize={20} fontWeight={"normal"}>Setting Account</Text>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>firebase.auth().signOut()} style={{borderBottomColor:"whitesmoke",borderBottomWidth:1}}>
              <HStack paddingX={3} paddingY={4} alignItems={"center"}>
                <Ionicons name={"log-out-outline"} style={{fontSize:25,color:"#0090f7"}}  />
                <Text ml={5} fontSize={20} fontWeight={"normal"}>Log Out</Text>
              </HStack>
            </TouchableOpacity>
          </VStack>
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
    email:store.userState.email,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchEmailChange,  }, dispatch);
 
export default connect(mapStateToProps, mapDispatchProps)(AddUserPage);