import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput, Image , Dimensions  } from 'react-native';
import firebase from 'firebase';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'

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
                {console.log(error)})
    }



    render() {
        return (
               <View style = {styles.container}>


               <Image style={styles.image} source={require("../../assets/images/draft_1.png")}/>
                <View style = {styles.inputView}>
                <TextInput 
                    placeholder="email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => this.setState({ email: email })}
                />

                 </View>

                <View style = {styles.inputView}>
                <TextInput 
                    placeholder="password"
                     placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password: password })}
                />
                 </View>

                <View style = {styles.loginBtn}>
                <Button
                    onPress={() => this.onSignIn()
                     //this.props.navigation.replace("Loading")
                   }
                   color = "white"
                    title="Sign In"
                />

                 </View>
                 <View>
                 <Button
                                 title="Register"
                                 onPress={() =>
                                  this.props.navigation.navigate("Register")}
                             />
                 </View>
                 </View>


        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   },

   image :{
   height: null ,
   width: null
   , resizeMode : "contain",
    marginTop: 80
    },
   inputView: {
      backgroundColor: "#ffe4b5",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    loginBtn:
     {
       width:"80%",
       borderRadius:25,
       height:50,
       alignItems:"center",
       justifyContent:"center",
       marginTop:40,
       backgroundColor:"tomato",
     },
      image: {
         marginBottom: 40,
       }
});
const {SCREEN_WIDTH, SCREEN_HEIGHT} = Dimensions.get("window");
export default Login