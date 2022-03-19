import { Text, View, Box, Center, VStack, FormControl, Input, Button, Divider, HStack, Image, Avatar, Spinner } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { fetchEmailChange, fetchPassword, fetchUsername, fetchFullName, fetchFriends } from './../../../redux/action';
import {KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity, ScrollView,SafeAreaView, FlatList, Alert} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { Entypo, FontAwesome, AntDesign, FontAwesome5, Feather, MaterialCommunityIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function AddUserPage(props) {
    const [load,setload] = useState(true)
    const [users,setusers] = useState(props.route.params)
    const [message, setMessage] = useState('');
    const [chatList, setChatList] = useState([]);
    const [image, setImage] = useState(null);
    const [select,setSelect] = useState('')
    useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerTitle:"",
            headerRight:()=>select===""?(
                <HStack space={3}>
                    <TouchableOpacity>
                        <MaterialIcons name={"add-ic-call"} style={{fontSize:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name={"ellipsis-vertical"} style={{fontSize:20}} />
                    </TouchableOpacity>
                </HStack>
            ):(
                <HStack space={6} alignItems={"center"}>
                    <TouchableOpacity onPress={()=>{
                         const data = createThreeButtonAlert()
                         console.log(data)
                        }}>
                        <AntDesign name={"back"} style={{fontSize:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name={"star"} style={{fontSize:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>createThreeButtonAlert()}>
                        <MaterialCommunityIcons name={"delete"} style={{fontSize:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name={"forward"} style={{fontSize:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name={"ellipsis-vertical"} style={{fontSize:20}} />
                    </TouchableOpacity>
                </HStack>
            ),
            headerLeft:()=>(
                <HStack alignItems={"center"} marginLeft={0} space={1}>
                    <Button variant={"unstyled"} ml={-4} onPress={()=>select===""?props.navigation.goBack():setSelect("")}>
                        <HStack alignItems={"center"} space={3}>
                            <MaterialIcons name={"arrow-back"} style={{fontSize:20, fontWeight:"900"}} />
                            {
                            select===""?
                            <Avatar size={"40px"} source={{uri:users.photoURL}} />
                            : 
                            <Text style={{fontSize:20,marginLeft: 4, fontWeight:'bold', marginLeft:3}}>1</Text>
                            }
                        </HStack>
                    </Button>
                    {select===""?
                        (
                            <HStack alignItems={"center"}  >
                                <VStack>
                                    <Text fontSize={20} fontWeight={"700"} fontFamily={"font"}>{users?.username}</Text>
                                    <Text fontSize={14}>{users?.fullName?users?.fullName:users?.fullname}</Text>
                                </VStack>
                            </HStack>
                        )
                        :
                        (
                            <HStack>
                            </HStack>
                        )
                    }
                </HStack>
            ),
            title:""
        })
    },[ !props.navigation, !select])

    useEffect(()=>{
        setTimeout(()=>{
            setload(false)
        },4000)
    },[])
    useEffect(()=>{
        firebase.firestore()
        .collection("friends")
        .doc(props.route.params.id)
        .collection("message")
        .orderBy("sendAt", "asc")
        .onSnapshot((snapshot)=>{
            const chat = snapshot.docs.map((doc)=>{
                return {...doc.data(),id:doc.id};
            })
            setChatList(chat);
        })
    },[!chatList])
    function sendMessage(id){
        if(message.length!==0){
            const data = {
                message:message,
                sendTo:props.route.params.uid,
                sendBy:firebase.auth().currentUser.uid,
                readBy:true,
                readTo:false,
                sendAt:new Date().getTime(),
                type:'text'
            }
            firebase.firestore()
            .collection("friends")
            .doc(id)
            .collection("message")
            .add(data)
            setMessage("")
        }
    }
    function deleteMessage(cid, id){
            firebase.firestore()
            .collection('friends')
            .doc(cid)
            .collection("message")
            .doc(id)
            .delete()
            setSelect("")
    }
   async function deleteMessageImage(cid, id, image){
            await firebase.storage().ref().child(image).delete().then(() => {
                firebase.firestore().collection('friends').doc(cid).collection("message").doc(id).delete()
                console.log("delete");
            }).catch((error) => {
                console.log("file Not Exist", error);
            });
            setSelect("")
    }
    const uploadImage = async (data) => {
        if(data.uri){
          const childPath = `message/${firebase.auth().currentUser?.uid}/${Math.random().toString(36)}`;
          const response = await fetch(data.uri);
          const blob = await response.blob();
    
          const task = firebase
              .storage()
              .ref()
              .child(childPath)
              .put(blob);
            const taskProgress = snapshot => {
                console.log(`transferred: ${snapshot.bytesTransferred}`)
            }
        
            const taskCompleted = () => {
                task.snapshot.ref.getDownloadURL().then((snapshot) => {
                  SendNewPost(snapshot, childPath, data.type);
                })
            }
        
            const taskError = snapshot => {
                console.log(snapshot)
            }
        
            task.on("state_changed", taskProgress, taskError, taskCompleted);
        }else{
          alert("await to upload")
        }
      }
      function SendNewPost(img, childPath, type){
        const data = {
            message:img,
            sendTo:props.route.params.uid,
            sendBy:firebase.auth().currentUser.uid,
            readBy:true,
            readTo:false,
            sendAt:new Date().getTime(),
            type:type,
            image:childPath
        }
        firebase.firestore()
        .collection("friends")
        .doc(props.route.params.id)
        .collection("message")
        .add(data)
        setMessage("")
      }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.cancelled) {
            uploadImage(result);
        }
    };

    if(load){
        return(
            <View style={{flex:1,display:"flex",alignItems:'center',justifyContent:'center'}}>
                <Spinner size={40}/>
            </View>
        )
    }
    const createThreeButtonAlert = () =>
        Alert.alert(
        "Are You Sure",
        "Do you want to Delete?",
        [
            {
            text: "Cancel",
            onPress: () => console.log(""),
            style: "cancel"
            },
            { text: "OK", onPress: () =>  select?.type==='text'?deleteMessage(props.route.params.id,select?.id):deleteMessageImage(props?.route?.params?.id,select?.id,select?.image) }
        ]
        );

    return (
        <>
            <View style={{ height:"100%", paddingBottom:70}}>
            <SafeAreaView >
                    <FlatList
                        style={{height:"100%"}}
                        data={chatList}
                        renderItem={({item})=>(
                            <>
                                {item.type==="text"?
                                    item?.sendBy===firebase.auth().currentUser.uid?
                                        <HStack m={2} alignItems={'center'} justifyContent={"flex-end"}>
                                            <TouchableOpacity onLongPress={()=>setSelect(item)}>
                                                <Box   borderTopRightRadius={30} borderBottomLeftRadius={30} borderTopLeftRadius={30} paddingX={6} paddingY={3} bg={"purple.500"}>
                                                    <Text color={"white"} fontSize={15}>{item.message}</Text>
                                                </Box>
                                            </TouchableOpacity>
                                        </HStack>
                                    :
                                        <HStack m={2}>
                                            <TouchableOpacity >

                                            <Box  borderTopRightRadius={30} borderBottomRightRadius={30} borderTopLeftRadius={30} paddingX={6} paddingY={3} bg={"purple.200"}>
                                                <Text color={"black"} fontSize={15}>{item.message}</Text>
                                            </Box>
                                            </TouchableOpacity>
                                        </HStack>
                                :
                                item.type==="image"?
                                    item?.sendBy===firebase.auth().currentUser.uid?
                                        <HStack  m={2}  alignItems={'center'} justifyContent={"flex-end"}>
                                            <TouchableOpacity onLongPress={()=>setSelect(item)}>
                                                <Image alt={".."} source={{uri:item?.message}} style={{height:260, resizeMode: "center", width:screenWidth*0.5, borderRadius:15, shadowColor: '#666',
                                                    shadowOffset: { width: 3, height: 5 },
                                                    shadowOpacity: 3,
                                                    shadowRadius: 10,  
                                                    elevation: 5}}/>
                                            </TouchableOpacity>
                                        </HStack>
                                    :
                                        <HStack m={2}>
                                            <TouchableOpacity >
                                                <Image alt={".."} source={{uri:item?.message}} style={{height:260, resizeMode: "center", width:screenWidth*0.5, borderRadius:15, shadowColor: '#666',
                                                    shadowOffset: { width: 3, height: 5 },
                                                    shadowOpacity: 3,
                                                    shadowRadius: 10,  
                                                    elevation: 5}}/>
                                            </TouchableOpacity>
                                        </HStack>
                                :item.type==="video"&&
                                item?.sendBy===firebase.auth().currentUser.uid?
                                     <HStack  m={2}  alignItems={'center'} justifyContent={"flex-end"}>
                                         <TouchableOpacity onLongPress={()=>setSelect(item)}>
                                         <Video
                                            style={styles.video}
                                            source={{
                                            uri: item?.message,
                                            }}
                                            useNativeControls
                                            resizeMode="contain"
                                        />
                                         </TouchableOpacity>
                                     </HStack>
                                :
                                     <HStack m={2}>
                                         <TouchableOpacity >
                                            <Video
                                                style={styles.video}
                                                source={{
                                                uri: item?.message,
                                                }}
                                                useNativeControls
                                                resizeMode="contain"
                                            />
                                         </TouchableOpacity>
                                     </HStack>
                                }
                            </>
                        )}
                    />
            </SafeAreaView>

            </View>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 3, paddingTop:0,display:"flex",alignItems:'center',height:50}}>
            <HStack style={{width:screenWidth}} alignItems={'center'} justifyContent={"space-between"} paddingX={2} display={'flex'}  >
                <TouchableOpacity onPress={()=>pickImage()} style={{height:40,width:40,borderRadius:20,display:'flex',alignItems:"center",justifyContent:'center',backgroundColor:'white'}}>
                    <Entypo name={"attachment"} style={{fontSize:20}} />
                </TouchableOpacity>
                <Input placeholder={"Chat with  "+ users.username} onSubmitEditing={()=>sendMessage(props.route.params.id)} value={message} onChangeText={(e)=>setMessage(e)} height={39} pl={5} variant="rounded"  w="75%" bg={"white"}/>
                <TouchableOpacity onPress={()=>sendMessage(props.route.params.id)} style={{height:40,width:40,borderRadius:20,display:'flex',alignItems:"center",justifyContent:'center'}}>
                    <MaterialCommunityIcons name={"send"} style={{fontSize:26, color:"#147df1"}} />
                </TouchableOpacity>
            </HStack>
            </View>
        </>
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
        width: screenWidth*0.5,
        height: 200,
      },
});

const mapStateToProps = (store) => ({})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchEmailChange, fetchFriends  }, dispatch);
 
export default connect(mapStateToProps, mapDispatchProps)(AddUserPage);