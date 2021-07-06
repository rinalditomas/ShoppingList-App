import React,{useState} from 'react';
import { KeyboardAvoidingView,StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Colors from '../constans/Colors'
import {auth,db} from '../firebaseconfig'

export default function Login() {
    const [createMode, setCreateMode]=useState(true)
    const [input, setInput] = useState([]);
    const [msgError,setMsgError] = useState(null)

    //signUp function

    const handleSignUp = (e)=>{
        if(input.password !== input.confirmPassword) return setMsgError('Passwords do not match')
         auth.createUserWithEmailAndPassword(input.email,input.password)
            .then(user => {
                console.log('registrando usuario')
                db.collection('users').doc(user.uid).set({})
            })
            .catch((e)=>{
                console.log(e)
                if(e.code == 'auth/invalid-email') setMsgError('Invalid email format')
                if(e.code == 'auth/weak-password')setMsgError('The password must have 6 characters or more')
                if(e.code == 'auth/email-already-in-use')setMsgError('The email is already registered')
            })
    
    }

    //login function

    const handleLogin = (e)=>{
        auth.signInWithEmailAndPassword(input.email,input.password)
        .then(a=> console.log(a))
        .catch((e)=>{
            if(e.code == 'auth/invalid-email') setMsgError('Email is not registered')
            if(e.code == 'auth/user-not-found') setMsgError('User not found')
            if(e.code == 'auth/wrong-password') setMsgError('Incorrect password')
            console.log(e.code)}
        )
    }

return(
    <KeyboardAvoidingView style={styles.container}>
        <View style={styles.wrap}>
        <Text style={styles.sectionTitle}>{createMode ? 'Register':'Login'} </Text>
        {createMode ?
        //register inputs
         <View>
         <TextInput onChangeText={(value)=>{setInput({...input,email:value})}}  style ={styles.input} placeholder={'Email'} keyboardType={'email-address'}/>
         <TextInput onChangeText={(value)=>{setInput({...input,password:value})}}  id='password' style ={styles.input} placeholder={'Password'} secureTextEntry={true}/>
         <TextInput onChangeText={(value)=>{setInput({...input,confirmPassword:value})}}  id='confirmPassword' style ={styles.input} placeholder={'Confirm Password'}secureTextEntry={true} />
         </View>
         :
         //login inputs
          <View>
          <TextInput onChangeText={(value)=>{setInput({...input,email:value})}} id='email' style ={styles.input} placeholder={'Email'} keyboardType={'email-address'}/>
          <TextInput onChangeText={(value)=>{setInput({...input,password:value})}}  id='password' style ={styles.input} placeholder={'Password'} secureTextEntry={true}/>
        
          </View>
    }
       
        </View>

        <TouchableOpacity onPress={()=>{setCreateMode(!createMode)}} >
                <Text style={ {color:Colors.blueGray , fontSize:15,margin:4}}  >
                    {createMode ? 'Already had an account?':'Create a new account'}
                </Text>
        </TouchableOpacity>
            {msgError !== null ? <Text style={{color:'red'}}>{msgError}</Text> : null }
            {createMode ?
            <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity> 
        }
        
    </KeyboardAvoidingView>
)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
      alignItems:'center',
    },
    wrap:{
      paddingTop: 40,
      paddingHorizontal:20,
  
    },
    sectionTitle:{
        fontSize:24,
        fontWeight:'bold',
        paddingBottom:20,

      },
    input:{
        paddingVertical:15,
        paddingHorizontal:15,
        backgroundColor:'#FFF',
        borderRadius:10,
        borderColor:'#C0C0C0',
        borderWidth:1,
        width:300,
        margin:8
      },
      btn:{
        borderRadius:10,
        width:300,
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
})