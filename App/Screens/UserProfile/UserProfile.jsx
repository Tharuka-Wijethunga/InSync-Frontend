import { Text, StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, Button, View} from "native-base";
import Profile from "./Profile";
import ProfileNavigation from "./ProfileNavigation";

export default function UserProfile() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <ProfileNavigation><Profile/></ProfileNavigation>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: Colors.BGColor,
        flex: 1,
    }
})