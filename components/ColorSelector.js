import React from 'react';
import {StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../constans/Colors'


export default function ColorSelector({selectedColor, colorOptions, onSelect}){
    


    const ColorButtom = ({onPress, isSelected, color})=>{
        return(
            <TouchableOpacity
            onPress={onPress}
            style={[styles.colorBtn,{
                borderWidth: isSelected ? 3 : 0 , backgroundColor: color
            }]}
            >

            </TouchableOpacity>
        )
    }

    
    return(
        <View style={styles.container}>
            {colorOptions.map((colorName,index)=>{
                return( 
                <ColorButtom 
                    key={index}
                    onPress={() => onSelect(Colors[colorName])}
                    color={Colors[colorName]}
                    isSelected={colorName == selectedColor}
                     />
                     )
                   
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
     flexDirection:'row',
     flex:1,
     flexWrap:'wrap',
     justifyContent:'center',
     alignItems: 'center',

    },
    colorBtn:{
        height:50,
        width:50,
        borderColor: Colors.lightGray,
        borderRadius:24,
        margin:10,


    }
})