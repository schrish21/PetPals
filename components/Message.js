import React, {useState, useEffect} from 'react';

import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

const Message = ({ image, lastMessage, name, uid, screen }) => {
    
  return (
    <View style={styles.containerMessage}>
      <Image source={image} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={{fontSize:17,  color:'black'}}>{name}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    </View>
  );
};

const GRAY = "#757E90";
const DARK_GRAY = "#363636";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30, 
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15
  },
  message: {
    color: GRAY,
    fontSize: 14,
    paddingTop: 5
  },
})

export default Message;
