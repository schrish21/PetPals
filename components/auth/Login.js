  
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TextInput, Image , Dimensions, TouchableOpacity  } from 'react-native';
import firebase from 'firebase';
export class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '', 
        }

        this.onSignIn = this.onSignIn.bind(this)
    }

    onSignIn(){
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => 
                {console.log(result)})
            .catch((error) => 
                {alert(error)})
    }



    render() {
        return (
            <View style = {styles.container}>
               <Image style={styles.image} source={require("../../assets/images/draft_1.png")}/>
                <View style = {styles.inputView}>
                <TextInput 
                    style = {styles.text}
                    placeholder="email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => this.setState({ email: email })}
                />
                 </View>

                <View style = {styles.inputView}>
                <TextInput 
                    style = {styles.text}
                    placeholder="password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password: password })}
                />
                 </View>

                <View style = {styles.loginBtn}>
                    <TouchableOpacity></TouchableOpacity>
                    <Button
                        onPress={() => this.onSignIn()}
                        title="Sign In"
                        color='tomato'
                    />
                </View>
                <View style={{marginTop:120, width:"80%", height:50,}}>
                    <TouchableOpacity></TouchableOpacity>
                    <Button
                        color='#ffa74f'
                        title='Register' 
                        onPress={() => this.props.navigation.navigate("Register")}
                /> 
                 </View>    

             </View>
        )
    }
}

const {SCREEN_WIDTH, SCREEN_HEIGHT} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 20,
    },
    text: {
        fontSize: 22,
        marginTop: 5
    },
    inputView: {
        backgroundColor: "#ffe4b5",
        width:"80%",
        height:50,
        marginBottom: 20,
        alignItems: "center",
    },
    loginBtn:
     {
        width:"80%",
     },
});


export default Login