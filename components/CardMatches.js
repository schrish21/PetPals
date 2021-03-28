import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../assets/style.js';
import CardStack, { Card } from 'react-native-card-stack-swiper';

const CardMatches = ({
  name,
  image,
  screen
}) => {
  
  //styles
  const screenWidth = Dimensions.get('window').width;

  const style_Image = [
    {
      width: screen ? screenWidth / 2 - 25 : screenWidth - 85,
      height: screen ? 170 : 350,
      borderRadius: 0,
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

  return (
    <View style={styles.containerCardItem}>
      <Image source={image} style={style_Image}/>
      <Text style={style_Name}>{name}</Text>
    </View>
  );
};

export default CardMatches;
