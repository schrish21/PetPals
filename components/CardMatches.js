import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../assets/style.js';

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
      margin: screen ? -2 : 20
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
    <View style={{backgroundColor: '#ede7d5', borderRadius: 8, alignItems: "center", paddingTop: 10, paddingHorizontal:8, marginVertical: 5, marginRight: 5, marginLeft:3, shadowOpacity: 0.05, shadowRadius: 10, shadowColor: 'black', shadowOffset: { height: 0, width: 0 }}}>
      <Image source={image} style={style_Image}/>
      <Text style={style_Name}>{name}</Text>
    </View>
  );
};

export default CardMatches;
