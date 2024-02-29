import { Text, StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, Button, View} from "native-base";
import {useNavigation} from "@react-navigation/native";
import Category from "./Category";
import RecordForm from "./RecordForm";
import StackNavigation from "./StackNavigation";


export default function AddRecords() {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <StackNavigation><RecordForm></RecordForm></StackNavigation>
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
        width: '100%',
    }
})