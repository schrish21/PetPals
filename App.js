import React, {useEffect, useState} from "react";
import styles from "./assets/style";
import {View,Text,Image} from 'react-native';
import TopBar from "./containers/TopBar";
import BottomBar from "./containers/BottomBar";
import axios from 'axios'
import SwipeableImg from './containers/SwipeableImg'
import Swipe from './containers/Swipe'
import Fish from "./assets/images/Fish01.jpg";

export default function App() {
  const [users, setUsers] = useState([])
  const [current,setCurrent] = useState(0)

  async function fetchUsers() {
      try {
        const { data } = await axios.get('https://randomuser.me/api/?results=10')
        setUsers(data.results)
        console.log(data.results)
      } catch (error) {
        console.log(error)
        Alert.alert('Error getting users', '', [{ text: 'Retry', onPress: () => fetchUsers() }])
      }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  function handleLike() {
    console.log('like')
    nextUser()
  }

  function nextUser() {
    const nextCurrent = users.length - 2 === current ? 0 : current + 1
    setCurrent(nextCurrent)
  }

  return (
    <View style={styles.container}>
      <View style={styles.swipe}> 
        {users.length > 1 && 
          <Swipe users={users} current={current} handleLike={handleLike}></Swipe>
        }
      </View>
    <BottomBar />
    <TopBar />
    </View>
  );
}