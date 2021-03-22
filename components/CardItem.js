import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import styles from '../assets/style.js';

const CardItem = ({
  name,
  image,
  bio,
  screen
}) => {
  
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

  return (
    <View style={styles.containerCardItem}>
      <Image source={image} style={style_Image}/>
      <Text style={style_Name}>{name}</Text>
      <Text style={styles.bioCardItem}>{bio}</Text>

    </View>
  );
};

export default CardItem;
