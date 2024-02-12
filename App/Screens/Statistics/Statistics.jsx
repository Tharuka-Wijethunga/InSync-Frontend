import { StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Utils/Colors";
import {NativeBaseProvider, View} from "native-base";
import Carousel from "./Carousel";

export default function Statistics() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Carousel/>
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
    }
})