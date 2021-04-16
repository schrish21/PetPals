import React, { useState, useEffect }  from 'react';
import {ScrollView, SafeAreaView, Text, TouchableOpacity, ImageBackground, View, FlatList, StyleSheet, Dimensions, RefreshControl} from 'react-native';

import Message from '../components/Message';

import { Icon } from 'react-native-elements';
import Data from '../assets/Data';
import { tinderclone } from "../assets/fonts/opensans.ttf";

import firebase from 'firebase';
require('firebase/firestore');
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

function Messages (props) {

    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)
    const [usersChat, setUsersChat] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const [usersMatched, setUsersMatched] = useState([])

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
        } 
  
        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
  
        firebase.firestore()
          .collection('users')
          .where('uid', 'in', props.chat)
          .onSnapshot((snapshot) => {
              let usersChat = snapshot.docs.map(doc => {
                  const data = doc.data();
                  const id = doc.id;
                  return { id, ...data }
              });
              setUsersChat(usersChat);
        })
  
    }, [props.route.params.uid, props.following])
  
    console.log(props.chat)
    //console.log(usersChat)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        firebase.firestore()
            .collection('users')
            .where('uid', 'in', props.chat)
            .get()
            .then((snapshot) => {
                let usersChat = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsersChat(usersChat);
          })
      }, []);
  
    const navigation = useNavigation();  

    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            </ScrollView>
        <View style={styles.containerMessages}>
            <SafeAreaView>
            <View style={styles.top}>
                <Text style={styles.title}>Messages</Text>
                <TouchableOpacity>
                <Text style={styles.icon}>
                    <Icon name='bars'
                        type='font-awesome' 
                        color='#474745'
                        size={20} />
                </Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal:10, marginTop: 5}}>
            <FlatList
                numColumns={1}
                data={usersChat}
                horizontal={false}
                renderItem={({ item }) => (

                    item.uid != firebase.auth().currentUser.uid ?
                    <TouchableOpacity style={{marginTop:10, backgroundColor:'#ede7d5', borderRadius:15}} onPress={() => navigation.navigate("Chat", {uid: props.route.params.uid, uname:user.name, userConversation: item.uid})}>
                        <Message
                        image={item.downloadURL===undefined || null ? require('../assets/images/blank-profile.webp'): {uri: item.downloadURL}}
                        name={item.name}
                        lastMessage
                        screen
                        />
                    </TouchableOpacity>
                    : 
                    <View></View>
                )} 
                keyExtractor={(item) => item.title}
            />
            </View>
            </SafeAreaView>
        </View>

        </ImageBackground>

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
	bg: {
		flex: 1,
		resizeMode: "cover",
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT
	},
    containerMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingHorizontal: 20,
		width: DIMENSION_WIDTH - 100,

	},
    top: {
		paddingTop: 50,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
    title: { 
        paddingBottom: 10, 
        fontSize: 22, 
        color: DARK_GRAY 
    },
    icon: {
		fontFamily: ICON_FONT,
		fontSize: 20,
		color: DARK_GRAY,
		paddingRight: 10
	},
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following,
    chat: store.userState.chat
  })
export default connect(mapStateToProps, null)(Messages);
