import React, { useState, useEffect } from 'react';
import { Image, Button, ScrollView, View, LogBox, Text, ImageBackground} from 'react-native';
import styles from '../assets/style.js';
import { Icon } from 'react-native-elements';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';

LogBox.ignoreAllLogs()

function MoreInfo (props) {

  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

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
  }, [props.route.params.uid, props.following])

  if (user === null) {
    return (
      <View>
      </View>
    )
  }

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfileInfo}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Image source={user.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: user.downloadURL} } style={styles.photoInfo}/>
        </View>

        <View>
          <View style={styles.containerProfileItemInfo}>
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
      </ScrollView>
    </ImageBackground>
  );

};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(MoreInfo);