import React, { useState, useEffect } from 'react';
import {Image, Button, ScrollView, View, Text, ImageBackground, TouchableOpacity, FlatList, LogBox } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from '../components/CardItem';
import styles from '../assets/style.js';

import { Icon } from 'react-native-elements';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

LogBox.ignoreAllLogs()

function Home (props) {

  const [following, setFollowing] = useState([])
  const [usersMatched, setUsersMatched] = useState([])
  

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

  //fetchUsers();
  //console.log(users)
  console.log(usersMatched)
  //console.log(firebase.auth().currentUser)


  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
        </View>

        <CardStack
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}
          key={usersMatched.length} 
        >
          {usersMatched.map((item, index) => (
            <Card key={index}>
              <CardItem
              image={item.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: item.downloadURL} }
              name={item.name}
              bio={item.bio}
              uid={item.uid}
              matches={'m'}
              actions
              onPressLeft={() => this.swiper.swipeRight()}
              onPressRight={() => this.swiper.swipeLeft()}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
})
export default connect(mapStateToProps, null)(Home);
