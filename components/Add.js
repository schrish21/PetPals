import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add( {navigation} ) {
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

  return (
    <View style={{ flex: 1}}>
      <Image source={{ uri: image }} style={{ height:400, width:400}} />
      <Button title="Pick Image From Gallery" onPress={() => pickImage()} />
      <Button title="Save" onPress={() => navigation.navigate('Save', { image })} />
    </View>

  );
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