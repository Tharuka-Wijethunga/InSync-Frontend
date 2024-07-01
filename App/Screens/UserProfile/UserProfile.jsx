import { StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, View} from "native-base";
import Profile from "./Profile";
import ProfileNavigation from "./ProfileNavigation";
import Helptoken from "./Helptoken";


export default function UserProfile() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                {/*<Helptoken/>*/}
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