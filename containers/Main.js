import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import HomeScreen from "./Home";
import MatchesScreen from "./Matches";
import MessagesScreen from "./Messages";
import ProfileScreen from "./Profile";
import SettingsScreen from "./Settings";
import CardItem from "../components/CardItem";
import MoreInfoScreen from "./MoreInfo";

import firebase from 'firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { fetchUser, fetchUserPosts, fetchUserFollowing, fetchUserChat, clearData, fetchUserMatch } from '../redux/actions/index';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {

    componentDidMount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
        this.props.fetchUserChat();
        this.props.fetchUserMatch();
    }

    render() {
        return (

            <Tab.Navigator initialRouteName="Home" labeled={false} barStyle={{ backgroundColor: 'tomato' }} activeColor="white">
                <Tab.Screen name="Home" component={HomeScreen} listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Home", {uid: firebase.auth().currentUser.uid})
                        }
                    })}
                    options={{tabBarIcon:({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }} />
                <Tab.Screen name="Matches" component={MatchesScreen} listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Matches", {uid: firebase.auth().currentUser.uid})
                        }
                    })}
                     options={{tabBarIcon:({ color, size }) => (
                        <MaterialCommunityIcons name="paw" color={color} size={26}/>
                     ),
                }} />
                <Tab.Screen name="Messages" component={MessagesScreen} listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Messages", {uid: firebase.auth().currentUser.uid})
                        }
                    })}
                     options={{tabBarIcon:({ color, size }) => (
                        <MaterialCommunityIcons name="message-text" color={color} size={26}/>
                     ),
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen} listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                        }
                    })}
                    options={{tabBarIcon:({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
                }} />

            </Tab.Navigator>
        )
    }
}
 
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({  fetchUserMatch, fetchUser, fetchUserPosts, fetchUserFollowing, fetchUserChat, clearData  }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);