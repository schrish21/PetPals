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

      console.log(props.match)

      firebase.firestore()
        .collection('match')
        .doc(props.route.params.uid)
        .collection("matched")
        .get()
        .then((snapshot) => {
            if (snapshot.empty){
            var data = {};
                firebase.firestore()
                .collection("match")
                .doc(props.route.params.uid)
                .collection("matched")
                .doc("ZZZZZ")
                .set({data})
            }
            else{
            firebase.firestore()
                    .collection('users')
                    .where('uid', 'in', props.match)
                    .onSnapshot((snapshot) => {
                        let usersMatched = snapshot.docs.map(doc => {
                            const data = doc.data();
                            const id = doc.id;
                            return { id, ...data }
                        });
                        setUsersMatched(usersMatched);
                })
            }
        })
      
  }, [props.route.params.uid, props.following, props.match])
  
  console.log(usersMatched)

  const navigation = useNavigation();  

  return (
    <View style={styles.containerMatches}>
    <ImageBackground source={require('../assets/images/bg.png')} style={styles.bgMatches}>
      <ScrollView>
          <View style={styles.top}>
          <Text style={{paddingTop: 10, paddingBottom: 10, flexDirection: "row", alignItems: "center", fontSize: 22}}>Matches</Text>
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
  following: store.userState.following,
  match: store.userState.match
})
export default connect(mapStateToProps, null)(Matches);