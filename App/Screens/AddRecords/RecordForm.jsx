import {Dimensions, StyleSheet} from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, View, Box, Text, Button} from "native-base";
import {useNavigation} from "@react-navigation/native";


export default function RecordForm() {
    const screenWidth =Dimensions.get("screen").width;
    const navigation = useNavigation();
    return (
            <View backgroundColor={"white"} h="100%"  paddingTop={100} >

            </View>
    )
}

