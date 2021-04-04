import React, { Component } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from "./Home";
import MatchesScreen from "./Matches";
import ProfileScreen from "./Profile";
import CardItem from "../components/CardItem"

import firebase from 'firebase' 

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index';

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
const mapDispatchProps = (dispatch) => bindActionCreators({  fetchUser, fetchUserPosts, fetchUserFollowing,  clearData  }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);