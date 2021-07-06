import React,{useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert } from 'react-native';
import Colors from '../constans/Colors'
import { CommonActions } from '@react-navigation/routers';
import ColorSelector from '../components/ColorSelector'

export default function EditList({navigation,route}){
    const [title,setTitle] = useState(route.params.title|| '')
    const [color,setColor] = useState(route.params.color|| Colors.blue)
    const [valid,setValid] =useState(true)


    const colorList = [
        "blue",
        "teal",
        "green",
        "olive",
        "yellow",
        "orange",
        "red",
        "pink",
        "purple",
        "blueGray",
    ];

    const handleSave = ()=>{
        if(title.length > 1){
            route.params.saveChanges({title,color})
            navigation.dispatch(CommonActions.goBack())
        }else{
            createTwoButtonAlert()
            setValid(false)
        }
    }

    const createTwoButtonAlert = () => { 
        Alert.alert(
        "Error",
        "Enter a name for the shopping list",
        [
    
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.edtitWrapper}>
                <Text style={styles.text}>List Name</Text>
                <TextInput style ={styles.input}
                 placeholder={'Write a list name'} 
                 value={title}
                 onChangeText={(text)=>{
                     setTitle(text)
                     setValid(true)
                    }}
                />
                <Text style={styles.text}>Select a color for your shopping list</Text>
                <ColorSelector 
                    onSelect={(color)=>{
                        setColor(color)
                        navigation.dispatch(CommonActions.setParams({ color }))
                    }}
                    selectedColor ={color}
                    colorOptions={colorList}
                />
               
            </View>
            <TouchableOpacity style={styles.btn} onPress={()=>handleSave()}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
      justifyContent:'space-between'
    },
    edtitWrapper:{
        paddingTop: 40,
        paddingHorizontal:20,
    },
    text:{
        color:Colors.black,
        fontSize:25,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input:{
        paddingVertical:15,
        paddingHorizontal:15,
        backgroundColor:'#FFF',
        borderRadius:10,
        borderColor:'#C0C0C0',
        borderWidth:1,
        width:250,
        marginBottom:30,
      },
      btn:{
          borderRadius:25,
          backgroundColor:Colors.blue,
          height:48,
          margin:16,
          justifyContent:'center',
          alignItems:'center',
      },
      btnText:{
          color:'white',
          fontSize:20,
          fontWeight:'bold',
      },
      warning:{
        color:'red',
        fontWeight:'bold',
        fontSize:10,
      },
    tasksWrapper:{
      paddingTop: 80,
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
        backgroundColor:'#FFF',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#C0C0C0',
        borderWidth:1,
    
    
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