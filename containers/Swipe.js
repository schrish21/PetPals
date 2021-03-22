import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import SwipeableImg from './SwipeableImg'

export default function Swipe({users,current,handleLike}) {

    const renderLeftActions = () => {
        return (
        <RectButton style={styles.container}>
            <SwipeableImg user={users[current + 1]}></SwipeableImg>
        </RectButton>
        )
    }
    const renderRightActions = () => {
        return (
        <RectButton style={styles.container}>
            <SwipeableImg user={users[current + 1]}></SwipeableImg>
        </RectButton>
        )
    }

    return (
        <Swipeable
            friction={2}
            leftThreshold={40}
            rightThreshold={40}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableLeftOpen={handleLike}
        >

            <SwipeableImg user={users[current]} />

        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
})