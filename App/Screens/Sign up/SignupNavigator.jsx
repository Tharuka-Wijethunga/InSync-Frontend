import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OnboardingFirstPage from "./OnboardingFirstPage";
import OnboardingSecondPage from "./OnboardingSecondPage";
import OnboardingFourthPage from "./OnboardingFourthPage";
import OnboardingThirdPage from "./OnboardingThirdPage";
import Signup from "./Signup";
import Login from "../Login/Login";
import SignupForm from "./SignupForm";

const SignupNavigator = (initialRoute) => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup}/>
            <Stack.Screen name="OnboardingFirstPage" component={OnboardingFirstPage}/>
            <Stack.Screen name="OnboardingSecondPage" component={OnboardingSecondPage}/>
            <Stack.Screen name="OnboardingThirdPage" component={OnboardingThirdPage}/>
            <Stack.Screen name="OnboardingFourthPage" component={OnboardingFourthPage}/>
        </Stack.Navigator>
    );
};

export default SignupNavigator;