import React, { useState, useEffect } from 'react';
import { Image, Button, ScrollView, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from '../assets/style.js';

import { Icon } from 'react-native-elements';
import Demo from '../assets/Data.js';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

function Profile (props) {

  const {image} = Demo[7];

  const [userPosts, setUserPosts] = useState([]); 
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false)

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
              .collection("posts")
              .doc(props.route.params.uid)
              .collection("userPosts")
              .orderBy("creation", "asc")
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

      if (props.following.indexOf(props.route.params.uid) > -1) {
          setFollowing(true);
      } else {
          setFollowing(false);
      }

  }, [props.route.params.uid, props.following])

  //console.log(user)

  const onFollow = () => {
      firebase.firestore()
          .collection("following")
          .doc(firebase.auth().currentUser.uid)
          .collection("userFollowing")
          .doc(props.route.params.uid)
          .set({})
  }
  const onUnfollow = () => {
      firebase.firestore()
          .collection("following")
          .doc(firebase.auth().currentUser.uid)
          .collection("userFollowing")
          .doc(props.route.params.uid)
          .delete()
  }

  const onLogout = () => {
      firebase.auth().signOut();
  }

  if (user === null) {
    return (
      <View>
        <Text></Text>
        <Button title="Logout" onPress={() => onLogout()}/>
        <Text>Empty</Text>
      </View>
    )      
  }

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>

        <ImageBackground source={image} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity style={styles.topIconRight}>
                <Text>
                <Icon name='bars'
                      type='font-awesome' 
                      color='white'
                      size={22} />
                </Text>
              </TouchableOpacity> 
          </View>
        </ImageBackground>

        <View>
          <View style={styles.containerProfileItem}>
              <View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.descriptionProfileItem}>location</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.iconProfile}>
                  <Icon name='paw'
                        type='font-awesome' 
                        color='#474745'
                        size={20}
                        />
                </Text>
                <Text style={styles.infoContent}>breed description</Text>
            </View>

          <View style={styles.info}>
            <Text style={styles.iconProfile}>
              <Icon name="calendar"
                    type='font-awesome' 
                    color='#474745'
                    size={20} />
            </Text>
            <Text style={styles.infoContent}>age</Text>
          </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                  <Icon name='hashtag'
                        type='font-awesome' 
                        color='#474745'
                        size={20} />
                </Text>
                <Text style={styles.infoContent}>interests</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.iconButton}>
              <Icon name="comments-o"
                    type='font-awesome' 
                    color='white'
                    size={28} />
            </Text>
            <Text style={styles.textButton}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      
      </ScrollView>
    </ImageBackground>
  );

};

const mapStateToProps = (store) => ({
      currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);