  
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

                <TouchableOpacity style = {styles.loginBtn} onPress={() => this.onSignIn()}>
                    <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.registerBtn} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>

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
        marginTop: 7,
    },
    textButton: {
        fontSize: 22,
        marginTop: 7,
        color: 'white'
    },
    inputView: {
        backgroundColor: "#ffe4b5",
        width:"80%",
        height:40,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    loginBtn:
     {
        backgroundColor: "tomato",
        width:"80%",
        height:40,
        borderRadius: 5,
        marginTop:10,
        marginBottom: 20,
        alignItems: "center",
     },
    registerBtn:
     {
        backgroundColor: "#ffa74f",
        width:"80%",
        height:40,
        borderRadius: 5,
        marginTop:120,
        marginBottom: 20,
        alignItems: "center",
     },
});


export default Login