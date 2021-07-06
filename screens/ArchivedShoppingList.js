import React,{useState,useEffect} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView,Alert } from 'react-native';
import Task from '../components/task'
import {addDoc,removeDoc,onSnapshot,updateDoc} from '../serviceFunctions/Functions'
import {db,auth} from '../firebaseconfig'

export default function ShoppingList({route}) {
  const [task,setTask]= useState('')
  let [taskItems,setTaskItems] =useState([])
  const [valid,setValid] =useState(true)
  const [newItem, setNewItem] = useState();


  const itemsRef = db.collection('users').doc(auth.currentUser.uid).collection('lists').doc(route.params.listId).collection('archived')

  
  useEffect(() => {
   onSnapshot(itemsRef,(newItem)=>{
      setTaskItems(newItem)
   },{sort: (a,b)=>{
      if(a.isChecked && !b.isChecked){
        return 1
      }
      if(b.isChecked && !a.isChecked){
        return -1
      }
      return 0
            }}
  )}, [])
console.log(taskItems)

// Add a new product to the list
  const handleAddTask = ()=>{
    Keyboard.dismiss();
    if(task.length >1){
      const data ={text:task,isChecked:false,new:true}
      setTaskItems([...taskItems,data])
      addDoc(itemsRef, data)
      setTask('');
      setValid(true)
    }else{
      createTwoButtonAlert()
      setValid(false)
    }
    
  }
  // Alert function
  const createTwoButtonAlert = () => { 
    Alert.alert(
    "Error",
    "Please add what you need to shop",
    [

      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}
// Mark product as bought
  const handleCompleteTask = (index)=>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }

//   if (newItem) {
//     taskItems = [newItem, ...taskItems];
// }

  return (
    <View style={styles.container}>
   {/* Archived shopping list */}
   <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
   <View style ={styles.tasksWrapper}>
    <Text style={styles.sectionTitle}>What needs to be bought</Text>
      <View style ={styles.items}>
      {/* where task should be shown */}
        {
        taskItems.map((item,index)=>{
           return (
    
            <Task 
            itemsRef ={itemsRef}
            updateDoc={updateDoc}
            id={item.id}
            isChecked={item.isChecked}
            item={item}
            text={item.text} 
            key={index}  
            onDelete ={()=>{
              handleCompleteTask(index)
              item.id && removeDoc(itemsRef,item.id)
            }}
            />
          
           )
           
           
        })
        }
      

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
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:'#FFF',
    borderRadius:60,
    borderColor:'#C0C0C0',
    borderWidth:1,
    width:250,
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'#FFF',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#C0C0C0',
    borderWidth:1,


  },
  addText:{},

});
