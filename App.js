import React, { Component } from "react";
import HomeScreen from "./containers/Home";
import MainScreen from "./containers/Main";
import ProfileScreen from "./containers/Profile";

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
                    <Stack.Screen name="Profile" component={ProfileScreen} navigation={this.props.navigation} options={{ headerShown: false}}/>
                </Stack.Navigator>
          </NavigationContainer>
        );
    }
}
export default App
