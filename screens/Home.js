import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View,ScrollView, FlatList,Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import List from '../components/List'
import Colors from '../constans/Colors'
import { auth,db} from '../firebaseconfig';
import {onSnapshot,addDoc,removeDoc,updateDoc, archiveDoc} from '../serviceFunctions/Functions'



export default function Home({navigation,route}) {
    const [lists,setLists]=useState([])

    const listsRef = db.collection('users').doc(auth.currentUser.uid).collection('lists')
    const archivedRef = db.collection('users').doc(auth.currentUser.uid).collection('archived')
    


  
    useEffect(() => {
      onSnapshot(listsRef,(newList)=>{
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
    
    // Add a new list
    const addItemToList = ({title,color})=>{
        const date = new Date()
        addDoc(listsRef,{title,color,date})
    }
    // Remove selected list
    const removeItemFromList = (id)=>{
       removeDoc(listsRef,id)
    }
    // Update selected list
    const updateItem = (id,item) =>{
       updateDoc(listsRef,id,item)

    }
    //the aim of this function was to copy the collection and subcollections from current shopping list to the archived shopping list, unfortunately i was not able to copy the subcollections on time.
    const archiveItem = async (id,date)=>{
  

      const docRef = await listsRef.doc(id).get()

      const copyDoc = await addDoc(archivedRef,docRef.data())

      removeItemFromList(id,docRef.data())
      console.log(nuevoDoc.data())
    }
        

  
    

    const createAlert = (id) => { 
      Alert.alert(
        "Alert",
        "Are you sure you want to archived this list",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => archiveItem(id) }
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
                      <Text style={styles.sectionTitle}> Current Lists</Text>
                      {/* Logout btn */}
                <TouchableOpacity  onPress={()=>{navigation.navigate('Archived')}}>
                <Ionicons name='archive-outline' style={styles.archBtn} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=>{auth.signOut()}}>
                    <Text style={styles.btnText} >Logout</Text>
                </TouchableOpacity>
            </View>
         {/* Lists of shopping list */}
           <View style ={styles.items}>
               <FlatList
                data={lists}
                renderItem={({item: {title,color,id,isArchived = false}})=>{
                        return <List 
                        isArchived={isArchived}
                        title ={title} 
                        color={color} 
                        navigation={navigation}
                        listId = {id}
                        onOption ={()=>{navigation.navigate('Edit',{title,color,saveChanges:(item)=>updateItem(id,item)})}}
                        onDelete={()=>{createAlert(id)}}/>
                }}>
                </FlatList>
           </View>
     
        </View>
        </ScrollView>
             
             {/* Add a new list */}
             <View style={styles.writeTaskWrapper}>
                <TouchableOpacity onPress ={()=>navigation.navigate('Edit',{saveChanges:addItemToList})}>
                    <View style={styles.addWrapper}>
                        <Ionicons name='add-outline' style={styles.btnPlus} />
                    </View>
               </TouchableOpacity>
             </View> 
            
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
      archBtn:{
        fontSize:24,
         color:"black", 
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
        height:40,
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