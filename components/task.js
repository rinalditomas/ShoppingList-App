import React,{useState} from 'react'
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from "@expo/vector-icons";





const Task = ({text,onDelete,itemsRef,item,updateDoc})=>{
    const [boolean, setBoolean] =useState(false)

    return (
        <View style={[styles.item,{
            backgroundColor: item.isChecked ? '#b9fab1' : '#FFF'
        }]}>
            <View style={styles.itemLeft}>
                <TouchableOpacity  style={styles.square} onPress={()=> {
                    setBoolean(!boolean)
                    const newItem={text:item.text,isChecked:!item.isChecked,new:false}
                    updateDoc(itemsRef,item.id,newItem)
                    }}>
                {item.isChecked ? <Ionicons name="checkmark-sharp" size={24} color='black' /> : null}
                </TouchableOpacity>
                <Text styles={styles.itemText}> {text}</Text>
            </View>
            <TouchableOpacity onPress={onDelete}>
            <Ionicons name="close-circle-sharp" size={24} color='grey'  />
            </TouchableOpacity>
        </View>
    )

  
}
const  styles = StyleSheet.create({
    item:{
        backgroundColor: '#FFF',
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,

    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square:{
        width:24,
        height:24,
        backgroundColor:'#55BCF6',
        opacity: 0.4,
        borderRadius:5,
        marginRight:15,
        justifyContent:'center',
        alignItems:'center',
    },
    itemText:{
        maxWidth:'80%',


    },
})

export default Task;