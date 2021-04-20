import React, { useState, useEffect, Component } from 'react';;
import { Alert, View,Text,TouchableOpacity, Button, ImageBackground} from 'react-native';
import { TouchableRipple, Switch } from 'react-native-paper';
import styles from '../assets/style.js';
import { Icon } from 'react-native-elements';

import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage')
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';

function Settings(props){
    const navigation = useNavigation();
    const [HaveNotification, setNotification] = useState(false);

    const toggleNotification = () => {
        setNotification(HaveNotification => !HaveNotification);

    }

    const onLogout = () => {
            firebase.auth().signOut();
    }

return(
    <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
        <View style={styles.settingsContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.settingsGeneral}> Alerts </Text>
                    <View style={styles.IconSettings} onPress={() => toggleNotification}>
                        <Switch
                        trackColor = {{true: '#e83f3f', false: 'grey'}}
                        onValueChange = {toggleNotification}
                        value = {HaveNotification} />
                    </View>
            </View>

            <View>
                <Text style={styles.settingsGeneral}> Contact Us </Text>
                  <TouchableOpacity style={styles.roundedButton} onPress={() => navigation.navigate("ContactUs")}>
                    <Text style={styles.textButton}> Help & Support </Text>
                 </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.settingsGeneral}> Logout </Text>
                    <TouchableOpacity style={styles.IconSettings} onPress={() => onLogout()}>
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
