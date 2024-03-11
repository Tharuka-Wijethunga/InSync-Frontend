import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";

const OnboardingFourthPage = () => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };
    const handleNext = () => {
        navigation.reset({index: 0, routes: [{name: 'TabNavigation'}]});// Implement logic to navigate to the next screen or complete onboarding
    };
    return (
        <NativeBaseProvider>
            <Box style={styles.container}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.black} />
                    <Text fontWeight={"bold"} fontSize={16} color={Colors.black} >Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Welcome !</Text>

                <Image
                    source={require("../../../assets/pic3.jpg")}
                    style={styles.image}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                    <Text style={styles.buttonText}>Let's Sync In !</Text>
                </TouchableOpacity>
            </Box>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    backButton: {
        position: 'absolute',
        top: '8%',
        left: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom:'2%',
        marginTop: '10%',
    },
    nextButton: {
        position: 'absolute',
        top: 650,
        backgroundColor: Colors.Blue,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: '90%',
        height: '30%',
        marginTop: '6%',
    },
});

export default OnboardingFourthPage;
