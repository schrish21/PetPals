import React, { Component } from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export default class loading extends Component{
   constructor(props){
   super(props);
   }
render(){
        return (
 <View
         style ={{
                  flex:1,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  }}
                  >

                   <LottieView source = {require ('../../assets/images/lf30_editor_fxub0let.json') } autoPlay
                                 loop = {false}
                                 speed ={1.0}
                                 onAnimationFinish={()=>{
                                 this.props.navigation.replace("Login");
                                 }}
                                 />


                                 </View>
                                 )
         }



}







