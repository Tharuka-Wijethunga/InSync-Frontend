import { Text, StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Utils/Colors";
import {NativeBaseProvider, Button, View} from "native-base";

export default function Login() {
    return (
        <NativeBaseProvider>
            <View>
                <Text>Login</Text>
            </View>
        </NativeBaseProvider>
    )
}