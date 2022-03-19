import { Text, View, Box, Center, VStack, FormControl, Input, Button, Divider, HStack, List, Avatar, Badge, Icon, IconButton, ScrollView } from 'native-base'
import React, { useLayoutEffect, useState } from 'react';
import { fetchEmailChange, fetchPassword, fetchUsername, fetchFullName } from './../../../redux/action';
import {KeyboardAvoidingView, Platform, StyleSheet, Dimensions, TouchableOpacity} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore"
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function LoginPage(props) {

    return (
        <View width={"100%"} flex={1} height={"100%"}>
            <ScrollView>
            <List bg={"white"}>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item >
                        <Avatar source={{uri:props?.currentUser?.photoURL}} size={"57px"} />
                        <Badge position={"absolute"} colorScheme="success" rounded={"full"} width={"25px"} height={"25px"} display={"flex"} alignItems={"center"} justifyContent={"center"} mb={0} ml={10} p={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{fontSize: 12}}>
                            <FontAwesome name={"plus"} style={{fontSize:12, color:"white", fontWeight:"300"}} />
                        </Badge>
                        <VStack height={"100%"} ml={3}>
                            <Text color="coolGray.800" _dark={{color: "warmGray.50"}} fontSize={18} pb={1} bold>My Status</Text>
                            <Text>Tap to add status update</Text>
                        </VStack>
                    </List.Item>
                </TouchableOpacity>
            </List>
            </ScrollView>
            <View display={"flex"} width={"100%"} position={"absolute"} bottom={3} right={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                <IconButton m={"8px"} borderRadius="full" bg={"indigo.600"} variant="solid" p="4" icon={<Icon color="white" name={"camera"} as={FontAwesome} size="sm" />} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-between',
        width: "100%",
        height: "100%"
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
    currentUser:store.userState.currentUser,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchEmailChange,  }, dispatch);
 
export default connect(mapStateToProps, mapDispatchProps)(LoginPage);