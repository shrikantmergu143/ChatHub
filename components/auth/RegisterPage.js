import { Text, View, Box, Center, VStack, FormControl, Input, Button, Divider, HStack } from 'native-base'
import React, { useLayoutEffect, useState } from 'react';
import { fetchEmailChange, fetchPassword, fetchUsername, fetchFullName } from '../../redux/action';
import { Platform, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Octicons } from "@expo/vector-icons";
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function LoginPage(props) {
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [fullnameError,setFullnameError] = useState("");
    const [usernameError,setUserNameError] = useState("");
    const [key, setkey] = useState(false);
    const [email, setEmail] = useState("")
    async function SignIn(email, password, username, fullname){
        console.log(email, password, username, fullname)
        if(email!==""&&password!==""){
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                    const data = {
                        email,
                        username,
                        fullname,
                        photoURL:"https://firebasestorage.googleapis.com/v0/b/instashare-7eb98.appspot.com/o/undefined.png?alt=media&token=4f09413f-12d1-4466-a53c-f71733d95b09",
                        following:[],
                        followers:[],
                        save:[],
                        uid: firebase.auth().currentUser.uid
                    }
                    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set(data).then(()=>{
                    console.log("store data Success");
                })
            })
            .catch((error) => {
                alert(error)
            })
        }else{
            if(email===""){
                setEmailError("Invalid Email");
            }
            if(!password){
                setPasswordError("Invalid Password");
            }
            if(!username){
                setPasswordError("Invalid Password");
            }
            if(!fullname){
                setPasswordError("Invalid Password");
            }
        }
    }
    return (
        <Center alignItems={"center"} height={"100%"} flexDirection={"row"} justifyContent={"center"}>
            <Box height={screenHeight*0.87} width={"93%"} bg={"white"} shadow={5} borderRadius={10} paddingX={8} paddingY={5} >
                    <Center width={"100%"}>
                        <Text fontFamily={'font'} color={"violet.500"} mt={5} fontSize={40}>ChatHub</Text>
                        <VStack width={"100%"} mt={6}>
                            <Center>
                                <FormControl isInvalid={usernameError}  w="100%" maxW="100%" mt={6}>
                                        <FormControl.Label >
                                            <Text style={styles.inputTitlex}>FullName</Text>
                                        </FormControl.Label>
                                        <Input fontSize={14} pl={5} fontWeight={"bold"} onPress={()=>setFullnameError("")} placeholder="Enter Fullname" value={props.fullname} onChangeText={(e)=>props.fetchFullName(e)} />
                                        <FormControl.ErrorMessage >
                                            {usernameError}
                                        </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={fullnameError}  w="100%" maxW="100%" mt={6}>
                                        <FormControl.Label >
                                            <Text style={styles.inputTitle}>Username</Text>
                                        </FormControl.Label>
                                        <Input fontSize={14} pl={5} fontWeight={"bold"} onPress={()=>setUserNameError("")} placeholder="Enter Username" value={props.username} onChangeText={(e)=>props.fetchUsername(e)} />
                                        <FormControl.ErrorMessage >
                                            {fullnameError}
                                        </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={emailError}  w="100%" maxW="100%" mt={6}>
                                        <FormControl.Label >
                                            <Text style={styles.inputTitle}>Email</Text>
                                        </FormControl.Label>
                                        <Input fontSize={14} pl={5} fontWeight={"bold"} onPress={()=>setEmailError("")}  placeholder="Enter Email" value={email} onChangeText={(e)=>setEmail(e)} />
                                        <FormControl.ErrorMessage >
                                            {emailError}
                                        </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl mt={6} isInvalid={passwordError} w="100%" maxW="100%">
                                        <FormControl.Label fontSize={18} fontWeight={"bold"} >
                                            <Text style={styles.inputTitle}>Password</Text>
                                        </FormControl.Label>
                                        <Input fontSize={14} InputRightElement={
                                                <Button variant={"unstyled"} onPress={()=>setkey(!key)} style={{height:"100%"}}>
                                                    <Octicons style={{fontSize:20}} name={!key?"eye":"eye-closed"} />
                                                </Button>
                                            } pl={5} fontWeight={"bold"} onPress={()=>setEmailError("")} onSubmitEditing={()=>SignIn(email,props?.password,props?.username,props?.fullname)} placeholder="Enter password" onChangeText={(e)=>props.fetchPassword(e)} value={props.password} type={key?"password":"text"} />
                                        <FormControl.ErrorMessage >
                                        {passwordError}
                                        </FormControl.ErrorMessage>
                                </FormControl>
                                <Button style={styles.shadowProp} mt={10} width={"100%"}  onPress={()=>SignIn(email,props?.password,props?.username,props?.fullname)}>
                                    <Text style={{color:"white", fontSize:17, fontWeight:"800"}}>Register</Text>
                                </Button>
                                <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
                                    <HStack mt={5}>
                                        <Text fontSize={16}> If you do not have a account?</Text>
                                        <Text fontSize={17} fontFamily={"font"} ml={2} color={"primary.500"}>Login</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </Center>
                        </VStack>
                    </Center>
                </Box>
            </Center>
    )
}
const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-between',
        width: "100%",
        height: screenHeight*0.5,
        backgroundColor:"#f2f2f2"
    },
    inputTitle:{
        fontWeight:"bold",
        fontSize:16,
    },
    inputType:{
        fontSize:16
    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset:{  width: 10,  height: 10,  },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,

      },
});

const mapStateToProps = (store) => ({
    email:store.userState.email,
    password: store.userState.password,
    username: store.userState.username,
    fullname: store.userState.fullname,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchEmailChange, fetchPassword, fetchUsername, fetchFullName }, dispatch);
 
export default connect(mapStateToProps, mapDispatchProps)(LoginPage);