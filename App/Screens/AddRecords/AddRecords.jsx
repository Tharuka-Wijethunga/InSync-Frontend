import { StyleSheet } from "react-native";
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
    container: {
        width: '100%',
        backgroundColor: Colors.BGColor,
        alignItems: 'center',
        flex: 1,
        paddingTop: 15
    }
})