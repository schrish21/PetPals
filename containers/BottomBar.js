import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'; 


export default function BottomBar() {
    return (
        <View style={styles.container}>
            <View />
            <TouchableOpacity style={styles.button}>
                <Feather name="x" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image style={styles.petFood}
                source={require('../assets/images/petFood.png')}
                />
            </TouchableOpacity>
            <View />
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        height:75,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: 65,
        height: 65,
        backgroundColor: '#f0e68c',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    petFood: {
        width: 35,
        height: 35,
    }
})