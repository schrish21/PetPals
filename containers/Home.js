import React, { useState, useEffect } from 'react';
import {Image, Button, ScrollView, View, Text, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from '../components/CardItem';
import styles from '../assets/style.js';

import { Icon } from 'react-native-elements';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';


function Home (props) {

  
  const [users, setUsers] = useState([])

  useEffect(() => {
    const { currentUser } = props;

    firebase.firestore()
      .collection('users')
      //.where('email', '>=', firebase.auth().currentUser.email)
      .get()
      .then((snapshot) => {
          let users = snapshot.docs.map(doc => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data }
          });
          setUsers(users);

    })
    
  }, [])

  //fetchUsers();
  console.log(users)
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
          key={users.length} 
        >
          {users.map((item, index) => (
            <Card key={index}>
              <CardItem
              image={item.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: item.downloadURL} }
              name={item.name}
              bio={item.bio}
              matches={'m'}
              actions
              onPressLeft={() => this.swiper.swipeLeft()}
              onPressRight={() => this.swiper.swipeRight()}
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
