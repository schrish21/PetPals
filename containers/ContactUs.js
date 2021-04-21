import React, { useState, useEffect, Component } from 'react';
import { View,Text,TouchableOpacity, Button, ImageBackground} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import styles from '../assets/style.js';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

function ContactUs(props, {navigation}){
    return(
    <View>
        <Text />
        <View style={styles.actionsProfile}>
            <Text style={styles.title}>"Match.Chat.Meet.Modern Pet Dating"</Text>
        </View>
        <View>
            <Text style={styles.bioCardItem}>PetPals is a platform for connecting the local pet owners and building the friendship and love for both pet owners and pets.</Text>
        </View>
        <View style={styles.actionsProfile}>
        <Text style={styles.title}><FontAwesome5 name="search-location" size={22} color="tomato" /> Where to find us</Text>
        </View>
        <Text style={styles.bioCardItem}> Xi'an Jiaotong-Liverpool University
                                          111 Ren'ai Road
                                          Suzhou Industrial Park
                                          Suzhou
                                          Jiangsu Province
                                          P. R. China
                                          215123 
        </Text>

        <View style={styles.actionsProfile}>
        <Text style={styles.title}><Feather name="phone-call" size={22} color="tomato" /> Contact Number</Text>
        </View>    
        <Text style={styles.Contact}> Telephone :+86 (0)512 8816 1000</Text>
        <Text style={styles.bioCardItem}> Fax : +86 (0)512 8816 1899</Text>

        <View style={styles.actionsProfile}>
        <Text style={styles.title}><Ionicons name="people-outline" size={24} color="tomato" /> People Involved</Text>
        </View>
        <Text style={styles.Contact}> Runa</Text>
        <Text style={styles.Contact}> Jun Woo Kim</Text>
        <Text style={styles.Contact}> Samuel Christian Halim</Text>
        <Text style={styles.Contact}> Darren Christopher</Text>
        <Text style={styles.Contact}> Yi Young Kim</Text>
        <Text style={styles.Contact}> Ailyn</Text>
        <Text style={styles.Contact}> Akash</Text>
        <Text style={styles.Contact}> Peesapat Chareukprasopchoke</Text>
    </View>
    );
}

export default ContactUs;