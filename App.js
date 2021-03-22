import React, { Component } from "react";
import HomeScreen from "./containers/Home";
import MainScreen from "./containers/Main";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export class App extends Component {
	render(){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}}/>
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} navigation={this.props.navigation}/>
                </Stack.Navigator>
          </NavigationContainer>
        );
    }
}
//sam 03/17/2021 16:15:00
export default App

//jayjasjdjajdsajsajsdaj
//sadsadas
//wosa
//chekc
//hello it's Ailyn