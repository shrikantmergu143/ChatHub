import { Text, View, Box, Center, VStack, FormControl, Input, Button, Divider, HStack } from 'native-base'
import React, { useLayoutEffect, useState } from 'react';
import { fetchEmailChange, fetchPassword } from '../../redux/action';
import {KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Octicons } from "@expo/vector-icons";
import firebase from "firebase/compat";
import "firebase/compat/auth";

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function LoginPage(props) {
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [email, setEmail ] = useState("")
    const [key, setkey ] = useState(false)
    function SignIn(email, password){
        if(email!==""&&password!==""){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
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
        }
    }
    function GLogin(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                const data = {
                    fullName:user.displayName,
                    email:user.email,
                    uid:user.uid,
                    photoURL:user.photoURL,
                    username:user.displayName,
                    accessToken:token,
                    signInMethod:credential.signInMethod,
                    idToken:credential.idToken,
                    following:[],
                    followers:[],
                    save:[]
                }
                firebase.firestore().collection("users").doc(user.uid).set(data).then(()=>{
                console.log("store data Success");
                })
            }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            });
    }
    function FLogin(){
        const provider =  firebase.auth.FacebookAuthProvider();
        firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
              var credential = result.credential;
              var token = credential.accessToken;
              var user = result.user;
              const data = {
                fullName:user.displayName,
                email:user.email,
                uid:user.uid,
                photoURL:user.photoURL,
                username:user.displayName,
                accessToken:token,
                signInMethod:credential.signInMethod,
                following:[],
                followers:[],
                save:[]
              }
              firebase.firestore().collection("users").doc(user.uid).set(data).then(()=>{
                console.log("store data Success");
              })
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }
    return (
        <Center alignItems={"center"} height={"100%"} flexDirection={"row"} justifyContent={"center"}>
            <Box height={screenHeight*0.9} width={"93%"} bg={"white"} shadow={5} borderRadius={10} paddingX={8} paddingY={5} mt={10}>
            <Center width={"100%"}>
                <Text fontFamily={'font'} color={"violet.500"} mt={10} fontSize={40}>ChatHub</Text>
                <VStack width={"100%"} mt={6}>
                    <Center>
                        <Button style={styles.shadowProp} onPress={()=>FLogin()} mt={10} width={"100%"} textAlign={"center"} mb={2} bg={"primary.500"}>
                            <HStack alignItems={"center"}>
                                <FontAwesome name={"facebook-f"} style={{color:"white", fontSize:20}} />
                                <Text  style={{marginLeft:5,color:"white",fontWeight:"600",fontSize:16}}  >  Sign in with using Facebook</Text>
                            </HStack>
                        </Button>
                        <Button style={styles.shadowProp} width={"100%"} onPress={()=>GLogin()} textAlign={"center"} mb={10} bg={"red.500"} flexDirection={"row"} alignItems={"center"}>
                            <HStack alignItems={"center"}>
                                <FontAwesome name={"google-plus"} style={{color:"white", fontSize:20}} />
                                <Text  style={{marginLeft:5,color:"white",fontWeight:"600",fontSize:16}}  >  Sign in with using Google</Text>
                            </HStack>
                        </Button>
                        <Divider width={"100%"} />
                            <FormControl isInvalid={emailError}  w="100%" maxW="100%" mt={6}>
                                    <FormControl.Label >
                                        <Text style={styles.inputTitle}>Email</Text>
                                    </FormControl.Label>
                                    <Input  onPress={()=>setEmailError("")} pl={4} fontSize={14} fontWeight={"bold"} placeholder="Enter Email" value={email} onChangeText={(e)=>setEmail(e)} />
                                    <FormControl.ErrorMessage >
                                        {emailError}
                                    </FormControl.ErrorMessage>
                            </FormControl>
                    </Center>
                    <Center mt={4}>
                        <FormControl isInvalid={passwordError} w="100%" maxW="100%">
                                <FormControl.Label>
                                <Text style={styles.inputTitle}>Password</Text>
                                </FormControl.Label>
                                <Input InputRightElement={
                                        <Button variant={"unstyled"} onPress={()=>setkey(!key)} style={{height:"100%"}}>
                                            <Octicons style={{fontSize:20}} name={!key?"eye":"eye-closed"} />
                                        </Button>
                                    } onPress={()=>setEmailError("")} pl={4} fontSize={14} fontWeight={"bold"} onSubmitEditing={()=>SignIn(email,props?.password)} placeholder="Enter password" onChangeText={(e)=>props.fetchPassword(e)} value={props.password} type={key?"password":"text"} />
                                <FormControl.ErrorMessage >
                                {passwordError}
                                </FormControl.ErrorMessage>
                        </FormControl>
                        <Button mt={10} style={styles.shadowProp}  width={"100%"} onPress={()=>SignIn(email,props?.password)}>
                            <Text style={{color:"white", fontSize:17, fontWeight:"900"}}>Login</Text>
                        </Button>
                        <TouchableOpacity onPress={()=>props.navigation.navigate("Register")}>
                            <HStack mt={5}>
                                <Text fontSize={15}> If you do not have a account?</Text>
                                <Text fontSize={15} fontFamily={"font"} ml={2} color={"primary.500"}>Register</Text>
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
        backgroundColor:"#f2f2f2",
        height: "100%"
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
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchEmailChange, fetchPassword }, dispatch);
 
export default connect(mapStateToProps, mapDispatchProps)(LoginPage);