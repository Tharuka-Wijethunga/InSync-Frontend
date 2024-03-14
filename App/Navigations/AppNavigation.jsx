import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Stack} from "native-base";
import Login from "../Screens/Login/Login";
import Signup from "../Screens/Sign up/Signup";
import TabNavigation from "./TabNavigation";
import SignupNavigator from "../Screens/Sign up/SignupNavigator";
import ProfileNavigation from "../Screens/UserProfile/ProfileNavigation";

const AppNavigation = ({initialRoute}) => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}
                screenOptions={{headerShown: false }}
            >
                <Stack.Screen name="SignupNavigator" component={SignupNavigator} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;