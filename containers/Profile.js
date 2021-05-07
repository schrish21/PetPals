import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Image, Button, ScrollView, View, Text, ImageBackground, TouchableOpacity, RefreshControl, LogBox} from 'react-native';
import styles from '../assets/style.js';
import { Icon } from 'react-native-elements';

import Save from '../components/Save';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

LogBox.ignoreAllLogs()

function Profile (props) {

  const [userPosts, setUserPosts] = useState([]); 
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  const [usersChat, setUsersChat] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
        setUser(currentUser)
        setUserPosts(posts)
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
            
        firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation", "desc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setUserPosts(posts)
            })
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
      
  }, [props.route.params.uid])


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
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
  }, []);

  const onLogout = () => {
    firebase.auth().signOut();
  }

  if (user === null) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Button title="Logout" onPress={() => onLogout()}/>
      </View>
    )
  }

  const navigation = useNavigation();  

  const onUnfollow = () => {
    firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete()
        .then(
          firebase.firestore()
            .collection("match")
            .doc(firebase.auth().currentUser.uid)
            .collection("matched")
            .doc(props.route.params.uid)
            .delete()
            .then(
              firebase.firestore()
                .collection("match")
                .doc(props.route.params.uid)
                .collection("matched")
                .doc(firebase.auth().currentUser.uid)
                .delete()
                .then(alert('Match Removed'))
            )
        )
  }


  const startChat = () => {
    if(props.chat.includes(props.route.params.uid)){
      navigation.navigate("Chat", {uid: firebase.auth().currentUser.uid, uname:props.currentUser.name, userConversation: user.uid})
    }
    else{
      firebase.firestore()
      .collection('chats')
      .doc(firebase.auth().currentUser.uid)
      .collection('userChat')
      .doc(props.route.params.uid)
      .set({})
    firebase.firestore()
      .collection('chats')
      .doc(props.route.params.uid)
      .collection('userChat')
      .doc(firebase.auth().currentUser.uid)
      .set({})
      .then(() =>  navigation.navigate("Chat", {uid: firebase.auth().currentUser.uid,  uname:props.currentUser.name, userConversation: user.uid}))
      return 0
    }
  }

  return (
    <ImageBackground 
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <ImageBackground source={user.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: user.downloadURL} } style={styles.photo}>
          <View style={styles.top}>
          </View>
        </ImageBackground>

        <View>
        <View style={styles.containerProfileItem}>
              <View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.descriptionProfileItem}>{user.gender}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.iconProfile}>
                  <Icon name='paw'
                        type='font-awesome'
                        color='#474745'
                        size={20}
                        />
                </Text>
                <Text style={styles.infoContent}>{user.breed}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.iconProfile}>
                <Icon name="calendar"
                      type='font-awesome'
                      color='#474745'
                      size={20} />
              </Text>
              <Text style={styles.infoContent}>{user.age} years old</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.iconProfile2}>
                <Icon name="user"
                      type='font-awesome'
                      color='#474745'
                      size={21} />
              </Text>
              <Text style={styles.infoContent}>{user.oname}'s Pet</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                  <Icon name='hashtag'
                        type='font-awesome'
                        color='#474745'
                        size={20} />
                </Text>
                <Text style={styles.infoContent}>{user.bio}</Text>
            </View>
          </View>
        </View>
        
        {props.route.params.uid == firebase.auth().currentUser.uid ? (
        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton} onPress={() => navigation.navigate("Save")}>
            <Text style={styles.iconButton}>
              <Icon name='camera'
                  type='font-awesome' 
                  color='white'
                  size={28} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circledButton2} onPress={() => navigation.navigate("Edit Profile")}>
            <Text style={styles.iconButtonX}>
              <Icon name='pencil-square-o'
                  type='font-awesome' 
                  color='white'
                  size={28} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedButton2} onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.iconButton}>
              <Icon name="cogs"
                    type='font-awesome'
                    color='white'
                    size={28} />
            </Text>
            <Text style={styles.textButton}> Settings </Text>
          </TouchableOpacity>
        </View>

        ):
        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButtonX} onPress={()=> onUnfollow()}>
            <Text style={styles.iconButton}>
              <Icon 
                  name='times'
                  type='font-awesome' 
                  color='white'
                  size={26} />
            </Text>
            <Text style={{fontSize: 16,color: 'white', paddingLeft: 5}}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedButton} onPress={() => startChat()}>
            <Text style={styles.iconButton}> 
              <Icon name="comments-o"
                    type='font-awesome' 
                    color='black'
                    size={28} />
            </Text>
            <Text style={{fontSize: 16,color: 'black', paddingLeft: 5}}> Start chatting</Text>
          </TouchableOpacity>
        </View>
        }

      </ScrollView>
    </ImageBackground>
  );

};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following,
    chat: store.userState.chat
})
export default connect(mapStateToProps, null)(Profile);