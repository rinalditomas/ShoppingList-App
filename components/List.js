import React from 'react'
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from "@expo/vector-icons";



const List = ({title,color,isArchived,navigation, onDelete,onOption, listId})=>{

    return (
        <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: color }]}
            onPress={()=>{navigation.navigate('ShoppingList',{title,color,listId})}}
        >
            <View>
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={onOption} style={{marginEnd:30}}>
                    <Ionicons name="options-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons name="file-tray-full-outline" size={24} color="white"  />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

  
}
const  styles = StyleSheet.create({
    itemContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
    },
    itemTitle:{
        fontSize: 24,
         padding: 5, 
         color: "white" 
    },
})

export default List;