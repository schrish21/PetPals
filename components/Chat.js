import React, { useState, useEffect, useCallback } from 'react';
import {ScrollView, View, Text, TouchableOpacity, ImageBackground, FlatList, KeyboardAvoidingView, Button, LogBox, StyleSheet, TextInput, } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

const firebaseConfig = {
    apiKey: "AIzaSyCpM6VHskV5zxbZPEUcGzTAiZCePrG2H3E",
    authDomain: "pet-pals-38237.firebaseapp.com",
    projectId: "pet-pals-38237",
    storageBucket: "pet-pals-38237.appspot.com",
    messagingSenderId: "847823690219",
    appId: "1:847823690219:web:c3b275979f6333ca74a1ae"
}
  
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

LogBox.ignoreLogs(['Setting a timer for a long period of time'])


function Chat (props) {

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])

    const chatsRef = firebase.firestore()
                        .collection('chats')
                        .doc(props.route.params.uid)
                        .collection('userChat')
                        .doc(props.route.params.userConversation)
                        .collection('conversation')

    const chatsRef2 = firebase.firestore()
                        .collection('chats')
                        .doc(props.route.params.userConversation)
                        .collection('userChat')
                        .doc(props.route.params.uid)
                        .collection('conversation')

    useEffect(() => {

        if(!user){
            const _id = props.route.params.uid
            const name = props.route.params.uname
            const user = { _id, name }
            setUser(user)
        }

        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()

    }, [props.route.params.uid])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handlePress() {
        const _id = props.route.params.uid
        const name = props.route.params.uid
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        handlePress()
        const writes = messages.map((m) => chatsRef.add(m))
        const writes2 = messages.map((m2) => chatsRef2.add(m2))
        await Promise.all(writes, writes2, console.log('text sent ='+writes))
    }

    const onLogout = () => {
      firebase.auth().signOut();
    }


    if (!user) {
        return (
            <View></View>
        )
    }
    return (
        <GiftedChat messages={messages} user={user} onSend={handleSend} renderAvatarOnTop/>
    )
    
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  chat: store.userState.currentUser
})
export default connect(mapStateToProps, null)(Chat);