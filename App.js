import 'react-native-gesture-handler';
import {NativeBaseProvider, Text, View, VStack} from "native-base";
import AppNavigation from "./App/Navigations/AppNavigation";
import {useEffect, useState} from "react";
import {AuthProvider} from "./App/Context/AuthContext";

const SplashScreen = () => {
    return (
        <NativeBaseProvider>
            <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <VStack space={1}>
                    <Text fontSize={50} fontWeight="bold">InSync</Text>
                    <Text fontWeight="medium" fontSize={18}>Financial Forecasting</Text>
                </VStack>
            </View>
        </NativeBaseProvider>
        )
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isFirstTime, setIsFirstTime] = useState(false)

    // Fake fetching user, that takes 2 seconds, and just set the
    // isLoading to false. The idea is to show the SplashScreen, and then,
    // go home, OnBoarding, or Login.
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => { clearTimeout(timeout) }
    }, [])

    // Calculate what the initial route is going to be, depending
    // on the user state, and first time usage. This can be read
    // from anywhere, db, shared preferences, user defaults, storage, etc.
    const initialRoute = () => {
        if (isLoggedIn) return 'TabNavigation';
        if (isFirstTime) return 'Signup';

        return 'Login'
    }

    if (isLoading) return <SplashScreen />

    return (
        <NativeBaseProvider>
            <AuthProvider>
            <AppNavigation initialRoute={initialRoute} />
            </AuthProvider>
        </NativeBaseProvider>
    )
}

