import React from 'react';
import styles from '../assets/style.js';

import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import Demo from '../assets/Data.js';

const Profile = () => {
  const {image} = Demo[7];

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>

        <ImageBackground source={image} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity style={styles.topIconRight}>
                <Text>
                <Icon name='bars'
                      type='font-awesome' 
                      color='white'
                      size={22} />
                </Text>
              </TouchableOpacity> 
          </View>
        </ImageBackground>

        <View>
          <View style={styles.containerProfileItem}>
              <View>
                <Text style={styles.name}>name</Text>
                <Text style={styles.descriptionProfileItem}>location</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.iconProfile}>
                  <Icon name='paw'
                        type='font-awesome' 
                        color='#474745'
                        size={20}
                        />
                </Text>
                <Text style={styles.infoContent}>breed description</Text>
            </View>

          <View style={styles.info}>
            <Text style={styles.iconProfile}>
              <Icon name="calendar"
                    type='font-awesome' 
                    color='#474745'
                    size={20} />
            </Text>
            <Text style={styles.infoContent}>age</Text>
          </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                  <Icon name='hashtag'
                        type='font-awesome' 
                        color='#474745'
                        size={20} />
                </Text>
                <Text style={styles.infoContent}>interests</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.iconButton}>
              <Icon name="comments-o"
                    type='font-awesome' 
                    color='white'
                    size={28} />
            </Text>
            <Text style={styles.textButton}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
