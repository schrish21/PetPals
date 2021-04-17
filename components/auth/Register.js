import React, { Component } from 'react'
import {  SafeAreaView, StyleSheet, View, Button, TextInput, Text } from 'react-native'

import firebase from 'firebase'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oname: '',
            email: '',
            password: '',
            name: '',
            age: '',
            gender: '',
            breed: '',
            bio: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { oname, email, password, name, age, gender, breed, bio } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        oname,
                        email,
                        password, 
                        name, 
                        age, 
                        gender, 
                        breed, 
                        bio
                    })
                firebase.firestore()
                    .collection("following")
                    .doc(firebase.auth().currentUser.uid)
                    .collection("userFollowing")
                    .doc(firebase.auth().currentUser.uid)
                    .set({})
                firebase.firestore()
                    .collection('chats')
                    .doc(firebase.auth().currentUser.uid)
                    .collection('userChat')
                    .doc(firebase.auth().currentUser.uid)
                    .set({})
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{fontSize: 20, paddingBottom:5}}>Owner's Info</Text> 
                <TextInput
                    style = {styles.input}
                    autoCapitalize = "words"
                    placeholder="owner name"
                    onChangeText={(oname) => this.setState({ oname })}
                />
                <TextInput
                    style = {styles.input}
                    autoCapitalize = "sentences"
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    style = {styles.input}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Text></Text>
                <Text style={{fontSize: 20, paddingBottom:5}}>Pets Info</Text> 
                <TextInput
                    style = {styles.input}
                    autoCapitalize = "words"
                    placeholder="pet name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    style = {styles.input}
                    placeholder="pet age"
                    onChangeText={(age) => this.setState({ age })}
                    keyboardType="numeric"
                />
                <TextInput
                    style = {styles.input}
                    autoCapitalize = "sentences"
                    placeholder="pet gender"
                    onChangeText={(gender) => this.setState({ gender })}
                />
                <TextInput
                    style = {styles.input}
                    autoCapitalize = "sentences"
                    placeholder="pet breed"
                    onChangeText={(breed) => this.setState({ breed })}
                />
                <TextInput
                    style = {styles.input}
                    autoCapitalize = "sentences"
                    placeholder="bio"
                    onChangeText={(bio) => this.setState({ bio })}
                />

                <View style={{marginTop:30, margin:5, width:'90%'}}>
                    <Button
                        onPress={() => this.onSignUp()}
                        title="Sign Up"
                        color='#ffa74f'
                /></View>
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
        alignItems: 'center',
        justifyContent: 'center',
     },
     input: {
        margin: 7,
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 18,
        width:'90%',
        backgroundColor: '#f7dab2'
     },
})

export default Register