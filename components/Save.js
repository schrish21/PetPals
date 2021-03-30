import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase';
require('firebase/firestore')
require('firebase/firebase-storage')

export default function Save(props, {navigation}) {

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        (async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');

        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

    if (hasGalleryPermission === false) {
        return <Text>No access to gallery</Text>;
    }

    //console.log(image)
    
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`

    const uploadImage = async () => {
        const uri =  image;

        const response = await fetch(uri);
        const blob = await response.blob();
        
        const task = firebase.storage().ref().child(childPath).put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
                downloadURL,
                creation: firebase.firestore.FieldValue.serverTimestamp(),
                uid: firebase.auth().currentUser.uid
            },
            ).then(function () {
                props.navigation.popToTop()
            })
    }

    return (
        <View style={{flex:1}}>
            <Image source={{ uri: image }} style={{ height:400, width:400}} />
            <Button title="Pick Image From Gallery" onPress={() => pickImage()} />
            <Button title="Save" onPress={() => uploadImage()}/>
        </View>

    )
}

const styles = StyleSheet.create({
    cameraContainer:{
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex:1,
        aspectRatio:1
    }
})