import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


export default function TopBar() {
  return (
    <View style={styles.container}>
        <MaterialIcons name="pets" size={24} color="black" />
        <MaterialIcons name="people" size={24} color="black" />
        <MaterialIcons name="history-toggle-off" size={24} color="black" />
        <AntDesign name="profile" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 15,
      backgroundColor: '#7fffd4',
    },
  })