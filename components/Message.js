import React from 'react';

import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { tinderclone } from "../assets/fonts/opensans.ttf";

const Message = ({ image, lastMessage, name, screen }) => {

    //styles
    const screenWidth = Dimensions.get('window').width;

    const style_Image = [
      {
        width: screen ? screenWidth / 2 - 25 : screenWidth - 85,
        height: screen ? 170 : 350,
        borderRadius: 0,
        margin: screen ? -2 : 20
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
    <View style={styles.containerMessage}>
      <Image source={image} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={{fontSize:17, color:'black'}}>{name}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    </View>
  );
};

const PRIMARY_COLOR = "#7444C0";
const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";

const ONLINE_STATUS = "#46A575";
const OFFLINE_STATUS = "#D04949";

const STAR_ACTIONS = "#FFA200";
const LIKE_ACTIONS = "#B644B2";
const DISLIKE_ACTIONS = "#363636";
const FLASH_ACTIONS = "#5028D7";

const ICON_FONT = tinderclone;

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
    containerMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingHorizontal: 10,
		width: DIMENSION_WIDTH - 100,
	},
  icon: {
    fontFamily: ICON_FONT,
    fontSize: 20,
    color: DARK_GRAY,
    paddingRight: 10
  },
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15
  },
  message: {
    color: GRAY,
    fontSize: 12,
    paddingTop: 5
  },
})

export default Message;
