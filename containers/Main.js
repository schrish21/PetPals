import React, { Component } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "./Home";
import ProfileScreen from "./Profile";

import firebase from 'firebase'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index';

const Tab = createMaterialBottomTabNavigator();

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
                <Tab.Screen name="Home" component={HomeScreen} 
                    options={{tabBarIcon:({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
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
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing,  clearData  }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);