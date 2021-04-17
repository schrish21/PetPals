import React, { useState, useEffect }  from 'react';
import styles from '../assets/style.js';
import {ScrollView, SafeAreaView, Text, TouchableOpacity, ImageBackground, View, FlatList, StyleSheet, Dimensions, RefreshControl} from 'react-native';

import Message from '../components/Message';

import { Icon } from 'react-native-elements';
import Data from '../assets/Data';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

function Messages (props) {

    const [user, setUser] = useState(null);
    const [usersChat, setUsersChat] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const [following, setFollowing] = useState(false)

    useEffect(() => {

        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
        }
  
        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
  
  
        firebase.firestore()
          .collection('users')
          .where('uid', 'in', props.chat)
          .onSnapshot((snapshot) => {
              let usersChat = snapshot.docs.map(doc => {
                  const data = doc.data();
                  const id = doc.id;
                  return { id, ...data }
              });
              setUsersChat(usersChat);
        })
  
    }, [props.route.params.uid, props.chat])
  
    console.log(props.chat)
    //console.log(usersChat)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        firebase.firestore()
            .collection('users')
            .where('uid', 'in', props.chat)
            .get()
            .then((snapshot) => {
                let usersChat = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsersChat(usersChat);
          })
      }, []);
  
    const navigation = useNavigation();  

    return (
        <View style={styles.containerMessages}>
        <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    
                <View style={styles.top}>
                <Text style={{paddingTop:20, paddingBottom: 7, flexDirection: "row", alignItems: "center", fontSize:21}}>Messages</Text>
                </View>

                <View style={{ marginHorizontal:10}}>
                <FlatList
                    numColumns={1}
                    data={usersChat}
                    horizontal={false}
                    renderItem={({ item }) => (

                        item.uid != firebase.auth().currentUser.uid ?
                        <TouchableOpacity style={{marginTop:10, backgroundColor:'#ede7d5', borderRadius:15}} onPress={() => navigation.navigate("Chat", {uid: props.route.params.uid, uname:user.name, userConversation: item.uid})}>
                            <Message
                            image={item.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: item.downloadURL}}
                            name={item.name}
                            lastMessage
                            screen
                            />
                        </TouchableOpacity>
                        : 
                        <View></View>
                    )} 
                    keyExtractor={(item) => item.title}
                />
                </View>

                </ScrollView>
        </ImageBackground>
        </View>
    );
};


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following,
    chat: store.userState.chat
  })
export default connect(mapStateToProps, null)(Messages);
