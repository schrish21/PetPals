import React, { useState, useEffect }  from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';

import styles from '../assets/style.js';
import { Icon } from 'react-native-elements';

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'


function CardItem ({
  name,
  image,
  bio,
  uid,
  screen,
  onPressLeft,
  onPressRight,
}, props) {

  //console.log('current uid from card item = '+ firebase.auth().currentUser.uid)
  //console.log(uid)

  //styles
  const screenWidth = Dimensions.get('window').width;

  const style_Image = [
    {
      width: screen ? screenWidth / 2 - 25 : screenWidth - 85,
      height: screen ? 170 : 350,
      borderRadius: 18,
      margin: screen ? 0 : 20
    }
  ];

  const style_Name = [
    {
      color: '#363636',
      fontSize: screen ? 15 : 30,
      paddingTop: screen ? 11 : 13,
      paddingBottom: screen ? 5 : 8,
    }
  ];

  const onFollow = () => {
    firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(uid)
        .set({})
        .then(() => alert('Matched user!'))
  }

  const onUnfollow = () => {
    firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(uid)
        .delete()
        .then(() => alert('Removed user!'))
  }

  function LeftClick() {
    onUnfollow()
    onPressRight()
    return 0
  }

  function RightClick() {
    onFollow()
    onPressLeft()
    return 0
  }

  return (
    
    <View style={styles.containerCardItem}> 

      {/*NAME and BIO*/}
      <Image source={image} style={style_Image}/>
      <Text style={style_Name}>{name}</Text>
      <Text style={styles.bioCardItem}>{bio}</Text>

      {/*BUTTONS*/}
      <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.miniButton}>
            <Text style={styles.star}>
              <Icon reverseColor
                  name='star'
                  type='font-awesome' 
                  color='#ffae00'
                  size={30} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => LeftClick()}>
            <Text style={{paddingBottom:5}}>
              <Icon 
                  name='times'
                  type='font-awesome' 
                  color='#474745'
                  size={40} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => RightClick()}>
            <Text style={styles.like}>
              <Icon reverseColor
                  name='heart'
                  type='font-awesome' 
                  color='#e83f3f'
                  size={35} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniButton}>
            <Text style={styles.flash}>
              <Icon reverseColor
                  name='comments-o'
                  type='font-awesome' 
                  color='#1e87c9'
                  size={30} />
            </Text>
          </TouchableOpacity>
        </View>

    </View>
  );
};


const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
})
export default connect(mapStateToProps, null)(CardItem);
