import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

export default function SwipeableImg({user}) {
    return (
      <View>
        <Image source={{ uri: user.picture.large }} style={styles.photo} />
        <View style={styles.textcontainer}>
          <View style={styles.textrow}>
            <Text style={[styles.textname]}>{user.name.first}</Text>
            <Text style={[styles.textage]}>{user.dob.age}</Text>
          </View>
          <View style={styles.textrow}>
            <Text style={[styles.textloc]}>{user.location.country}, {user.location.city}</Text>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    photo: {
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 20,
    },
    textcontainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
    textrow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textname: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
    },
    textage: {
      color: 'white',
      fontSize: 20,
      marginLeft: 10,
      marginTop: 3,
    },
    textloc: {
      color: 'white',
      fontSize: 15,
    },
  })