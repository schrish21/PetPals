import React, { useState, useEffect } from 'react';
import styles from '../assets/style.js';
import {ScrollView, View, Text, TouchableOpacity, ImageBackground, LogBox, FlatList} from 'react-native';
import CardMatches from '../components/CardMatches';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';

LogBox.ignoreAllLogs()

function Matches (props) {

  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false)
  const [usersMatched, setUsersMatched] = useState([])

  function arrayRemove(arr, value) { 
      return arr.filter(function(ele){ 
          return ele != value; 
      });
  }

  var followingFilter = arrayRemove(props.following, props.route.params.uid);
  //console.log(followingFilter)

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
        .where('uid', 'in', followingFilter)
        .onSnapshot((snapshot) => {
            let usersMatched = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            });
            setUsersMatched(usersMatched);
      })

  }, [props.route.params.uid, props.following])

  const navigation = useNavigation();  

  return (
    <View style={styles.containerMatches}>
    <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
      <ScrollView>
          <View style={styles.top}>
          <Text style={styles.status}>Matches</Text>
          </View>
      </ScrollView>

      <FlatList
        numColumns={2}
        data={usersMatched}
        horizontal={false}
        renderItem={({ item }) => (
            
          item.uid != props.route.params.uid ?
          <TouchableOpacity onPress={() => navigation.navigate("Profile", {uid: item.uid, name:item.name})}>
            <CardMatches
              image={item.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: item.downloadURL} }
              name={item.name}
              screen
            />
          </TouchableOpacity>
          : 
          <Text></Text>

        )}
        keyExtractor={(item) => item.name}
      />
    </ImageBackground>
    </View>
  );
};


const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following
})
export default connect(mapStateToProps, null)(Matches);