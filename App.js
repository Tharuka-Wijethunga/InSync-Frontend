import React, { useEffect, useState } from 'react';
import "react-native-reanimated";
import 'react-native-gesture-handler';
import {NativeBaseProvider, StatusBar, Text, View, VStack} from "native-base";
import { SafeAreaView } from 'react-native';
import AppNavigation from "./App/Navigations/AppNavigation";
import { AuthProvider } from "./App/Context/AuthContext";

const SplashScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View flex={1} justifyContent="center" alignItems="center">
                <VStack space={1}>
                    <Text fontSize={50} fontWeight="bold">InSync</Text>
                    <Text fontWeight="medium" fontSize={18}>Financial Forecasting</Text>
                </VStack>
            </View>
        </SafeAreaView>
    );
};

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const initialRoute = () => {
        if (isLoggedIn) return 'TabNavigation';
        if (isFirstTime) return 'Signup';
        return 'Login';
    };

    if (isLoading) return (
        <NativeBaseProvider>
            <SplashScreen />
        </NativeBaseProvider>
    );

    return (
        <NativeBaseProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <AuthProvider>
                {AppNavigation ? <AppNavigation initialRoute={initialRoute()} /> : <Text>AppNavigation not found</Text>}
            </AuthProvider>
        </NativeBaseProvider>
    );
}
