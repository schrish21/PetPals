import React, { useState, useEffect } from 'react';
import styles from '../assets/style.js';
import {ScrollView, View, Text, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import CardMatches from '../components/CardMatches';

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';


export default function Settings() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
  
