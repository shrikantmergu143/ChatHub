import React, {   useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View,Text, Image,TextInput, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native'
import { bindActionCreators } from 'redux';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import firebase from "firebase/compat"
import "firebase/compat/auth";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from "./auth/LoginPage";
import RegisterPage from './auth/RegisterPage';
import Main from './Main';
import auth from "./../config/Firebase"
import MenuBarPage from './main/MenuBar/MenuBarPage';
import AddUserPage from './main/AddUser/AddUserPage';
import MessagePage from './main/Message/MessagePage';
const Stack = createNativeStackNavigator();

function App(props) {
  const [logged,setLogged] = useState(false)
  const [load,setload] = useState(false);
  const [loaded] = useFonts({
    font: require('./../assets/fonts/Lobster-Regular.ttf'),
  });
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        setLogged(true)
        setTimeout(()=>setload(true),3000)
      }
      else{
        setTimeout(()=>setload(true),3000)
        setLogged(false)
      }
    })
  },[])

  if(!loaded)return(
    <View>
      <Text style={{marginTop:40}}>Hi</Text>
    </View>
  )
  if(!load)return(
    <View style={{height:"100%",width:"100%",alignItems:"center",justifyContent:"center",display:"flex"}}>
      <Text style={{fontSize:30,fontFamily:"font"}}>ChatHub</Text>
    </View>
  )
  if(!logged){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Main"}>
          <Stack.Screen name="Main" component={Main} options={{ headerShown: true }} />
          <Stack.Screen name="Menu" component={MenuBarPage} options={{ headerShown: true }} />
          <Stack.Screen name="AddUser" component={AddUserPage} options={{ headerShown: true }} />
          <Stack.Screen name="Message" component={MessagePage} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

const mapStateToProps = (store) => ({
  email:store.userState.email,
})

export default connect(mapStateToProps)(App);