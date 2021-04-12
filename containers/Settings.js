import React, { useState, useEffect, Component } from 'react';;
import { View,Text,TouchableOpacity, Button, ImageBackground} from 'react-native';
import { TouchableRipple, Switch } from 'react-native-paper';
import styles from '../assets/style.js';

import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage')
import { connect } from 'react-redux';

import { Icon } from 'react-native-elements';


function Settings(props, {navigation}){
  const [user, setUser] = useState(null);
    const [following, setFollowing] = useState([])
    const [usersMatched, setUsersMatched] = useState([])
    const [HaveNotification, setNotification] = useState(false);

    const toggleNotification = () => {
        setNotification(!HaveNotification);
    }

    useEffect(() => {

      firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .onSnapshot((snapshot) => {
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return id
            })
            setFollowing(following);
            firebase.firestore()
            .collection('users')
            .where('uid', 'not-in', following)
            .get()
            .then((snapshot) => {
                let usersMatched = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsersMatched(usersMatched);
          })


        })

        }, [])

    const onLogout = () => {
            firebase.auth().signOut();
        }

return(
    <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
        <View style={styles.settingsContainer}>
            <View style={styles.top}>
                <Text style={styles.status}>Settings</Text>
            </View>
            <View>
                <Text style={styles.settingsGeneral}> Notification </Text>
            </View>
            <View>
                <TouchableRipple onPress={() => toggleNotification}>
                    <View style={styles.IconRight} pointerEvents="none">
                        <Switch value = {HaveNotification} />
                    </View>
                </TouchableRipple>
            </View>
            <View>
                <Text style={styles.settingsGeneral}> Logout </Text>
                    <TouchableOpacity onPress={() => onLogout()} style={styles.IconRight} >
                        <Text style={styles.iconButtonLogOut}>
                            <Icon name='sign-out'
                                type='font-awesome'
                                color='tomato'
                                size={22} />
                        </Text>
                    </TouchableOpacity>
           </View>
        </View>
       </ImageBackground>
    );
};


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})


export default connect(mapStateToProps, null)(Settings);
