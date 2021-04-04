import React, { useState, useEffect } from 'react';
import styles from '../assets/style.js';
import {ScrollView, View, Text, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import CardMatches from '../components/CardMatches';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

<<<<<<< HEAD
=======
import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';

>>>>>>> 183db5c37bed1e0b5134f1b5bfad79d8771109d5

function Matches (props) {

  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false)
  const [usersMatched, setUsersMatched] = useState([])

<<<<<<< HEAD
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
          .where('uid', 'in', props.following)
          .get()
          .then((snapshot) => {
              let usersMatched = snapshot.docs.map(doc => {
                  const data = doc.data();
                  const id = doc.id;
                  return { id, ...data }
              });
              setUsersMatched(usersMatched);
        })

    }, [props.route.params.uid, props.following])

    console.log(props.following)
    //console.log('folowing =' +following)
    //console.log(usersMatched)
=======
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
        .where('uid', 'in', props.following)
        .get()
        .then((snapshot) => {
            let usersMatched = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            });
            setUsersMatched(usersMatched);
      })

  }, [props.route.params.uid, props.following])

  console.log(props.following)
  //console.log('folowing =' +following)
  //console.log(usersMatched)

  const navigation = useNavigation();  
>>>>>>> 183db5c37bed1e0b5134f1b5bfad79d8771109d5

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
<<<<<<< HEAD

        renderItem={({ item }) => (
          <TouchableOpacity>
            <CardMatches
              image={item.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: item.downloadURL} }
              name={item.name === firebase.auth().currentUser.uid ? null : item.name}
              screen
            />
          </TouchableOpacity>
        )}
=======
        renderItem={({ item }) => (
            
          item.uid != firebase.auth().currentUser.uid ?
          <TouchableOpacity onPress={() => navigation.navigate("Profile", {uid: item.uid})}>
            <CardMatches
              name={item.uid === firebase.auth().currentUser.uid ? null : item.name}
              image={item.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: item.downloadURL} }
              screen
            />
          </TouchableOpacity>
          : <View></View>

        )}
        keyExtractor={(item) => item.title}
>>>>>>> 183db5c37bed1e0b5134f1b5bfad79d8771109d5
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