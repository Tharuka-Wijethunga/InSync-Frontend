import {Dimensions, StyleSheet} from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {NativeBaseProvider, View, Box,Text} from "native-base";


export default function Category() {
    const screenWidth =Dimensions.get("screen").width;
    return (
        <View backgroundColor={"white"} h="100%">
                <Text>Category</Text>
        </View>
    )
}

