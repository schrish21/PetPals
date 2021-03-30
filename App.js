import React, { Component } from "react";
import { Text, View } from "react-native";

import HomeScreen from "./containers/Home";
import MainScreen from "./containers/Main";
import ProfileScreen from "./containers/Profile";

import SaveScreen from './components/Save';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

import * as firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyCpM6VHskV5zxbZPEUcGzTAiZCePrG2H3E",
  authDomain: "pet-pals-38237.firebaseapp.com",
  projectId: "pet-pals-38237",
  storageBucket: "pet-pals-38237.appspot.com",
  messagingSenderId: "847823690219",
  appId: "1:847823690219:web:c3b275979f6333ca74a1ae"
};
  
if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}


export class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      loaded: false,
    }
  }

  componentDidMount(){
      firebase.auth().onAuthStateChanged((user) => {
        if(!user){
          this.setState({
             loggedIn: false,
             loaded: true,
           })
          }
        else{
            this.setState({
              loggedIn: true,
              loaded:true,
            })
          }
        })
      }

	render(){
        const { loggedIn, loaded } = this.state;
        if(!loaded){
        return(
            <View style={{flex:1, justifyContent:'center'}}>
            <Text>Loading</Text>
            </View>
        );
        }

        if(!loggedIn){
        return (
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
            </Stack.Navigator>
            </NavigationContainer>
        );
        }

        return(
          <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}}/>
                    <Stack.Screen name="Home" component={HomeScreen} navigation={this.props.navigation} options={{ headerShown: false}} />
                    <Stack.Screen name="Profile" component={ProfileScreen} navigation={this.props.navigation} options={{ headerShown: false}}/>
                    <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
                </Stack.Navigator>
          </NavigationContainer>
          </Provider>
        );
    }
}

export default App
