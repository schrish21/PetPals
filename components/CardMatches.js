import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../assets/style.js';

const CardMatches = ({name, image, screen}) => {

  const screenWidth = Dimensions.get('window').width;

  const style_Container = [{
    backgroundColor: '#b8d6cb',
    borderRadius: 8, 
    alignItems: "center", 
    paddingTop: 10, 
    paddingHorizontal:8, 
    marginVertical: 5, 
    marginRight: 5, 
    marginLeft:0, 
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
    shadowColor: 'black', 
    shadowOffset: { height: 0, width: 0 }
    }
  ];

  const style_Image = [{
      width: screen ? screenWidth / 2 - 25 : screenWidth - 85,
      height: screen ? 170 : 350,
      borderRadius: 0,
      margin: screen ? -2 : 20
    }
  ];

  const style_Name = [{
      color: '#363636',
      fontSize: 16,
      paddingTop: screen ? 11 : 13,
      paddingBottom: screen ? 5 : 8,
    }
  ];

  return (
    <View style={style_Container}>
      <Image source={image} style={style_Image}/>
      <Text style={style_Name}>{name}</Text>
    </View>
  );
};

export default CardMatches;
