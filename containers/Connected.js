import React from 'react';
import styles from '../assets/style.js';
import { Icon } from 'react-native-elements';
import {ScrollView, View, Text, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import CardItem from '../components/CardItem';
import CardMatches from '../components/CardMatches';
import Data from '../assets/Data.js';

const ConnectedPage = () => {
    return (
      <View style={styles.containerMatches}>
      <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
        <ScrollView>
            <View style={styles.top}>
            <Text style={styles.status}>Matches</Text>
            </View>
        </ScrollView>

        
      <FlatList
        numColumns={2}
        data={Data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <CardMatches
              image={item.image}
              name={item.name}
              screen
            />
          </TouchableOpacity>
        )}
      />
      </ImageBackground>
      </View>
    );
};


export default ConnectedPage;