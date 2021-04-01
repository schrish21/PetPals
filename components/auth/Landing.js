import React from 'react'
import { Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

export default function Landing({ navigation }) {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{marginBottom: 20}} source={require("../../assets/images/draft_1.png")}/>

            <View style={{marginBottom:10, width:"80%", height:50,}}>
                <Button
                    color='#ffa74f'
                    title='Register' 
                    onPress={() => navigation.navigate("Register")}
                /> 
            </View>    

            <View style={{width:"80%",}}>
                <Button
                    color='tomato'
                    title='Login' 
                    onPress={() => navigation.navigate("Login")}
                /> 
            </View>
        </View>
    )            
}

