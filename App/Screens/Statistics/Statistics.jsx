import { StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, View} from "native-base";
import TopNavigation from "./TopNavigation";


export default function Statistics() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <TopNavigation></TopNavigation>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.BGColor,
        flex:1,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:10,
        paddingRight:10,

    }
})