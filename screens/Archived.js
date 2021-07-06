import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View,ScrollView, FlatList,Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ArchivedList from '../components/ArchivedList'
import Colors from '../constans/Colors'
import { auth,db} from '../firebaseconfig';
import {onSnapshot,addDoc,removeDoc,updateDoc, archiveDoc} from '../serviceFunctions/Functions'



export default function Home({navigation,route}) {
    const [lists,setLists]=useState([])

    const archivedRef = db.collection('users').doc(auth.currentUser.uid).collection('archived')


  
    useEffect(() => {
      onSnapshot(archivedRef,(newList)=>{
        setLists(newList)
      },{sort: (a,b)=>{
        if(a.date < b.date){
          return -1
        }
        if(a.date > b.date){
          return 1
        }
        return 0
      }})
    }, [])
    

    // Remove selected list
    const removeItemFromList = (id)=>{
       removeDoc(archivedRef,id)
    }



    const createAlert = (id) => { 
      Alert.alert(
        "Alert",
        "Are you sure you want to delete this list",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => removeItemFromList(id) }
        ]
      );
  }

    return(
        <View style={styles.container}>
        {/* Home screen */}
        <ScrollView
             contentContainerStyle={{
               flexGrow: 1
             }}
             keyboardShouldPersistTaps='handled'
           >
        <View style ={styles.tasksWrapper}>

            <View style={styles.btnWrapper}>
                      <Text style={styles.sectionTitle}> Archived Lists</Text>
                      {/* Logout btn */}
                <TouchableOpacity style={styles.btn} onPress={()=>{auth.signOut()}}>
                    <Text style={styles.btnText} >Logout</Text>
                </TouchableOpacity>
            </View>
         {/* Lists of shopping list */}
           <View style ={styles.items}>
               <FlatList
                data={lists}
                renderItem={({item: {title,color,id}})=>{
                        return <ArchivedList title ={title} 
                        color={color} 
                        navigation={navigation}
                        listId = {id}
                        onOption ={()=>{navigation.navigate('Edit',{title,color,saveChanges:(item)=>updateItem(id,item)})}}
                        onDelete={()=>{
                            createAlert(id)}}/>
                }}>
                </FlatList>
           </View>
     
        </View>
        </ScrollView>
            
         </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    tasksWrapper:{
      paddingTop: 40,
      paddingHorizontal:20,
  
    },
    sectionTitle:{
      fontSize:24,
      fontWeight:'bold',
    },
    items:{
      marginTop:30
    },
    addWrapper:{
        width:50,
        height:50,
        backgroundColor:Colors.blue,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#C0C0C0',
        borderWidth:1,
    
    
      },
      btnPlus:{
        fontSize:24,
         color:"white", 
        fontWeight:'bold'
      },
      btnWrapper:{
         flexDirection: "row",
          justifyContent: 'space-between', 
           alignItems:'center',
      }, 
      btn:{
        borderRadius:10,
        padding:8,
        backgroundColor:Colors.blue,
        height:48,
        margin:16,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        color:'white',
        fontSize:15,
        fontWeight:'bold',
    },
      writeTaskWrapper:{
        position:'absolute',
        bottom:60,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
      },
})