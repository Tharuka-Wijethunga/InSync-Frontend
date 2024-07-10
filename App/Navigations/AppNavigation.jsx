import React, {useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Stack, View} from "native-base";
import TabNavigation from "./TabNavigation";
import SignupNavigator from "../Screens/Sign up/SignupNavigator";
import {AuthContext} from "../Context/AuthContext";
import {ActivityIndicator} from "react-native";

const AppNavigation = ({initialRoute}) => {
    const Stack = createNativeStackNavigator();
    const {isLoading,accessToken}=useContext(AuthContext)

    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        );
    }

    return (

            <NavigationContainer>
                <Stack.Navigator initialRouteName={initialRoute}
                    screenOptions={{headerShown: false }}
                >
                    {accessToken == null ?
                    <Stack.Screen name="SignupNavigator" component={SignupNavigator} />:
                    <Stack.Screen name="TabNavigation" component={TabNavigation} />
                    }
                </Stack.Navigator>
            </NavigationContainer>

    );
};

export default AppNavigation;