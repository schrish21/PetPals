import React, { Component } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "./Home";
 
const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {


    render() {
        return (

            <Tab.Navigator initialRouteName="Home" labeled={false} barStyle={{ backgroundColor: 'tomato' }} activeColor="white">
                <Tab.Screen name="Home" component={HomeScreen} 
                    options={{tabBarIcon:({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }} />
            </Tab.Navigator>
        )
    }
}

export default Main;