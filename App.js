
import React,{useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import ShoppingList from './screens/ShoppingList'
import ArchivedShoppingList from './screens/ArchivedShoppingList'
import Home from './screens/Home'
import EditList from './screens/EditList'
import Colors from './constans/Colors'
import Login from './screens/Login'
import Archived from './screens/Archived'
import * as firebase from 'firebase'
import {auth} from './firebaseconfig'

const Stack = createStackNavigator()
const AuthStack = createStackNavigator()

const Auth = () => {
  return(
    <AuthStack.Navigator>
    <AuthStack.Screen  name='Auth' component={Login}/>
  </AuthStack.Navigator>
  )

}
const Screens = () =>{
  return (
    <Stack.Navigator>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='Archived' component={Archived}/>
    <Stack.Screen name='ShoppingList'
     component={ShoppingList}
      options={({route})=>{
        return({
            title: route.params.title,
            headerStyle: {
              backgroundColor:route.params.color
            },
            headerTintColor:'white'

           })}}/>
    <Stack.Screen name='ArchivedShoppingList'
     component={ArchivedShoppingList}
      options={({route})=>{
        return({
            title: route.params.title,
            headerStyle: {
              backgroundColor:route.params.color
            },
            headerTintColor:'white'

           })}}/>
   <Stack.Screen name='Edit'
    component={EditList}
    options={({route})=>{
     return({
         title: route.params.title ? `Edit ${route.params.title} list` : 'Create New List',
         headerStyle: {
           backgroundColor:route.params.color || Colors.yellow
         },
         headerTintColor:'white'

        })}}
    />
  </Stack.Navigator>
  )

}
export default function App() {
const [isAuth,setIsAuth]=useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user =>{
      if(user){
        setIsAuth(true)
      }else{
        setIsAuth(false)
      }
    })
  }, [])
  
  return (
   <NavigationContainer>
    {isAuth ? <Screens /> : <Auth />}
   </NavigationContainer>
  );
}



